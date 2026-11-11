import { useRef, useState } from 'react'
import { useAdmin } from './AdminProvider.jsx'
import { AdminModal } from './AdminUI.jsx'
import AdminPhotoInput from './AdminPhotoInput.jsx'
import { memberStatuses, nextMemberNumber, stockFor } from '../../utils/adminRules.js'
import { clubClock } from '../../utils/reservationRules.js'
import { expenseCategories } from '../../data/adminMock.js'

function FormActions({ error, onClose, label = 'Guardar simulación' }) {
  return <><p className="admin-error" role="alert">{error}</p><div className="admin-form-actions"><button type="button" className="admin-button admin-button--secondary" onClick={onClose}>Cancelar</button><button type="submit" className="admin-button">{label}</button></div></>
}

export function MemberEditor({ member, onClose }) {
  const { state, execute } = useAdmin()
  const password = useRef(null)
  const [draft, setDraft] = useState(member || { fullName: '', username: '', email: '', phone: '', address: '', status: 'active', photo: '' })
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('save-member', draft, member ? 'Datos del socio actualizados de forma simulada.' : 'Socio de ejemplo agregado. No se creó una cuenta ni se almacenó la contraseña.')
    if (message) { setError(message); return }
    if (password.current) password.current.value = ''
    onClose()
  }
  return <AdminModal title={member ? 'Editar socio' : 'Nuevo socio'} onClose={onClose} wide>
    <p className="admin-callout">{member ? 'Los cambios afectan únicamente esta demostración.' : 'Alta ficticia. No crea credenciales reales. El cambio obligatorio de contraseña en el primer ingreso quedará pendiente de la autenticación real.'}</p>
    <form onSubmit={submit} className="admin-form">
      <div className="admin-form-grid">
        <label className="admin-field">Nombre completo<input required maxLength={100} value={draft.fullName} onChange={(event) => update('fullName', event.target.value)} /></label>
        <label className="admin-field">Usuario<input required maxLength={50} autoComplete="off" value={draft.username} onChange={(event) => update('username', event.target.value)} /></label>
        <label className="admin-field">Correo electrónico<input required type="email" value={draft.email} onChange={(event) => update('email', event.target.value)} /></label>
        <label className="admin-field">Teléfono<input required type="tel" value={draft.phone} onChange={(event) => update('phone', event.target.value)} /></label>
        <label className="admin-field admin-span-2">Dirección<input required value={draft.address} onChange={(event) => update('address', event.target.value)} /></label>
        <label className="admin-field">Número de socio<input readOnly value={member?.number ?? nextMemberNumber(state.members)} /></label>
        <label className="admin-field">Estado{!member && ' inicial'}<select value={draft.status} onChange={(event) => update('status', event.target.value)}>{Object.entries(memberStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        {!member && <label className="admin-field admin-span-2">Contraseña temporal · no se almacena<input ref={password} required type="password" minLength={8} autoComplete="new-password" placeholder="Mínimo 8 caracteres; solo para probar el formulario" /></label>}
      </div>
      <AdminPhotoInput value={draft.photo} onChange={(value) => update('photo', value)} />
      <FormActions error={error} onClose={onClose} label={member ? 'Guardar cambios simulados' : 'Agregar socio ficticio'} />
    </form>
  </AdminModal>
}

export function VarietyEditor({ variety, onClose }) {
  const { execute } = useAdmin()
  const [draft, setDraft] = useState(variety ? { ...variety, characteristics: variety.characteristics.join(', ') } : { name: '', description: '', characteristics: '', price: '', image: '', published: true })
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('save-variety', { ...draft, price: Number(draft.price), characteristics: draft.characteristics.split(',') }, 'Variedad guardada de forma simulada. El stock se administra con movimientos.')
    if (message) { setError(message); return }
    onClose()
  }
  return <AdminModal title={variety ? 'Editar variedad' : 'Agregar variedad'} onClose={onClose}>
    <form className="admin-form" onSubmit={submit}>
      <label className="admin-field">Nombre<input required maxLength={80} value={draft.name} onChange={(event) => update('name', event.target.value)} /></label>
      <label className="admin-field">Descripción<textarea required rows={3} value={draft.description} onChange={(event) => update('description', event.target.value)} /></label>
      <label className="admin-field">Características · separadas por comas<input value={draft.characteristics} onChange={(event) => update('characteristics', event.target.value)} placeholder="Híbrida, Aroma cítrico, Cultivo interior" /></label>
      <label className="admin-field">Precio por gramo · UYU<input type="number" required min="0.01" step="0.01" value={draft.price} onChange={(event) => update('price', event.target.value)} /></label>
      <label className="admin-checkbox"><input type="checkbox" checked={draft.published} onChange={(event) => update('published', event.target.checked)} />Variedad activa / publicada</label>
      <AdminPhotoInput label="Fotografía de la variedad" value={draft.image} onChange={(value) => update('image', value)} />
      {!variety && <p className="admin-muted">La variedad comienza con 0 g. Agregá inventario desde Registrar movimiento.</p>}
      <FormActions error={error} onClose={onClose} />
    </form>
  </AdminModal>
}

