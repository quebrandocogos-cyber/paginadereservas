import { clubClock, consumptionFor } from './reservationRules.js'

export const memberStatuses = { active: 'Activo', suspended: 'Suspendido', inactive: 'Inactivo' }
export const reservationStatuses = { confirmed: 'Pendiente de entrega', completed: 'Entrega completada', cancelled: 'Cancelada' }

function requireValue(condition, message) {
  if (!condition) throw new Error(message)
}

function validDate(date) {
  const parsed = new Date(`${date}T12:00:00Z`)
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date
}

function positiveAmount(value) { return Number.isFinite(value) && value > 0 }

export function nextMemberNumber(members) {
  return `QC-${String(Math.max(0, ...members.map((item) => Number(item.number.replace('QC-', '')) || 0)) + 1).padStart(4, '0')}`
}

export function stockFor(state, varietyId) {
  return state.stockMovements.filter((item) => item.varietyId === varietyId).reduce((sum, item) => sum + item.quantity, 0)
}

export function financialSummary(finances, period) {
  const rows = finances.filter((item) => item.date.startsWith(period))
  const income = rows.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
  const expense = rows.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
  return { income, expense, result: income - expense }
}

// Transiciones puras y atómicas: ninguna acción llama al backend ni guarda datos en disco.
export function applyAdminAction(state, action, clock = clubClock()) {
  const { payload = {}, id, adminId } = action
  switch (action.type) {
    case 'save-member': {
      const editing = state.members.find((item) => item.id === payload.id)
      const fullName = String(payload.fullName ?? '').trim()
      const username = String(payload.username ?? '').trim().toLowerCase()
      const email = String(payload.email ?? '').trim().toLowerCase()
      requireValue(fullName && username && /^\S+@\S+\.\S+$/.test(email), 'Completá nombre, usuario y un correo válido.')
      requireValue(/^[a-z0-9._-]+$/.test(username), 'El usuario solo admite letras sin tildes, números, punto, guion y guion bajo.')
      requireValue(payload.phone?.trim() && payload.address?.trim(), 'Completá teléfono y dirección.')
      requireValue(Object.hasOwn(memberStatuses, payload.status), 'Seleccioná un estado válido.')
      requireValue(!state.members.some((item) => item.id !== editing?.id && (item.username === username || item.email.toLowerCase() === email)), 'El usuario o correo ya está en uso en la demostración.')
      // Lista explícita de campos: nunca se copia una contraseña al estado.
      const member = {
        id: editing?.id ?? id, number: editing?.number ?? nextMemberNumber(state.members),
        joinedAt: editing?.joinedAt ?? clock.date, fullName, username, email,
        phone: payload.phone.trim(), address: payload.address.trim(), status: payload.status, photo: payload.photo || '',
      }
      return { ...state, members: editing ? state.members.map((item) => item.id === member.id ? member : item) : [...state.members, member] }
    }
    case 'member-status': {
      requireValue(state.members.some((item) => item.id === payload.memberId), 'No se encontró el socio.')
      requireValue(Object.hasOwn(memberStatuses, payload.status), 'El estado no es válido.')
      return { ...state, members: state.members.map((item) => item.id === payload.memberId ? { ...item, status: payload.status } : item) }
    }
    case 'save-variety': {
      const editing = state.varieties.find((item) => item.id === payload.id)
      requireValue(payload.name?.trim() && payload.description?.trim(), 'Completá nombre y descripción.')
      requireValue(positiveAmount(payload.price), 'Ingresá un precio mayor a cero.')
      requireValue(!state.varieties.some((item) => item.id !== editing?.id && item.name.toLowerCase() === payload.name.trim().toLowerCase()), 'Ya existe una variedad con ese nombre.')
      const variety = {
        id: editing?.id ?? id, name: payload.name.trim(), description: payload.description.trim(),
        characteristics: payload.characteristics.map((item) => item.trim()).filter(Boolean),
        price: payload.price, image: payload.image || '', published: Boolean(payload.published),
      }
      return { ...state, varieties: editing ? state.varieties.map((item) => item.id === editing.id ? variety : item) : [...state.varieties, variety] }
    }
    case 'toggle-variety':
      return { ...state, varieties: state.varieties.map((item) => item.id === payload.varietyId ? { ...item, published: !item.published } : item) }
    case 'stock-movement': {
      requireValue(state.varieties.some((item) => item.id === payload.varietyId), 'Elegí una variedad existente.')
      requireValue(['entry', 'adjustment', 'purchase'].includes(payload.type), 'El tipo de movimiento no es válido.')
      requireValue(Number.isFinite(payload.quantity) && payload.quantity !== 0, 'Ingresá una cantidad diferente de cero.')
      requireValue(payload.type === 'adjustment' || payload.quantity > 0, 'Las entradas y compras deben ser positivas.')
      requireValue(stockFor(state, payload.varietyId) + payload.quantity >= 0, 'El movimiento dejaría el stock por debajo de cero.')
      requireValue(payload.reason?.trim(), 'Indicá el motivo del movimiento.')
      requireValue(validDate(payload.date) && payload.date <= clock.date, 'Ingresá una fecha válida, sin fechas futuras.')
      if (payload.type === 'purchase') requireValue(positiveAmount(payload.cost), 'Ingresá el importe total de la compra.')
      const movement = { id, varietyId: payload.varietyId, date: payload.date, type: payload.type, quantity: payload.quantity, reason: payload.reason.trim(), adminId }
      const finance = { id: `cost-${id}`, type: 'expense', date: payload.date, concept: payload.reason.trim(), category: 'Compras de stock', amount: payload.cost, notes: 'Compra ficticia asociada a un único movimiento de inventario.', stockMovementId: id, adminId }
      return { ...state, stockMovements: [...state.stockMovements, movement], finances: payload.type === 'purchase' ? [...state.finances, finance] : state.finances }
    }
    case 'complete-delivery': {
      const reservation = state.reservations.find((item) => item.id === payload.reservationId)
      requireValue(reservation?.status === 'confirmed', 'Esta reserva ya no está pendiente de entrega.')
      requireValue(reservation.date <= clock.date, 'No se puede entregar una reserva de una fecha futura.')
      const member = state.members.find((item) => item.id === reservation.memberId)
      requireValue(member?.status === 'active', 'El socio debe estar activo para simular una entrega.')
      requireValue(stockFor(state, reservation.varietyId) >= reservation.grams, 'No hay stock suficiente para la entrega.')
      const consumption = consumptionFor(state.reservations.filter((item) => item.memberId === member.id), clock.date, state.config.limits)
      requireValue(reservation.grams <= consumption.available, 'La entrega superaría el límite de consumo del socio.')
      const movement = { id: `stock-${reservation.id}`, varietyId: reservation.varietyId, date: clock.date, type: 'delivery', quantity: -reservation.grams, reason: `Entrega ${reservation.id}`, adminId, reservationId: reservation.id }
      const income = { id: `income-${reservation.id}`, type: 'income', date: clock.date, concept: `Entrega ${reservation.id}`, category: 'Entregas', amount: reservation.grams * reservation.price, notes: 'Ingreso simulado; no se procesó un pago.', adminId, reservationId: reservation.id }
      return {
        ...state,
        reservations: state.reservations.map((item) => item.id === reservation.id ? { ...item, status: 'completed', deliveredAt: clock.date } : item),
        stockMovements: [...state.stockMovements, movement], finances: [...state.finances, income],
      }
    }
    case 'expense': {
      requireValue(validDate(payload.date) && payload.date <= clock.date, 'Elegí una fecha válida, sin fechas futuras.')
      requireValue(payload.concept?.trim() && payload.category, 'Completá concepto y categoría.')
      requireValue(payload.category !== 'Compras de stock', 'Registrá las compras desde Stock para vincular inventario y gasto una sola vez.')
      requireValue(positiveAmount(payload.amount), 'Ingresá un importe mayor a cero.')
      return { ...state, finances: [...state.finances, { id, type: 'expense', date: payload.date, concept: payload.concept.trim(), category: payload.category, amount: payload.amount, notes: payload.notes?.trim() || '', adminId }] }
    }
    case 'settings': {
      requireValue(payload.clubName?.trim(), 'Ingresá el nombre del club.')
      requireValue(payload.days.length > 0 && payload.days.every((day) => Number.isInteger(day) && day >= 0 && day <= 6), 'Seleccioná al menos un día de atención.')
      requireValue(/^\d{2}:00$/.test(payload.opening) && /^\d{2}:00$/.test(payload.closing) && payload.opening < payload.closing && payload.closing <= '23:00', 'El cierre debe ser posterior a la apertura, en horas enteras.')
      requireValue(Number.isInteger(payload.capacity) && payload.capacity > 0, 'Los cupos deben ser un entero positivo.')
      requireValue(positiveAmount(payload.limits.monthly) && positiveAmount(payload.limits.annual) && payload.limits.annual >= payload.limits.monthly, 'Revisá los límites: deben ser positivos y el anual no puede ser menor al mensual.')
      requireValue(Number.isFinite(payload.lowStock) && payload.lowStock >= 0, 'El umbral de stock no puede ser negativo.')
      return { ...state, config: { ...payload } }
    }
    default: throw new Error('Acción de demostración no reconocida.')
  }
}
