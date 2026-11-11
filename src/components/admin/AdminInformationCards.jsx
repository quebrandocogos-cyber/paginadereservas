import { useEffect, useRef, useState } from 'react'
import { AdminModal } from './AdminUI.jsx'
import { adminAlert } from './adminAlerts.js'
import { createInformationCard, deleteInformationCard, listInformationCards, updateInformationCard } from '../../services/informationCardsService.js'

function InformationCardEditor({ card, initialOrder, onClose, onSaved }) {
  const [draft, setDraft] = useState(() => card || { id: crypto.randomUUID(), title: '', description: '', display_order: initialOrder, is_active: false })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const busy = useRef(false)
  const mounted = useRef(false)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  const close = () => { if (!busy.current) onClose() }

  async function submit(event) {
    event.preventDefault()
    if (busy.current) return
    busy.current = true
    setSaving(true)
    setError('')
    try {
      const saved = card ? await updateInformationCard(card.id, draft) : await createInformationCard(draft)
      if (mounted.current) onSaved(saved)
    } catch (failure) {
      if (mounted.current) setError(failure.message)
    } finally {
      busy.current = false
      if (mounted.current) setSaving(false)
    }
  }

  return <AdminModal title={card ? 'Editar tarjeta informativa' : 'Nueva tarjeta informativa'} onClose={close}>
    <form className="admin-form" onSubmit={submit} aria-busy={saving}>
      <label className="admin-field">Título<input required disabled={saving} value={draft.title} onChange={(event) => update('title', event.target.value)} /></label>
      <label className="admin-field">Descripción<textarea required disabled={saving} rows={4} value={draft.description} onChange={(event) => update('description', event.target.value)} /></label>
      <label className="admin-field">Orden<input required disabled={saving} type="number" step="1" min="-2147483648" max="2147483647" value={draft.display_order} onChange={(event) => update('display_order', event.target.value === '' ? '' : Number(event.target.value))} /></label>
      <label className="admin-checkbox"><input type="checkbox" disabled={saving || !card} checked={draft.is_active} onChange={(event) => update('is_active', event.target.checked)} />Visible para socios</label>
      {!card && <p className="admin-muted">La tarjeta se creará inactiva. Después de guardarla, editá su visibilidad para publicarla.</p>}
      <p className="admin-error" role="alert">{error}</p>
      <div className="admin-form-actions">
        <button type="button" disabled={saving} className="admin-button admin-button--secondary" onClick={close}>Cancelar</button>
        <button type="submit" disabled={saving} className="admin-button">{saving ? 'Guardando…' : 'Guardar tarjeta'}</button>
      </div>
    </form>
  </AdminModal>
}

export default function AdminInformationCards() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [revision, setRevision] = useState(0)
  const [editor, setEditor] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const busy = useRef(false)
  const mounted = useRef(false)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    listInformationCards({ signal: controller.signal }).then((rows) => {
      if (!controller.signal.aborted) setCards(rows)
    }).catch((failure) => {
      if (!controller.signal.aborted) setError(failure.message)
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false)
    })
    return () => controller.abort()
  }, [revision])

  function saved(card) {
    setCards((previous) => [...previous.filter((item) => item.id !== card.id), card]
      .sort((a, b) => a.display_order - b.display_order || a.id.localeCompare(b.id)))
    setEditor(null)
    setNotice('Tarjeta guardada en Supabase.')
    setError('')
  }

  async function remove(card) {
    if (busy.current) return
    busy.current = true
    setDeleting(true)
    setNotice('')
    try {
      const result = await adminAlert({ icon: 'warning', title: '¿Eliminar la tarjeta informativa?', text: 'Se eliminará «' + card.title + '» de forma permanente.', showCancelButton: true, confirmButtonText: 'Eliminar tarjeta', cancelButtonText: 'Cancelar' })
      if (!result.isConfirmed || !mounted.current) return
      await deleteInformationCard(card.id)
      if (!mounted.current) return
      setCards((previous) => previous.filter((item) => item.id !== card.id))
      setError('')
      setNotice('Tarjeta eliminada de Supabase.')
    } catch (failure) {
      if (mounted.current) setError(failure.message)
    } finally {
      busy.current = false
      if (mounted.current) setDeleting(false)
    }
  }

  const disabled = loading || deleting || Boolean(error)
  const nextOrder = Math.min(2147483647, Math.max(0, ...cards.map((card) => card.display_order)) + 1)
  return <section className="admin-panel admin-section" aria-labelledby="information-cards-title" aria-busy={loading || deleting}>
    <div className="admin-panel-heading">
      <h2 id="information-cards-title">Información del club</h2>
      <button type="button" disabled={disabled} className="admin-button" onClick={() => { setNotice(''); setEditor({}) }}>＋ Nueva tarjeta</button>
    </div>
    <p className="admin-muted">Estas tarjetas se guardan en Supabase. Solo las activas se muestran al socio. Los permisos dependen de tu sesión real, no del administrador de ejemplo seleccionado.</p>
    {loading && <p role="status">Cargando tarjetas…</p>}
    {error && <div><p className="admin-error" role="alert">{error}</p><button type="button" className="admin-button admin-button--secondary" disabled={loading || deleting} onClick={() => setRevision((value) => value + 1)}>Reintentar carga</button></div>}
    {notice && <p role="status">{notice}</p>}
    {!loading && !error && <div className="admin-stack">
      {cards.map((card) => <article className="admin-panel" key={card.id}>
        <h3>{card.title}</h3>
        <p className="admin-muted">{card.description}</p>
        <p className="admin-muted">Orden: {card.display_order} · {card.is_active ? 'Visible para socios' : 'Inactiva'}</p>
        <div className="admin-inline-actions">
          <button type="button" disabled={disabled} className="admin-button admin-button--secondary" onClick={() => { setNotice(''); setEditor(card) }}>Editar<span className="admin-sr-only"> {card.title}</span></button>
          <button type="button" disabled={disabled} className="admin-text-button" onClick={() => remove(card)}>Eliminar<span className="admin-sr-only"> {card.title}</span></button>
        </div>
      </article>)}
      {cards.length === 0 && <p className="admin-muted">No hay tarjetas disponibles para tu sesión.</p>}
    </div>}
    {editor && <InformationCardEditor card={editor.id ? editor : null} initialOrder={nextOrder} onClose={() => setEditor(null)} onSaved={saved} />}
  </section>
}
