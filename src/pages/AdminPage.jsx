import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../components/admin/AdminProvider.jsx'
import { AdminAvatar, AdminBadge, AdminConsumption, AdminHeading, AdminIcon, matchesSearch } from '../components/admin/AdminUI.jsx'
import { ReservationDialog, ReservationTable } from '../components/admin/AdminReservations.jsx'
import { clubClock } from '../utils/reservationRules.js'
import { stockFor } from '../utils/adminRules.js'

function AdminPage() {
  const { state } = useAdmin()
  const [query, setQuery] = useState('')
  const [selectedMember, setSelectedMember] = useState(null)
  const [reservationId, setReservationId] = useState(null)
  const today = clubClock().date
  const daily = state.reservations.filter((item) => item.date === today)
  const delivered = state.reservations.filter((item) => item.status === 'completed' && item.deliveredAt === today)
  const lowStock = state.varieties.filter((item) => stockFor(state, item.id) <= state.config.lowStock)
  const results = query.trim() ? state.members.filter((item) => matchesSearch(item, query)).slice(0, 6) : []
  const selected = state.members.find((item) => item.id === selectedMember)
  const metrics = [
    { title: 'Socios registrados', value: state.members.length, note: `${state.members.filter((item) => item.status === 'active').length} activos`, icon: 'members' },
    { title: 'Reservas del día', value: daily.length, note: 'Programadas para hoy', icon: 'dashboard' },
    { title: 'Entregas pendientes', value: state.reservations.filter((item) => item.status === 'confirmed').length, note: 'Reservas sin entregar', icon: 'stock' },
    { title: 'Variedades disponibles', value: state.varieties.filter((item) => item.published && stockFor(state, item.id) > 0).length, note: 'Publicadas y con stock', icon: 'stock' },
  ]
  return <>
    <AdminHeading eyebrow="EL CLUB, EN PERSPECTIVA" title="Dashboard" description="Una mirada a la actividad de hoy y a lo que viene." />
    <div className="admin-metrics">{metrics.map((metric) => <article className="admin-metric" key={metric.title}><div><span>{metric.title}</span><AdminIcon name={metric.icon} /></div><strong>{metric.value}</strong><small>{metric.note}</small></article>)}</div>
    <div className="admin-dashboard-grid">
      <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">AGENDA DE HOY</p><h2>Reservas del día</h2></div><AdminBadge>{daily.length} reservas</AdminBadge></div><ReservationTable reservations={daily} onSelect={(item) => setReservationId(item.id)} /></section>
      <aside className="admin-stack">
        <section className="admin-panel"><div className="admin-panel-heading"><h2>Stock bajo</h2><AdminBadge tone="warning">{lowStock.length}</AdminBadge></div>{lowStock.length ? lowStock.map((item) => <Link className="admin-stock-alert" key={item.id} to="/admin/stock"><span>{item.name}<small>Umbral: {state.config.lowStock} g</small></span><strong>{stockFor(state, item.id)} g ↗</strong></Link>) : <p className="admin-muted">Todas las variedades superan el umbral de alerta.</p>}</section>
        <section className="admin-panel admin-delivery-summary"><p className="admin-eyebrow">ENTREGAS REALIZADAS HOY</p><strong>{delivered.length}<small> entregas</small></strong><p>{delivered.reduce((sum, item) => sum + item.grams, 0)} g entregados</p><small className="admin-muted">Solo operaciones completadas de demostración.</small></section>
      </aside>
    </div>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><div><p className="admin-eyebrow">ACCESO RÁPIDO</p><h2>Encontrá un socio</h2></div><Link className="admin-inline-link" to="/admin/socios">Ver todos →</Link></div>
      <label className="admin-field">Buscar por nombre, usuario o número<input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setSelectedMember(null) }} placeholder="Por ejemplo, Alex o QC-0042" /></label>
      {query.trim() && !selected && <div className="admin-search-results">{results.map((member) => <button key={member.id} onClick={() => setSelectedMember(member.id)}><AdminAvatar member={member} /><span><strong>{member.fullName}</strong><small>{member.number} · {member.username}</small></span><span aria-hidden="true">↗</span></button>)}{!results.length && <p className="admin-muted">No encontramos socios con esa búsqueda.</p>}</div>}
      {selected && <div className="admin-quick-member"><div className="admin-person"><AdminAvatar member={selected} large /><div><h3>{selected.fullName}</h3><p>{selected.number} · {selected.username}</p><p>{selected.email} · {selected.phone}</p><Link className="admin-inline-link" to={`/admin/socios/${selected.id}`}>Abrir ficha completa →</Link></div></div><AdminConsumption reservations={state.reservations.filter((item) => item.memberId === selected.id)} limits={state.config.limits} monthlyOnly /></div>}
    </section>
    {reservationId && <ReservationDialog reservationId={reservationId} onClose={() => setReservationId(null)} />}
  </>
}

export default AdminPage
