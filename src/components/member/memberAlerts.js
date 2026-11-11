import Swal from 'sweetalert2'
import { formatDate, money } from '../../utils/reservationRules.js'

export function memberAlert(options) {
  return Swal.fire({
    background: '#121c18', color: '#eef5f1', confirmButtonColor: '#29dba0',
    cancelButtonColor: '#34473e', customClass: { popup: 'member-alert' }, ...options,
  })
}

export function showReservationTicket(reservation, title = 'Reserva confirmada') {
  const ticket = document.createElement('div')
  ticket.className = 'member-ticket'
  const rows = [
    ['Número de reserva', reservation.id], ['Variedad', reservation.varietyName],
    ['Cantidad', `${reservation.grams} g`], ['Importe estimado', money(reservation.price * reservation.grams)],
    ['Fecha de retiro', formatDate(reservation.date)], ['Horario', `${reservation.time} h`],
  ]
  rows.forEach(([label, value]) => {
    const row = document.createElement('p')
    const name = document.createElement('span')
    const content = document.createElement('strong')
    name.textContent = label
    content.textContent = value
    row.append(name, content)
    ticket.append(row)
  })
  const note = document.createElement('small')
  note.textContent = 'Ticket de demostración · No acredita una entrega ni un pago.'
  ticket.append(note)
  return memberAlert({ title, html: ticket, confirmButtonText: 'Entendido' })
}
