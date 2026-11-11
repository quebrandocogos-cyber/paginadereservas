export const CLUB_TIME_ZONE = 'America/Montevideo'

export function clubClock(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: CLUB_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now).map(({ type, value }) => [type, value]))
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` }
}

export function shiftDate(date, days) {
  const value = new Date(`${date}T12:00:00Z`)
  value.setUTCDate(value.getUTCDate() + days)
  return value.toISOString().slice(0, 10)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('es-UY', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T12:00:00Z`))
}

export function money(value) {
  return new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(value)
}

export function consumptionFor(reservations, date, limits) {
  const completed = reservations.filter((item) => item.status === 'completed' && item.deliveredAt <= date)
  const sum = (prefix) => completed.filter((item) => item.deliveredAt.startsWith(prefix))
    .reduce((total, item) => total + item.grams, 0)
  const monthly = sum(date.slice(0, 7))
  const annual = sum(date.slice(0, 4))
  return {
    monthly, annual,
    monthlyRemaining: Math.max(0, limits.monthly - monthly),
    annualRemaining: Math.max(0, limits.annual - annual),
    available: Math.max(0, Math.min(limits.monthly - monthly, limits.annual - annual)),
  }
}

export function availableSlots(date, schedule, occupancy, clock = clubClock()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < clock.date) return []
  const parsed = new Date(`${date}T12:00:00Z`)
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return []
  const day = parsed.getUTCDay()
  if (!schedule.days.includes(day)) return []
  return schedule.hours.map((time) => ({
    time,
    remaining: Math.max(0, schedule.capacity - (occupancy[date]?.[time] ?? 0)),
    past: date === clock.date && time <= clock.time,
  }))
}

export function validateReservation(draft, { varieties, reservations, limits, schedule, occupancy, editingId, clock = clubClock() }) {
  if (reservations.some((item) => item.status === 'confirmed' && item.id !== editingId)) {
    return 'Ya tenés una reserva activa. Podés editarla desde Mi reserva actual.'
  }
  const variety = varieties.find((item) => item.id === draft.varietyId)
  if (!variety || variety.stock <= 0) return 'Elegí una variedad con stock.'
  if (!Number.isInteger(draft.grams) || draft.grams <= 0) return 'Ingresá una cantidad entera mayor a cero.'
  if (draft.grams > variety.stock) return 'La cantidad supera el stock disponible.'
  const todayBalance = consumptionFor(reservations, clock.date, limits)
  const pickupBalance = consumptionFor(reservations, draft.date || clock.date, limits)
  if (draft.grams > Math.min(todayBalance.available, pickupBalance.available)) {
    return 'La cantidad supera tu saldo mensual o anual disponible.'
  }
  const slot = availableSlots(draft.date, schedule, occupancy, clock).find((item) => item.time === draft.time)
  if (!slot || slot.past || slot.remaining <= 0) return 'Elegí una fecha y un turno con disponibilidad.'
  return ''
}
