import { formatDate, money } from '../../utils/reservationRules.js'

export default function ReservationDetails({ reservation }) {
  return (
    <dl className="member-reservation-details">
      <div><dt>Variedad</dt><dd>{reservation.varietyName}</dd></div>
      <div><dt>Cantidad</dt><dd>{reservation.grams} g</dd></div>
      <div><dt>Fecha de retiro</dt><dd>{formatDate(reservation.date)}</dd></div>
      <div><dt>Horario</dt><dd>{reservation.time} h</dd></div>
      <div><dt>Importe estimado</dt><dd>{money(reservation.grams * reservation.price)}</dd></div>
    </dl>
  )
}
