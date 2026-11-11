import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAdmin } from '../../components/admin/AdminProvider.jsx'
import { AdminAvatar, AdminBadge, AdminConsumption, AdminHeading, AdminModal } from '../../components/admin/AdminUI.jsx'
import { MemberEditor } from '../../components/admin/AdminForms.jsx'
import { ReservationDialog, ReservationTable } from '../../components/admin/AdminReservations.jsx'
import { adminAlert, confirmSimulation } from '../../components/admin/adminAlerts.js'
import { memberStatuses } from '../../utils/adminRules.js'
import { formatDate } from '../../utils/reservationRules.js'

export default function AdminMemberDetailPage() {
  const { memberId } = useParams()
  const { state, execute } = useAdmin()
  const [editing, setEditing] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)
  const [reservationId, setReservationId] = useState(null)
  const member = state.members.find((item) => item.id === memberId)
  if (!member) return <><AdminHeading eyebrow="SOCIOS" title="Socio no encontrado" /><Link className="admin-inline-link" to="/admin/socios">← Volver a socios</Link></>
  const records = state.reservations.filter((item) => item.memberId === memberId)

  async function changeStatus(status) {
    if (!await confirmSimulation('¿Cambiar el estado del socio?', `${member.fullName} pasará a ${memberStatuses[status].toLowerCase()}.`)) return
    const error = execute('member-status', { memberId, status }, 'Estado del socio cambiado de forma simulada.')
    if (error) adminAlert({ icon: 'error', title: 'No se pudo cambiar el estado', text: error })
  }
  async function resetAccess() {
    if (!await confirmSimulation('¿Simular el restablecimiento de acceso?', 'No se generarán contraseñas, correos ni cambios reales de credenciales.')) return
    adminAlert({ icon: 'info', title: 'Restablecimiento simulado', text: 'Vista de demostración. No se generó ni se cambió ninguna contraseña.', confirmButtonText: 'Entendido' })
  }

  return <>
    <Link className="admin-inline-link" to="/admin/socios">← Volver a socios</Link>
    <AdminHeading eyebrow={`FICHA DEL SOCIO · ${member.number}`} title={member.fullName} description="Datos personales y actividad de demostración."><div className="admin-inline-actions"><button className="admin-button admin-button--secondary" onClick={resetAccess}>Restablecer acceso</button><button className="admin-button" onClick={() => setEditing(true)}>Editar datos</button></div></AdminHeading>
    <section className="admin-panel"><div className="admin-profile-top"><button className="admin-photo-zoom" onClick={() => setPhotoOpen(true)} aria-label="Ampliar fotografía del socio"><AdminAvatar member={member} large /><small>Ampliar ↗</small></button><div><h2>{member.fullName}</h2><p className="admin-muted">{member.number} · Desde {formatDate(member.joinedAt)}</p><AdminBadge tone={member.status === 'active' ? '' : 'warning'}>{memberStatuses[member.status]}</AdminBadge></div><label className="admin-field admin-status-control">Cambiar estado<select value={member.status} onChange={(event) => changeStatus(event.target.value)}>{Object.entries(memberStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div>
      <dl className="admin-details-grid">{[['Nombre completo', member.fullName], ['Usuario', member.username], ['Número de socio', member.number], ['Correo', member.email], ['Teléfono', member.phone], ['Dirección', member.address]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </section>
    <section className="admin-section"><AdminConsumption reservations={records} limits={state.config.limits} /><p className="admin-muted">Indicadores calculados a partir de entregas completadas; no se editan manualmente.</p></section>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><h2>Reserva actual</h2></div><ReservationTable reservations={records.filter((item) => item.status === 'confirmed')} onSelect={(item) => setReservationId(item.id)} showMember={false} /></section>
    <section className="admin-panel admin-section"><div className="admin-panel-heading"><h2>Historial de reservas y entregas</h2></div><ReservationTable reservations={records.filter((item) => item.status !== 'confirmed')} onSelect={(item) => setReservationId(item.id)} showMember={false} /></section>
    {editing && <MemberEditor member={member} onClose={() => setEditing(false)} />}
    {photoOpen && <AdminModal title={`Fotografía · ${member.fullName}`} onClose={() => setPhotoOpen(false)}>{member.photo ? <img className="admin-expanded-photo" src={member.photo} alt={`Fotografía de ${member.fullName}`} /> : <div className="admin-avatar-preview"><AdminAvatar member={member} large /><p className="admin-muted">Socio de ejemplo sin fotografía. Podés agregar una desde Editar datos.</p></div>}</AdminModal>}
    {reservationId && <ReservationDialog reservationId={reservationId} onClose={() => setReservationId(null)} />}
  </>
}
