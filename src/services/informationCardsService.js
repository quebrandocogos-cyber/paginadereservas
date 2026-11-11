import { supabase } from './supabaseClient.js'

const columns = 'id,title,description,display_order,is_active,created_at,updated_at'

async function requireSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error || !data.session) throw new Error('Iniciá sesión para consultar o gestionar las tarjetas del club.')
}

function checkError(error) {
  if (!error) return
  if (['42501', 'PGRST301', 'PGRST302', 'PGRST303'].includes(error.code)) {
    throw new Error('Tu sesión no tiene permisos para esta operación. Ingresá con una cuenta autorizada.')
  }
  throw new Error(error.message || 'No se pudo conectar con las tarjetas del club. Volvé a intentar.')
}

function fields(draft) {
  const title = typeof draft.title === 'string' ? draft.title.trim() : ''
  const description = typeof draft.description === 'string' ? draft.description.trim() : ''
  if (!title || !description) throw new Error('Completá el título y la descripción.')
  if (!Number.isInteger(draft.display_order) || draft.display_order < -2147483648 || draft.display_order > 2147483647) {
    throw new Error('El orden debe ser un número entero entre -2147483648 y 2147483647.')
  }
  if (typeof draft.is_active !== 'boolean') throw new Error('Indicá la visibilidad de la tarjeta.')
  return { title, description, display_order: draft.display_order, is_active: draft.is_active }
}

function requireId(id) {
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    throw new Error('El identificador de la tarjeta no es válido. Actualizá el listado.')
  }
}

function confirmedRow(data, id) {
  if (!Array.isArray(data) || data.length !== 1 || data[0].id !== id) {
    throw new Error('El servidor no confirmó el cambio de esta tarjeta. Puede haber sido eliminada o no tenés permisos. Actualizá el listado antes de reintentar.')
  }
  return data[0]
}

export async function listInformationCards({ activeOnly = false, signal } = {}) {
  await requireSession()
  let query = supabase.from('information_cards').select(columns)
  if (activeOnly) query = query.eq('is_active', true)
  query = query.order('display_order', { ascending: true }).order('id', { ascending: true })
  if (signal) query = query.abortSignal(signal)
  const { data, error } = await query
  checkError(error)
  return data
}

export async function createInformationCard(draft) {
  const values = fields(draft)
  requireId(draft.id)
  await requireSession()
  const now = new Date().toISOString()
  // ID estable del borrador: un reintento no crea una segunda tarjeta.
  const { data, error } = await supabase.from('information_cards').insert({
    ...values, id: draft.id, is_active: false, created_at: now, updated_at: now,
  }).select(columns)
  checkError(error)
  return confirmedRow(data, draft.id)
}

export async function updateInformationCard(id, draft) {
  requireId(id)
  const values = fields(draft)
  await requireSession()
  // No dependemos de un trigger no verificado; conservamos el valor devuelto por el servidor.
  const { data, error } = await supabase.from('information_cards')
    .update({ ...values, updated_at: new Date().toISOString() }).eq('id', id).select(columns)
  checkError(error)
  return confirmedRow(data, id)
}

export async function deleteInformationCard(id) {
  requireId(id)
  await requireSession()
  const { data, error } = await supabase.from('information_cards').delete().eq('id', id).select('id')
  checkError(error)
  return confirmedRow(data, id)
}
