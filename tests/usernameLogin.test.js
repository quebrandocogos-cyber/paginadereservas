import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'

test('login por usuario: Edge Function, sesión persistida y perfil real (SDK simulado)', async (t) => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
  let client, originals, functionsDescriptor
  try {
    const { loginWithUsername } = await server.ssrLoadModule('/src/services/authService.js')
    client = (await server.ssrLoadModule('/src/services/supabaseClient.js')).supabase
    functionsDescriptor = Object.getOwnPropertyDescriptor(client, 'functions')
    Object.defineProperty(client, 'functions', { configurable: true, value: { invoke: async () => { throw new Error('Unexpected invocation') } } })
    originals = { invoke: client.functions.invoke, setSession: client.auth.setSession, getSession: client.auth.getSession, getUser: client.auth.getUser, signOut: client.auth.signOut, from: client.from }
    const id = '00000000-0000-4000-8000-000000000001'
    const tokens = { access_token: 'TEST_ONLY_ACCESS', refresh_token: 'TEST_ONLY_REFRESH' }
    const session = { ...tokens, user: { id } }
    let calls, profile
    function setup() {
      calls = []
      profile = { id, role: 'admin', status: 'active' }
      client.functions.invoke = async (name, options) => {
        calls.push('invoke')
        assert.equal(name, 'login-with-username')
        assert.deepEqual(options.body, { username: 'alvaro', password: ' test password ' })
        return { data: { session: tokens, profile: { role: 'untrusted' } }, error: null }
      }
      client.auth.setSession = async (value) => { calls.push('setSession'); assert.deepEqual(value, tokens); return { data: { session }, error: null } }
      client.auth.getSession = async () => ({ data: { session }, error: null })
      client.auth.getUser = async () => ({ data: { user: { id } }, error: null })
      client.auth.signOut = async (options) => { calls.push('signOut'); assert.deepEqual(options, { scope: 'local' }); return { error: null } }
      client.from = (table) => {
        assert.equal(table, 'profiles')
        const query = {
          select() { return query },
          eq(key, value) { assert.equal(key, 'id'); assert.equal(value, id); return query },
          async maybeSingle() { calls.push('profile'); return { data: profile, error: null } },
        }
        return query
      }
    }
    const login = () => loginWithUsername(' Alvaro ', ' test password ')
    await t.test('normaliza usuario, conserva contraseña y autoriza con profiles, no con el perfil remoto', async () => {
      for (const role of ['admin', 'member']) {
        setup(); profile.role = role
        assert.deepEqual(await login(), profile)
        assert.deepEqual(calls, ['invoke', 'setSession', 'profile'])
      }
    })
    await t.test('espera confirmación de setSession antes de consultar perfil', async () => {
      setup()
      let release
      client.auth.setSession = () => new Promise(resolve => { release = () => resolve({ data: { session }, error: null }) })
      const pending = login()
      await new Promise(resolve => setImmediate(resolve))
      assert.deepEqual(calls, ['invoke'])
      release()
      assert.equal((await pending).role, 'admin')
    })
    await t.test('HTTP JSON, texto y fallos de conexión no filtran cuerpos ni tokens', async () => {
      for (const status of [400, 401, 403, 404, 429, 500]) {
        for (const body of ['PRIVATE_EMAIL_TOKEN', '{"error":"PRIVATE_EMAIL_TOKEN"}']) {
          setup()
          client.functions.invoke = async () => ({ error: { context: new Response(body, { status }), message: 'PRIVATE_EMAIL_TOKEN' } })
          await assert.rejects(login(), error => !error.message.includes('PRIVATE') && (status !== 500 || error.message.includes('HTTP 500')))
          assert.deepEqual(calls, [])
        }
      }
      for (const thrown of [false, true]) {
        setup()
        client.functions.invoke = async () => { if (thrown) throw new Error('PRIVATE'); return { error: { message: 'PRIVATE' } } }
        await assert.rejects(login(), /conectar/)
      }
    })
    await t.test('respuesta incompleta no establece sesión', async () => {
      for (const data of [null, {}, { session: {} }, { session: { access_token: 'only' } }, { session: tokens, error: 'PRIVATE' }]) {
        setup()
        client.functions.invoke = async () => ({ data, error: null })
        await assert.rejects(login(), /sesión válida/)
        assert.deepEqual(calls, [])
      }
    })
    await t.test('perfil inválido o fallo de establecimiento cierra sesión y no anuncia éxito', async () => {
      for (const mode of ['missing', 'inactive', 'role', 'uuid', 'setSession', 'query']) {
        setup()
        if (mode === 'missing') profile = null
        if (mode === 'inactive') profile.status = 'inactive'
        if (mode === 'role') profile.role = 'other'
        if (mode === 'uuid') profile.id = 'other'
        if (mode === 'setSession') client.auth.setSession = async () => ({ error: { message: 'PRIVATE' } })
        if (mode === 'query') client.from = () => { throw new Error('PRIVATE') }
        await assert.rejects(login(), /La sesión se cerró/)
        assert.equal(calls.at(-1), 'signOut')
      }
      setup(); profile = null
      client.auth.signOut = async () => ({ error: {} })
      await assert.rejects(login(), /ni cerrar la sesión/)
    })
  } finally {
    if (originals) {
      client.functions.invoke = originals.invoke
      client.from = originals.from
      for (const key of ['setSession', 'getSession', 'getUser', 'signOut']) client.auth[key] = originals[key]
      if (functionsDescriptor) Object.defineProperty(client, 'functions', functionsDescriptor)
      else delete client.functions
    }
    await server.close()
  }
})