export function StockMovementForm({ initialVarietyId, onClose }) {
  const { state, execute } = useAdmin()
  const [draft, setDraft] = useState({ varietyId: initialVarietyId || state.varieties[0]?.id || '', type: 'entry', quantity: '', reason: '', date: clubClock().date, cost: '' })
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('stock-movement', { ...draft, quantity: Number(draft.quantity), cost: Number(draft.cost) }, 'Movimiento de inventario simulado registrado.')
    if (message) { setError(message); return }
    onClose()
  }
  return <AdminModal title="Registrar movimiento de inventario" onClose={onClose}>
    <form className="admin-form" onSubmit={submit}>
      <label className="admin-field">Variedad<select required value={draft.varietyId} onChange={(event) => update('varietyId', event.target.value)}>{state.varieties.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <p className="admin-muted">Stock actual: {stockFor(state, draft.varietyId)} g</p>
      <label className="admin-field">Tipo<select value={draft.type} onChange={(event) => { update('type', event.target.value); update('quantity', '') }}><option value="entry">Entrada de stock</option><option value="adjustment">Ajuste de inventario</option><option value="purchase">Compra / adquisición</option></select></label>
      <label className="admin-field">Cantidad en gramos{draft.type === 'adjustment' && ' · positiva o negativa'}<input type="number" required step="0.01" min={draft.type === 'adjustment' ? undefined : '0.01'} value={draft.quantity} onChange={(event) => update('quantity', event.target.value)} /></label>
      <label className="admin-field">Fecha<input type="date" required max={clubClock().date} value={draft.date} onChange={(event) => update('date', event.target.value)} /></label>
      <label className="admin-field">Motivo<input required maxLength={180} value={draft.reason} onChange={(event) => update('reason', event.target.value)} /></label>
      {draft.type === 'purchase' && <><label className="admin-field">Importe total de la compra · UYU<input type="number" required min="0.01" step="0.01" value={draft.cost} onChange={(event) => update('cost', event.target.value)} /></label><p className="admin-callout">Se registrará un único gasto en Balance, vinculado a este movimiento. No lo registres nuevamente como gasto.</p></>}
      <FormActions error={error} onClose={onClose} />
    </form>
  </AdminModal>
}

export function ExpenseForm({ onClose }) {
  const { execute } = useAdmin()
  const [draft, setDraft] = useState({ date: clubClock().date, concept: '', category: 'Operación', amount: '', notes: '' })
  const [error, setError] = useState('')
  const update = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }))
  function submit(event) {
    event.preventDefault()
    const message = execute('expense', { ...draft, amount: Number(draft.amount) }, 'Gasto ficticio registrado. No se realizó ningún pago.')
    if (message) { setError(message); return }
    onClose()
  }
  return <AdminModal title="Registrar gasto ficticio" onClose={onClose}>
    <form className="admin-form" onSubmit={submit}>
      <label className="admin-field">Fecha<input type="date" required max={clubClock().date} value={draft.date} onChange={(event) => update('date', event.target.value)} /></label>
      <label className="admin-field">Concepto<input required maxLength={160} value={draft.concept} onChange={(event) => update('concept', event.target.value)} /></label>
      <label className="admin-field">Categoría<select value={draft.category} onChange={(event) => update('category', event.target.value)}>{expenseCategories.filter((item) => item !== 'Compras de stock').map((category) => <option key={category}>{category}</option>)}</select></label>
      <label className="admin-field">Importe · UYU<input type="number" required min="0.01" step="0.01" value={draft.amount} onChange={(event) => update('amount', event.target.value)} /></label>
      <label className="admin-field">Observaciones<textarea rows={3} value={draft.notes} onChange={(event) => update('notes', event.target.value)} /></label>
      <p className="admin-muted">Las compras de inventario se registran desde Stock para evitar duplicaciones.</p>
      <FormActions error={error} onClose={onClose} label="Registrar gasto simulado" />
    </form>
  </AdminModal>
}
