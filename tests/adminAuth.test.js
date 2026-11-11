import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement as h } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

test('recuperación y protección administrativa sin conexiones reales', async (t) => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
  let client, original
  try {
    const service = await server.ssrLoadModule('/src/services/authService.js')
    client = (await server.ssrLoadModule('/src/services/supabaseClient.js')).supabase
    original = { getSession: client.auth.getSession, getUser: client.auth.getUser, signOut: client.auth.signOut, from: client.from }
    const id = '00000000-0000-4000-8000-000000000001'
    const profile = { id, role: 'admin', status: 'active' }
    let queryCalls
    function setup(value = profile, error = null) {
      queryCalls = 0
      client.auth.getSession = async () => ({ data: { session: { user: { id } } }, error: null })
      client.auth.getUser = async () => ({ data: { user: { id } }, error: null })
      client.from = (table) => {
        queryCalls++
        assert.equal(table, 'profiles')
        const query = {
          select(columns) { assert.equal(columns, 'id, role, status'); return query },
          eq(key, value) { assert.equal(key, 'id'); assert.equal(value, id); return query },
          async maybeSingle() { return { data: value, error } },
        }
        return query
      }
    }
    await t.test('recupera admin y member activos por UUID verificado', async () => {
      for (const role of ['admin', 'member']) {
        setup({ ...profile, role })
        assert.deepEqual(await service.restoreAccess(), { ...profile, role })
      }
    })
    await t.test('sin sesión no consulta perfiles', async () => {
      setup()
      client.auth.getSession = async () => ({ data: { session: null }, error: null })
      assert.equal(await service.restoreAccess(), null)
      assert.equal(queryCalls, 0)
    })
    await t.test('Auth inválido, error de sesión o UUID distinto bloquean consulta', async () => {
      for (const mode of ['session', 'user', 'uuid']) {
        setup()
        if (mode === 'session') client.auth.getSession = async () => ({ data: {}, error: {} })
        else client.auth.getUser = async () => ({ data: { user: { id: 'other' } }, error: mode === 'user' ? {} : null })
        await assert.rejects(service.restoreAccess())
        assert.equal(queryCalls, 0)
      }
    })
    await t.test('rechaza perfil oculto, inactivo, UUID o rol inválido y errores RLS', async () => {
      for (const value of [null, { ...profile, status: 'inactive' }, { ...profile, role: 'unknown' }, { ...profile, id: 'other' }]) {
        setup(value)
        await assert.rejects(service.restoreAccess(), /perfil/)
      }
      setup(null, { code: '42501', message: 'PRIVATE_DETAILS' })
      await assert.rejects(service.restoreAccess(), (e) => !e.message.includes('PRIVATE_DETAILS'))
    })
    await t.test('logout local espera confirmación y no oculta fallos', async () => {
      let options
      client.auth.signOut = async (value) => { options = value; return { error: null } }
      await service.logout()
      assert.deepEqual(options, { scope: 'local' })
      client.auth.signOut = async () => ({ error: { message: 'PRIVATE_DETAILS' } })
      await assert.rejects(service.logout(), /No se pudo cerrar/)
    })
    await t.test('login por usuario valida campos antes de invocar servicios', async () => {
      await assert.rejects(service.loginWithUsername('', 'unused'), /nombre de usuario/)
    })
    const { AuthContext } = await server.ssrLoadModule('/src/components/auth/AuthProvider.jsx')
    const { default: RequireAdmin } = await server.ssrLoadModule('/src/components/auth/RequireAdmin.jsx')
    await t.test('guard no renderiza contenido salvo admin activo; carga y error permiten diagnóstico', () => {
      const render = (state) => renderToString(h(MemoryRouter, null,
        h(AuthContext.Provider, { value: { loading: false, profile: null, error: null, refresh() {}, signOut() {}, ...state } },
          h(RequireAdmin, null, h('p', null, 'ADMIN_PRIVATE_CONTENT')))))
      assert.match(render({ profile }), /ADMIN_PRIVATE_CONTENT/)
      for (const state of [{}, { loading: true, profile }, { profile: { ...profile, role: 'member' } }, { profile: { ...profile, role: 'unknown' } }, { profile: { ...profile, status: 'inactive' } }, { error: 'Acceso no validado', profile }]) {
        assert.doesNotMatch(render(state), /ADMIN_PRIVATE_CONTENT/)
      }
      assert.match(render({ loading: true }), /Validando/)
      assert.match(render({ error: 'Acceso no validado' }), /Reintentar/)
    })
  } finally {
    if (original) {
      Object.assign(client.auth, { getSession: original.getSession, getUser: original.getUser, signOut: original.signOut })
      client.from = original.from
    }
    await server.close()
  }
})
