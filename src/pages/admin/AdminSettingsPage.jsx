import { useState } from 'react'
import { useAdmin } from '../../components/admin/AdminProvider.jsx'
import { AdminHeading } from '../../components/admin/AdminUI.jsx'
import AdminInformationCards from '../../components/admin/AdminInformationCards.jsx'

const days = [[1, 'Lunes'], [2, 'Martes'], [3, 'Miércoles'], [4, 'Jueves'], [5, 'Viernes'], [6, 'Sábado'], [0, 'Domingo']]

export default function AdminSettingsPage() {
  const { state, execute } = useAdmin()
  const [draft, setDraft] = useState(() => structuredClone(state.config))
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('settings', draft, 'Configuración de ejemplo actualizada solo en el panel administrativo. No se publicó en el área del socio.')
    setError(message)
  }
  return <>
    <AdminHeading eyebrow="PREFERENCIAS DEL CLUB" title="Configuración" description="Mismos permisos para todos los administradores de demostración." />
    <p className="admin-callout">Información del club se guarda en Supabase y las tarjetas activas se muestran a los socios. El resto de esta configuración continúa siendo simulado y se guarda por separado. Los documentos no tienen carácter legal definitivo.</p>
    <AdminInformationCards />
    <form className="admin-settings-form admin-section" onSubmit={submit}>
      <fieldset className="admin-panel"><legend>Información general del club</legend><div className="admin-form-grid">
        <label className="admin-field">Nombre del club<input required value={draft.clubName} onChange={(event) => update('clubName', event.target.value)} /></label>
        <label className="admin-field">Correo de contacto<input type="email" value={draft.email} onChange={(event) => update('email', event.target.value)} /></label>
        <label className="admin-field admin-span-2">Dirección<input value={draft.address} onChange={(event) => update('address', event.target.value)} /></label>
        <label className="admin-field admin-span-2">Descripción<textarea rows={3} value={draft.description} onChange={(event) => update('description', event.target.value)} /></label>
      </div></fieldset>
      <fieldset className="admin-panel"><legend>Horarios de atención y cupos</legend><div className="admin-day-options">{days.map(([value, label]) => <label className="admin-checkbox" key={value}><input type="checkbox" checked={draft.days.includes(value)} onChange={(event) => update('days', event.target.checked ? [...draft.days, value] : draft.days.filter((day) => day !== value))} />{label}</label>)}</div><div className="admin-form-grid">
        <label className="admin-field">Apertura<input type="time" required step="3600" value={draft.opening} onChange={(event) => update('opening', event.target.value)} /></label>
        <label className="admin-field">Cierre<input type="time" required step="3600" value={draft.closing} onChange={(event) => update('closing', event.target.value)} /></label>
        <label className="admin-field">Socios por turno de una hora<input type="number" required min="1" step="1" value={draft.capacity} onChange={(event) => update('capacity', Number(event.target.value))} /></label>
      </div></fieldset>
      <fieldset className="admin-panel"><legend>Límites de consumo e inventario</legend><p className="admin-muted">Valores de ejemplo configurables. No modifican entregas ya registradas ni representan asesoramiento normativo.</p><div className="admin-form-grid">
        <label className="admin-field">Límite mensual · g<input type="number" required min="1" value={draft.limits.monthly} onChange={(event) => update('limits', { ...draft.limits, monthly: Number(event.target.value) })} /></label>
        <label className="admin-field">Límite anual · g<input type="number" required min="1" value={draft.limits.annual} onChange={(event) => update('limits', { ...draft.limits, annual: Number(event.target.value) })} /></label>
        <label className="admin-field">Alerta de stock bajo · g<input type="number" required min="0" value={draft.lowStock} onChange={(event) => update('lowStock', Number(event.target.value))} /></label>
      </div></fieldset>
      {[
        ['faq', 'Preguntas frecuentes', 'Contenido de ejemplo, pendiente de validación del club.'],
        ['statutes', 'Estatutos', 'Borrador visual. Incorporar únicamente los estatutos oficiales validados.'],
        ['terms', 'Términos y condiciones', 'Texto de ejemplo sin carácter legal definitivo.'],
        ['communications', 'Comunicaciones para socios', 'Preparado para una publicación futura; por ahora no se envía ni publica.'],
      ].map(([key, title, note]) => <fieldset className="admin-panel" key={key}><legend>{title}</legend><p className="admin-muted">{note}</p><label className="admin-field">Contenido de demostración<textarea rows={5} value={draft[key]} onChange={(event) => update(key, event.target.value)} /></label></fieldset>)}
      <p className="admin-error" role="alert">{error}</p><div className="admin-form-actions"><button type="button" className="admin-button admin-button--secondary" onClick={() => { setDraft(structuredClone(state.config)); setError('') }}>Descartar cambios sin guardar</button><button className="admin-button" type="submit">Guardar configuración simulada</button></div>
    </form>
  </>
}
