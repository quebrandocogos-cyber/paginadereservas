import { useState } from 'react'
import { useAdmin } from '../../components/admin/AdminProvider.jsx'
import { AdminBadge, AdminHeading, AdminTable } from '../../components/admin/AdminUI.jsx'
import { StockMovementForm, VarietyEditor } from '../../components/admin/AdminForms.jsx'
import { stockFor } from '../../utils/adminRules.js'
import { formatDate, money } from '../../utils/reservationRules.js'

const movementLabels = { entry: 'Entrada', adjustment: 'Ajuste', purchase: 'Compra', delivery: 'Entrega' }

export default function AdminStockPage() {
  const { state, execute, administrators } = useAdmin()
  const [editor, setEditor] = useState(null)
  const [movement, setMovement] = useState(null)
  const [varietyFilter, setVarietyFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const movements = state.stockMovements.filter((item) => (!varietyFilter || item.varietyId === varietyFilter) && (!typeFilter || item.type === typeFilter)).slice().sort((a, b) => b.date.localeCompare(a.date))
  const lowStock = state.varieties.filter((item) => stockFor(state, item.id) <= state.config.lowStock)
  return <>
    <AdminHeading eyebrow="VARIEDADES E INVENTARIO" title="Stock" description="Cada gramo tiene un movimiento. Inventario ficticio de la sesión."><div className="admin-inline-actions"><button className="admin-button admin-button--secondary" onClick={() => setMovement({})}>Registrar movimiento</button><button className="admin-button" onClick={() => setEditor({})}>＋ Agregar variedad</button></div></AdminHeading>
    {lowStock.length > 0 && <p className="admin-callout admin-callout--warning">Stock bajo: {lowStock.map((item) => `${item.name} (${stockFor(state, item.id)} g)`).join(' · ')}. Umbral de alerta: {state.config.lowStock} g.</p>}
    <div className="admin-varieties">{state.varieties.map((variety) => <article className="admin-panel admin-stock-card" key={variety.id}>
      {variety.image ? <img className="admin-stock-photo" src={variety.image} alt={`Fotografía ilustrativa de ${variety.name}`} /> : <div className="admin-stock-photo admin-stock-placeholder">Sin fotografía</div>}
      <div className="admin-panel-heading"><h2>{variety.name}</h2><AdminBadge tone={variety.published ? '' : 'muted'}>{variety.published ? 'Publicada' : 'Inactiva'}</AdminBadge></div>
      <p className="admin-muted">{variety.description}</p><ul className="admin-tags">{variety.characteristics.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
      <div className="admin-stock-numbers"><div><small>Stock actual</small><strong>{stockFor(state, variety.id)} g</strong></div><div><small>Precio por gramo</small><strong>{money(variety.price)}</strong></div></div>
      <div className="admin-inline-actions"><button className="admin-button admin-button--secondary" onClick={() => setEditor(variety)}>Editar variedad</button><button className="admin-text-button" onClick={() => execute('toggle-variety', { varietyId: variety.id }, 'Publicación de la variedad cambiada en la demostración.')}>{variety.published ? 'Desactivar' : 'Activar'}</button><button className="admin-text-button" onClick={() => setMovement({ varietyId: variety.id })}>Mover stock →</button></div>
    </article>)}</div>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><h2>Historial de movimientos</h2><span className="admin-muted">Entradas, ajustes, compras y entregas</span></div>
      <div className="admin-filters"><label className="admin-field">Variedad<select value={varietyFilter} onChange={(event) => setVarietyFilter(event.target.value)}><option value="">Todas las variedades</option>{state.varieties.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="admin-field">Tipo<select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option value="">Todos los movimientos</option>{Object.entries(movementLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>
      <AdminTable caption="Movimientos de inventario ficticios" rows={movements} columns={[
        { key: 'date', label: 'Fecha', render: (item) => formatDate(item.date) },
        { key: 'varietyId', label: 'Variedad', render: (item) => state.varieties.find((variety) => variety.id === item.varietyId)?.name },
        { key: 'type', label: 'Tipo', render: (item) => movementLabels[item.type] },
        { key: 'quantity', label: 'Cantidad', render: (item) => <span className={item.quantity > 0 ? 'admin-positive' : 'admin-negative'}>{item.quantity > 0 ? '+' : ''}{Number(item.quantity.toFixed(2))} g</span> },
        { key: 'reason', label: 'Motivo' }, { key: 'adminId', label: 'Responsable', render: (item) => administrators.find((admin) => admin.id === item.adminId)?.name },
      ]} />
    </section>
    {editor && <VarietyEditor variety={editor.id ? editor : null} onClose={() => setEditor(null)} />}
    {movement && <StockMovementForm initialVarietyId={movement.varietyId} onClose={() => setMovement(null)} />}
  </>
}
