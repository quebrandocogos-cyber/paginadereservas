import { mockConfig, mockVarieties, informationPages } from './memberMock.js'
import { clubClock, shiftDate } from '../utils/reservationRules.js'

const today = clubClock().date
const firstDay = `${today.slice(0, 7)}-01`

export const mockAdministrators = [
  { id: 'admin-1', name: 'Mar Demo', initials: 'MD', role: 'Administrador' },
  { id: 'admin-2', name: 'Sol Demo', initials: 'SD', role: 'Administrador' },
  { id: 'admin-3', name: 'Leo Demo', initials: 'LD', role: 'Administrador' },
]

const members = ['Alex', 'Dani', 'Cris', 'Sam', 'Fran', 'Val'].map((name, index) => ({
  id: `member-${index + 1}`, number: `QC-${String(index + 42).padStart(4, '0')}`,
  fullName: `${name} Demo`, username: `${name.toLowerCase()}.demo`,
  email: `${name.toLowerCase()}@example.com`, phone: `Teléfono de ejemplo ${index + 1}`,
  address: 'Dirección de ejemplo, Montevideo', joinedAt: '2025-03-10',
  status: index === 4 ? 'suspended' : index === 5 ? 'inactive' : 'active', photo: '',
}))

const varieties = mockVarieties.map((item, index) => ({ ...item, stock: index === 0 ? 85 : 18, published: true }))

const reservations = [
  { id: 'ADM-0101', memberId: 'member-1', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 8, price: 180, date: today, time: '11:00', status: 'confirmed' },
  { id: 'ADM-0102', memberId: 'member-2', varietyId: 'noche-violeta', varietyName: 'Noche Violeta', grams: 5, price: 200, date: today, time: '14:00', status: 'confirmed' },
  { id: 'ADM-0103', memberId: 'member-3', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 4, price: 180, date: today, time: '10:00', status: 'completed', deliveredAt: today },
  { id: 'ADM-0090', memberId: 'member-1', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 10, price: 180, date: firstDay, time: '12:00', status: 'completed', deliveredAt: firstDay },
  { id: 'ADM-0080', memberId: 'member-2', varietyId: 'noche-violeta', varietyName: 'Noche Violeta', grams: 12, price: 200, date: shiftDate(firstDay, -5), time: '11:00', status: 'completed', deliveredAt: shiftDate(firstDay, -5) },
  { id: 'ADM-0070', memberId: 'member-1', varietyId: 'verde-lima', varietyName: 'Verde Lima', grams: 5, price: 180, date: shiftDate(firstDay, -8), time: '16:00', status: 'cancelled' },
]

const completed = reservations.filter((item) => item.status === 'completed')
const stockMovements = [
  ...varieties.map((item) => ({
    id: `opening-${item.id}`, varietyId: item.id, date: shiftDate(firstDay, -20), type: 'entry',
    quantity: item.stock + completed.filter((record) => record.varietyId === item.id).reduce((sum, record) => sum + record.grams, 0),
    reason: 'Saldo inicial de demostración', adminId: 'admin-1',
  })),
  ...completed.map((item) => ({ id: `stock-${item.id}`, varietyId: item.varietyId, date: item.deliveredAt, type: 'delivery', quantity: -item.grams, reason: `Entrega ${item.id}`, adminId: 'admin-2', reservationId: item.id })),
]

export const expenseCategories = ['Operación', 'Servicios', 'Mantenimiento', 'Compras de stock', 'Otros']

export function createAdminMock() {
  return structuredClone({
    members, varieties, reservations, stockMovements,
    finances: [
      ...completed.map((item) => ({ id: `income-${item.id}`, type: 'income', date: item.deliveredAt, concept: `Entrega ${item.id}`, category: 'Entregas', amount: item.grams * item.price, notes: 'Ingreso ficticio de una entrega completada.', reservationId: item.id, adminId: 'admin-2' })),
      { id: 'expense-1', type: 'expense', date: firstDay, concept: 'Servicios del espacio · ejemplo', category: 'Servicios', amount: 800, notes: 'Dato ficticio.', adminId: 'admin-1' },
      { id: 'expense-2', type: 'expense', date: shiftDate(firstDay, -5), concept: 'Mantenimiento · ejemplo', category: 'Mantenimiento', amount: 450, notes: 'Dato ficticio.', adminId: 'admin-3' },
    ],
    config: {
      clubName: 'Quebrando Cogos', description: 'Un club. Una comunidad. Información de demostración.',
      email: 'club@example.com', address: 'Dirección del club pendiente de confirmar',
      limits: mockConfig.limits, days: mockConfig.schedule.days, opening: '10:00', closing: '18:00', capacity: 4,
      lowStock: 20, faq: informationPages['preguntas-frecuentes'].sections.map((item) => `${item.title}\n${item.text}`).join('\n\n'),
      statutes: 'Documento de ejemplo. Estatutos oficiales pendientes de incorporación y validación por el club.',
      terms: 'Contenido de ejemplo sin carácter legal. Términos oficiales pendientes de validación.',
      communications: 'Bienvenidos al espacio del club. Esta comunicación es un ejemplo.',
    },
  })
}
