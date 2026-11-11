import test from 'node:test'
import assert from 'node:assert/strict'
import { availableSlots, clubClock, consumptionFor, validateReservation } from '../src/utils/reservationRules.js'

const limits = { monthly: 40, annual: 480 }
const schedule = { days: [1, 2, 3, 4, 5, 6], hours: ['10:00', '11:00', '17:00'], capacity: 4 }
const clock = { date: '2026-11-10', time: '10:30' }
const varieties = [{ id: 'available', stock: 50 }, { id: 'empty', stock: 0 }]
const occupancy = { '2026-11-11': { '10:00': 4, '11:00': 3 } }
const reservations = [
  { id: 'one', status: 'completed', grams: 8, deliveredAt: '2026-11-02' },
  { id: 'two', status: 'completed', grams: 10, deliveredAt: '2026-10-10' },
  { id: 'three', status: 'completed', grams: 15, deliveredAt: '2025-12-01' },
  { id: 'four', status: 'cancelled', grams: 20 },
]
const draft = { varietyId: 'available', grams: 5, date: '2026-11-11', time: '11:00' }
const options = { varieties, reservations, limits, schedule, occupancy, clock }

test('el reloj usa la fecha y hora de Uruguay al cruzar medianoche UTC', () => {
  assert.deepEqual(clubClock(new Date('2026-11-11T01:00:00Z')), { date: '2026-11-10', time: '22:00' })
})

test('solo las entregas completadas suman consumo en su mes y año', () => {
  const withPending = [...reservations, { status: 'confirmed', grams: 30 }]
  assert.deepEqual(consumptionFor(withPending, clock.date, limits), {
    monthly: 8, annual: 18, monthlyRemaining: 32, annualRemaining: 462, available: 32,
  })
})

test('no acepta fechas pasadas, domingos ni fechas inexistentes', () => {
  for (const date of ['2026-11-09', '2026-11-15', '2026-11-31', 'invalid']) {
    assert.deepEqual(availableSlots(date, schedule, occupancy, clock), [])
  }
})

test('los turnos diferencian cupos llenos y horas finalizadas', () => {
  const tomorrow = availableSlots('2026-11-11', schedule, occupancy, clock)
  assert.equal(tomorrow[0].remaining, 0)
  assert.equal(tomorrow[1].remaining, 1)
  assert.equal(availableSlots(clock.date, schedule, occupancy, clock)[0].past, true)
})

test('permite una reserva con stock, saldo y un turno disponible', () => {
  assert.equal(validateReservation(draft, options), '')
})

test('rechaza cantidades inválidas, falta de stock y exceso de saldo', () => {
  for (const grams of [0, -1, 1.5, NaN, '', 33, 51]) {
    assert.notEqual(validateReservation({ ...draft, grams }, options), '')
  }
  assert.notEqual(validateReservation({ ...draft, varietyId: 'empty' }, options), '')
  assert.notEqual(validateReservation({ ...draft, varietyId: 'unknown' }, options), '')
})

test('rechaza un segundo turno activo, pero permite editar el mismo identificador', () => {
  const withActive = { ...options, reservations: [...reservations, { id: 'active', status: 'confirmed', grams: 5 }] }
  assert.notEqual(validateReservation(draft, withActive), '')
  assert.equal(validateReservation(draft, { ...withActive, editingId: 'active' }), '')
  const cancelled = { ...options, reservations: [...reservations, { id: 'active', status: 'cancelled', grams: 5 }] }
  assert.equal(validateReservation(draft, cancelled), '')
})

test('rechaza turnos completos, finalizados, domingos y horas fuera de atención', () => {
  for (const change of [
    { time: '10:00' }, { time: '18:00' }, { date: '2026-11-15' },
    { date: '2026-11-09' }, { date: clock.date, time: '10:00' },
  ]) {
    assert.notEqual(validateReservation({ ...draft, ...change }, options), '')
  }
})

test('respeta también el límite anual y nunca muestra saldos negativos', () => {
  const annualRecords = [{ status: 'completed', grams: 478, deliveredAt: '2026-01-10' }]
  assert.notEqual(validateReservation(draft, { ...options, reservations: annualRecords }), '')
  const exceeded = consumptionFor([{ status: 'completed', grams: 500, deliveredAt: '2026-11-01' }], clock.date, limits)
  assert.equal(exceeded.available, 0)
  assert.equal(exceeded.monthlyRemaining, 0)
  assert.equal(exceeded.annualRemaining, 0)
})
