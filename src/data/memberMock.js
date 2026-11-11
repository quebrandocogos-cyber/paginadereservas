import { clubClock, shiftDate } from '../utils/reservationRules.js'

const today = clubClock().date
const monthStart = `${today.slice(0, 7)}-01`

// Todo este archivo contiene ejemplos. No representa datos reales del club.
export const mockMember = {
  firstName: 'Alex', fullName: 'Alex Demo', username: 'alex.demo', number: 'QC-0042',
  email: 'alex@example.com', phone: 'Teléfono de ejemplo', address: 'Dirección de ejemplo, Montevideo',
  joinedAt: '2025-03-10',
  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80',
}

export const mockConfig = {
  limits: { monthly: 40, annual: 480 },
  schedule: {
    days: [1, 2, 3, 4, 5, 6], capacity: 4,
    hours: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  },
  hoursLabel: 'Lunes a sábado · 10:00 a 18:00',
}

export const mockVarieties = [
  {
    id: 'verde-lima', name: 'Verde Lima', category: 'Selección del club · 01',
    description: 'Notas cítricas y un perfil herbal fresco. Una selección de flores cultivadas con cuidado, de principio a fin.',
    characteristics: ['Híbrida', 'Aroma cítrico', 'Cultivo interior'], price: 180, stock: 85,
    image: 'https://images.pexels.com/photos/3047447/pexels-photo-3047447.jpeg?auto=compress&cs=tinysrgb&w=1000',
    imageCredit: 'Yash Lucid / Pexels',
  },
  {
    id: 'noche-violeta', name: 'Noche Violeta', category: 'Selección del club · 02',
    description: 'Flores compactas de matices profundos, con notas terrosas y un delicado aroma dulce.',
    characteristics: ['Híbrida', 'Aroma terroso', 'Cultivo interior'], price: 200, stock: 0,
    image: 'https://images.pexels.com/photos/19826140/pexels-photo-19826140.jpeg?auto=compress&cs=tinysrgb&w=1000',
    imageCredit: 'Terrance Barksdale / Pexels',
  },
]

// Ocupación de otros socios: permite probar turnos completos y cupos parciales.
export const mockOccupancy = Object.fromEntries(Array.from({ length: 90 }, (_, index) => [
  shiftDate(today, index), { '10:00': 4, '11:00': 2, '12:00': 1, '15:00': 3 },
]))

export const mockReservations = [
  { id: 'QC-0108', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 8, price: 180, date: monthStart, time: '11:00', status: 'completed', deliveredAt: monthStart },
  { id: 'QC-0092', varietyId: 'noche-violeta', varietyName: 'Noche Violeta', grams: 10, price: 200, date: shiftDate(monthStart, -8), time: '14:00', status: 'completed', deliveredAt: shiftDate(monthStart, -8) },
  { id: 'QC-0084', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 5, price: 180, date: shiftDate(monthStart, -16), time: '12:00', status: 'cancelled' },
]

export const clubInformation = [
  { number: '01', title: 'Nos encontramos en el club', text: mockConfig.hoursLabel },
  { number: '02', title: 'Un turno, una reserva', text: 'Elegí tu variedad, los gramos y un horario de retiro. Podés mantener una reserva activa y editarla antes de retirar.' },
  { number: '03', title: 'Tu retiro, sin vueltas', text: 'Acercate en el horario elegido con tu identificación y el número de reserva. El importe es estimado; esta aplicación no procesa pagos.' },
  { number: '04', title: 'Novedades de la comunidad', text: 'Este espacio reunirá las comunicaciones del club. Por ahora, todo el contenido mostrado es de demostración.' },
]

export const informationPages = {
  'preguntas-frecuentes': {
    title: 'Preguntas frecuentes', intro: 'Contenido de ejemplo para explorar la interfaz. Pendiente de validación por el club.',
    sections: [
      { title: '¿Cómo reservo?', text: 'Desde Nuestras variedades, elegí Reservar y completá los cuatro pasos. En esta demostración, las reservas duran solo durante la sesión de la página.' },
      { title: '¿Puedo modificar mi reserva?', text: 'Sí. Usá Editar reserva en Mi reserva actual. También podés cancelarla y luego crear otra.' },
      { title: '¿Cuándo se registra el consumo?', text: 'Solo cuando una entrega está completada. Una reserva confirmada o cancelada no suma consumo.' },
      { title: '¿Se puede pagar desde la aplicación?', text: 'No. Los importes se muestran como estimaciones y no se procesan pagos.' },
    ],
  },
  estatutos: {
    title: 'Estatutos del club', intro: 'Documento oficial pendiente de incorporación.',
    sections: [{ title: 'Espacio reservado', text: 'Esta vista es un ejemplo visual. No contiene estatutos aprobados ni establece obligaciones. El club incorporará aquí su documentación oficial.' }],
  },
  terminos: {
    title: 'Términos y condiciones', intro: 'Contenido de demostración, sin carácter legal definitivo.',
    sections: [{ title: 'Documento pendiente', text: 'Los términos oficiales deberán ser proporcionados y validados por el club antes de publicar esta aplicación. Esta pantalla no constituye un acuerdo legal.' }],
  },
}
