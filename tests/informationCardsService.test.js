import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'

test('contrato de tarjetas con Supabase simulado, sin acceso remoto', async (t) => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
  let client
  let originalFrom
  let originalSession
  try {
    const service = await server.ssrLoadModule('/src/services/informationCardsService.js')
    client = (await server.ssrLoadModule('/src/services/supabaseClient.js')).supabase
    originalFrom = client.from
    originalSession = client.auth.getSession
    const id = '00000000-0000-4000-8000-000000000001'
    const draft = { id, title: '  Información  ', description: '  Descripción  ', display_order: 3, is_active: true }
    let calls
    let response
    const reset = (data = [{ ...draft, title: 'Información', description: 'Descripción' }], error = null) => {
      calls = []
      response = { data, error }
      client.auth.getSession = async () => ({ data: { session: { user: { id: 'test-user' } } }, error: null })
      client.from = (table) => {
        calls.push(['from', table])
        const query = { then: (resolve, reject) => Promise.resolve(response).then(resolve, reject) }
        for (const method of ['select', 'eq', 'order', 'abortSignal', 'insert', 'update', 'delete']) {
          query[method] = (...args) => { calls.push([method, ...args]); return query }
        }
        return query
      }
    }

    await t.test('socio filtra activas y ordena por orden e ID; admin no filtra visibilidad', async () => {
      reset([])
      const signal = new AbortController().signal
      assert.deepEqual(await service.listInformationCards({ activeOnly: true, signal }), [])
      assert.deepEqual(calls.filter(([method]) => method === 'eq'), [['eq', 'is_active', true]])
      assert.deepEqual(calls.filter(([method]) => method === 'order'), [['order', 'display_order', { ascending: true }], ['order', 'id', { ascending: true }]])
      assert.equal(calls.find(([method]) => method === 'abortSignal')[1], signal)
      reset()
      await service.listInformationCards()
      assert.equal(calls.some(([method]) => method === 'eq'), false)
    })

    await t.test('rechaza campos vacíos, tipos inválidos y orden fuera de INTEGER antes de enviar', async () => {
      reset()
      for (const change of [{ title: ' ' }, { description: '' }, { display_order: '' }, { display_order: 1.5 }, { display_order: 2147483648 }, { display_order: NaN }, { is_active: 'true' }, { id: 'info-01' }]) {
        await assert.rejects(service.createInformationCard({ ...draft, ...change }))
      }
      assert.deepEqual(calls, [])
    })

    await t.test('creación fuerza inactiva, conserva ID de reintento y envía solo campos permitidos', async () => {
      reset([{ ...draft, is_active: false }])
      const saved = await service.createInformationCard({ ...draft, adminId: 'simulated-admin' })
      const sent = calls.find(([method]) => method === 'insert')[1]
      assert.equal(sent.id, id)
      assert.equal(sent.is_active, false)
      assert.equal(sent.title, 'Información')
      assert.equal(sent.description, 'Descripción')
      assert.equal(Object.hasOwn(sent, 'adminId'), false)
      assert.equal(Number.isNaN(Date.parse(sent.created_at)), false)
      assert.equal(sent.updated_at, sent.created_at)
      assert.equal(saved.is_active, false)
    })

    await t.test('edición publica, filtra UUID y actualiza timestamp sin asumir trigger', async () => {
      reset([{ ...draft, updated_at: '2026-11-10T12:00:00Z' }])
      const result = await service.updateInformationCard(id, draft)
      const sent = calls.find(([method]) => method === 'update')[1]
      assert.equal(sent.is_active, true)
      assert.equal(Object.hasOwn(sent, 'created_at'), false)
      assert.equal(Number.isNaN(Date.parse(sent.updated_at)), false)
      assert.deepEqual(calls.find(([method]) => method === 'eq'), ['eq', 'id', id])
      assert.equal(result.updated_at, '2026-11-10T12:00:00Z')
    })

    await t.test('no declara éxito si UPDATE o DELETE no devuelve la fila esperada', async () => {
      for (const rows of [[], null, [{ id: 'other' }]]) {
        reset(rows)
        await assert.rejects(service.updateInformationCard(id, draft), /no confirmó/)
        await assert.rejects(service.deleteInformationCard(id), /no confirmó/)
      }
      reset([{ id }])
      assert.deepEqual(await service.deleteInformationCard(id), { id })
      assert.deepEqual(calls.find(([method]) => method === 'eq'), ['eq', 'id', id])
    })

    await t.test('sesión ausente, permisos y red producen error sin mocks de respaldo', async () => {
      reset()
      client.auth.getSession = async () => ({ data: { session: null }, error: null })
      await assert.rejects(service.listInformationCards(), /Iniciá sesión/)
      assert.deepEqual(calls, [])
      reset(null, { code: '42501', message: 'RLS denied' })
      await assert.rejects(service.createInformationCard(draft), /permisos/)
      reset(null, { message: 'Failed to fetch' })
      await assert.rejects(service.listInformationCards(), /Failed to fetch/)
    })

    await t.test('el guardado permanece pendiente hasta que responde el servidor', async () => {
      reset()
      let finish
      response = new Promise((resolve) => { finish = resolve })
      let settled = false
      const pending = service.updateInformationCard(id, draft).then(() => { settled = true })
      await new Promise((resolve) => setImmediate(resolve))
      assert.equal(settled, false)
      finish({ data: [{ ...draft }], error: null })
      await pending
      assert.equal(settled, true)
    })
  } finally {
    if (client) {
      client.from = originalFrom
      client.auth.getSession = originalSession
    }
    await server.close()
  }
})
