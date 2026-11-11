import { useMember } from './MemberProvider.jsx'
import { formatDate, money } from '../../utils/reservationRules.js'
import ReservationDetails from './ReservationDetails.jsx'
import { showReservationTicket } from './memberAlerts.js'

export default function MemberReservations() {
  const { active, reservations, editReservation, cancelReservation } = useMember()
  const history = reservations.filter((item) => item.status !== 'confirmed')
  return (
    <section id="mis-reservas" className="member-section">
      <div className="member-section-heading"><div><p className="member-eyebrow">A TU MEDIDA</p><h2>Mis reservas</h2></div><span className="member-muted">Todo en un mismo lugar.</span></div>
      <article className="member-panel member-current-reservation">
        <div className="member-panel-heading"><h3>Mi reserva actual</h3>{active && <span className="member-badge">Confirmada · {active.id}</span>}</div>
        {active ? <>
          <ReservationDetails reservation={active} />
          <p className="member-muted">Retiro pendiente. Una reserva confirmada no equivale a una entrega realizada.</p>
          <div className="member-actions">
            <button className="member-button" onClick={() => showReservationTicket(active)}>Ver ticket</button>
            <button className="member-button member-button--secondary" onClick={editReservation}>Editar reserva</button>
            <button className="member-button member-button--danger" onClick={cancelReservation}>Cancelar reserva</button>
          </div>
        </> : <div className="member-empty"><span aria-hidden="true">↗</span><div><h4>Tu próxima visita empieza acá</h4><p>No tenés una reserva activa. Elegí una variedad del catálogo para coordinar tu retiro.</p><a href="#variedades">Explorar variedades →</a></div></div>}
      </article>
      <article className="member-panel member-history">
        <div className="member-panel-heading"><h3>Historial</h3><span className="member-muted">{history.length} registros</span></div>
        <div className="member-table-wrap"><table>
          <caption className="member-sr-only">Reservas anteriores del socio</caption>
          <thead><tr><th>Fecha</th><th>Variedad</th><th>Cantidad</th><th>Importe estimado</th><th>Estado</th></tr></thead>
          <tbody>{history.map((item) => <tr key={item.id}>
            <td>{formatDate(item.date)}<small>{item.id}</small></td><td>{item.varietyName}</td><td>{item.grams} g</td><td>{money(item.grams * item.price)}</td>
            <td><span className={`member-badge ${item.status === 'cancelled' ? 'member-badge--cancelled' : ''}`}>{item.status === 'completed' ? 'Entrega completada' : 'Cancelada'}</span></td>
          </tr>)}</tbody>
        </table></div>
        <p className="member-muted">Solo las entregas completadas se incluyen en tus indicadores de consumo.</p>
      </article>
    </section>
  )
}
