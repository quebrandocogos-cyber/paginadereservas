import { Link } from 'react-router-dom'
import { useAdmin } from './AdminProvider.jsx'
import { AdminBadge, AdminModal, AdminTable } from './AdminUI.jsx'
import { adminAlert, confirmSimulation } from './adminAlerts.js'
import { reservationStatuses } from '../../utils/adminRules.js'
import { formatDate, money } from '../../utils/reservationRules.js'

export function ReservationTable({ reservations, onSelect, showMember = true }) {
  const { state } = useAdmin()
  const columns = [
    { key: 'date', label: 'Fecha / hora', render: (item) => <>{formatDate(item.date)}<small>{item.time} h · {item.id}</small></> },
    ...showMember ? [{ key: 'memberId', label: 'Socio', render: (item) => <Link className="admin-inline-link" to={`/admin/socios/${item.memberId}`}>{state.members.find((member) => member.id === item.memberId)?.fullName || 'Socio no disponible'}</Link> }] : [],
    { key: 'varietyName', label: 'Variedad' }, { key: 'grams', label: 'Cantidad', render: (item) => `${item.grams} g` },
    { key: 'status', label: 'Estado', render: (item) => <AdminBadge tone={item.status === 'cancelled' ? 'muted' : item.status === 'confirmed' ? 'warning' : ''}>{reservationStatuses[item.status]}</AdminBadge> },
    { key: 'actions', label: 'Acciones', render: (item) => <button className="admin-text-button" onClick={() => onSelect(item)}>Ver detalle →</button> },
  ]
  return <AdminTable caption="Reservas y entregas de demostración" columns={columns} rows={reservations} />
}

export function ReservationDialog({ reservationId, onClose }) {
  const { state, execute } = useAdmin()
  const reservation = state.reservations.find((item) => item.id === reservationId)
  const member = state.members.find((item) => item.id === reservation?.memberId)
  if (!reservation) return null
  async function complete() {
    onClose()
    if (!await confirmSimulation('¿Simular la entrega?', `La reserva ${reservation.id} pasará a completada, descontará stock y registrará consumo e ingreso ficticio.`)) return
    const error = execute('complete-delivery', { reservationId }, 'Entrega simulada: consumo, stock e ingreso actualizados una sola vez.')
    if (error) adminAlert({ icon: 'warning', title: 'No se pudo simular la entrega', text: error })
  }
  return <AdminModal title={`Reserva ${reservation.id}`} onClose={onClose}>
    <AdminBadge tone={reservation.status === 'confirmed' ? 'warning' : reservation.status === 'cancelled' ? 'muted' : ''}>{reservationStatuses[reservation.status]}</AdminBadge>
    <dl className="admin-details-grid">
      {[['Socio', member?.fullName], ['Número de socio', member?.number], ['Variedad', reservation.varietyName], ['Cantidad', `${reservation.grams} g`], ['Retiro previsto', `${formatDate(reservation.date)} · ${reservation.time} h`], ['Importe de ejemplo', money(reservation.grams * reservation.price)]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      {reservation.deliveredAt && <div><dt>Entrega realizada</dt><dd>{formatDate(reservation.deliveredAt)}</dd></div>}
    </dl>
    <p className="admin-callout">Una reserva pendiente no representa consumo ni ingreso. Toda operación de esta vista es ficticia y no procesa pagos.</p>
    <div className="admin-form-actions"><Link className="admin-button admin-button--secondary" to={`/admin/socios/${member?.id}`} onClick={onClose}>Ver ficha del socio</Link>{reservation.status === 'confirmed' && <button className="admin-button" onClick={complete}>Simular entrega</button>}</div>
  </AdminModal>
}
