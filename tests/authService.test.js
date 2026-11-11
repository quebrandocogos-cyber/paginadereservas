import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'

test('login por correo y validación de perfil, sin solicitudes reales', async (t) => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
  let client
  let originals
  try {
    const { loginWithEmail } = await server.ssrLoadModule('/src/services/authService.js')
    client = (await server.ssrLoadModule('/src/services/supabaseClient.js')).supabase
    originals = { from: client.from, signIn: client.auth.signInWithPassword, signOut: client.auth.signOut }
    const id = '00000000-0000-4000-8000-000000000001'
    const valid = { id, role: 'admin', status: 'active' }
    let calls
    function setup(profile = valid, profileError = null) {
      calls = []
      client.auth.signInWithPassword = async (credentials) => {
        calls.push(['signIn', credentials])
        return { data: { user: { id }, session: {} }, error: null }
      }
      client.auth.signOut = async (options) => { calls.push(['signOut', options]); return { error: null } }
      client.from = (table) => {
        calls.push(['from', table])
        const query = {
          select(columns) { calls.push(['select', columns]); return query },
          eq(column, value) { calls.push(['eq', column, value]); return query },
          async maybeSingle() { return { data: profile, error: profileError } },
        }
        return query
      }
    }

    await t.test('admin y member activos; correo normalizado y consulta por UUID autenticado', async () => {
      for (const role of ['admin', 'member']) {
        setup({ ...valid, role })
        assert.equal((await loginWithEmail(' DEMO@EXAMPLE.COM ', 'test-password')).role, role)
        assert.deepEqual(calls[0], ['signIn', { email: 'demo@example.com', password: 'test-password' }])
        assert.deepEqual(calls.find(([method]) => method === 'eq'), ['eq', 'id', id])
        assert.equal(calls.some(([method]) => method === 'signOut'), false)
      }
    })

    await t.test('valida correo y contraseña antes de autenticar', async () => {
      setup()
      for (const email of ['', 'demo', 'demo@', 'demo @example.com']) {
        await assert.rejects(loginWithEmail(email, 'test-password'), /correo electrónico válido/)
      }
      await assert.rejects(loginWithEmail('demo@example.com', ''), /contraseña/)
      assert.deepEqual(calls, [])
    })

    await t.test('perfil ausente, inactivo, rol inválido o UUID distinto cierran sesión local', async () => {
      for (const profile of [null, { ...valid, status: 'suspended' }, { ...valid, status: 'inactive' }, { ...valid, role: 'unknown' }, { ...valid, id: 'different' }]) {
        setup(profile)
        await assert.rejects(loginWithEmail('demo@example.com', 'test-password'), /La sesión se cerró/)
        assert.deepEqual(calls.at(-1), ['signOut', { scope: 'local' }])
      }
    })

    await t.test('error de consulta no filtra detalles y también cierra sesión', async () => {
      setup(null, { message: 'internal database details' })
      await assert.rejects(loginWithEmail('demo@example.com', 'test-password'), (error) => {
        assert.match(error.message, /La sesión se cerró/)
        assert.doesNotMatch(error.message, /internal database details/)
        return true
      })
      assert.deepEqual(calls.at(-1), ['signOut', { scope: 'local' }])
      setup()
      client.from = () => { throw new Error('network details') }
      await assert.rejects(loginWithEmail('demo@example.com', 'test-password'), /La sesión se cerró/)
    })

    await t.test('fallo de credenciales o conexión no consulta perfiles', async () => {
      setup()
      client.auth.signInWithPassword = async () => ({ data: null, error: { message: 'internal auth details' } })
      await assert.rejects(loginWithEmail('demo@example.com', 'test-password'), /Verificá tu correo/)
      assert.deepEqual(calls, [])
      client.auth.signInWithPassword = async () => { throw new Error('network details') }
      await assert.rejects(loginWithEmail('demo@example.com', 'test-password'), /conectar/)
    })

    await t.test('diagnósticos distinguen consulta, visibilidad, UUID, estado y rol sin exponer datos', async () => {
      const cases = [
        [null, null, 'PROFILE_NOT_VISIBLE'],
        [{ ...valid, id: 'private-uuid' }, null, 'PROFILE_UUID_MISMATCH'],
        [{ ...valid, status: 'private-status' }, null, 'PROFILE_INACTIVE'],
        [{ ...valid, role: 'private-role' }, null, 'PROFILE_ROLE_NOT_ALLOWED'],
        [null, { code: '42501' }, 'PROFILE_PERMISSION_DENIED'],
        [null, { code: '42P17' }, 'PROFILE_POLICY_RECURSION'],
        [null, { code: '42703' }, 'PROFILE_SCHEMA_ERROR'],
        [null, { code: 'PGRST116' }, 'PROFILE_CARDINALITY_ERROR'],
        [null, { code: 'unknown' }, 'PROFILE_QUERY_FAILED'],
      ]
      for (const [profile, queryError, code] of cases) {
        setup(profile, queryError && { ...queryError, message: 'private-message', details: 'private-details', hint: 'private-hint' })
        await assert.rejects(loginWithEmail('demo@example.com', 'test-password'), (error) => {
          assert.equal(error.code, code)
          assert.ok(error.message.includes(`[${code}]`))
          assert.doesNotMatch(error.message, /private-|test-password|demo@example|00000000/)
          assert.match(error.message, /La sesión se cerró/)
          return true
        })
        assert.deepEqual(calls.find(([method]) => method === 'eq'), ['eq', 'id', id])
        assert.deepEqual(calls.at(-1), ['signOut', { scope: 'local' }])
      }
      setup()
      client.auth.signInWithPassword = async () => ({ data: { user: { id }, session: { user: { id: 'different' } } }, error: null })
      await assert.rejects(loginWithEmail('demo@example.com', 'test-password'), { code: 'AUTH_UUID_MISMATCH' })
      assert.equal(calls.some(([method]) => method === 'from'), false)
    })

    await t.test('respuesta Auth incompleta cierra sesión; fallo de cierre no anuncia éxito', async () => {
      setup()
      client.auth.signInWithPassword = async () => ({ data: { user: { id } }, error: null })
      await assert.rejects(loginWithEmail('demo@example.com', 'test-password'), /La sesión se cerró/)
      assert.deepEqual(calls, [['signOut', { scope: 'local' }]])
      for (const reject of [false, true]) {
        setup(null)
        client.auth.signOut = async () => {
          if (reject) throw new Error('internal error')
          return { error: new Error('internal error') }
        }
        await assert.rejects(loginWithEmail('demo@example.com', 'test-password'), /ni cerrar la sesión local/)
      }
    })
  } finally {
    if (originals) {
      client.from = originals.from
      client.auth.signInWithPassword = originals.signIn
      client.auth.signOut = originals.signOut
    }
    await server.close()
  }
})
