import { useEffect, useRef, useState } from 'react'
import { availableSlots, clubClock, consumptionFor, money, validateReservation } from '../../utils/reservationRules.js'
import ReservationDetails from './ReservationDetails.jsx'

const steps = ['Variedad', 'Cantidad', 'Fecha y horario', 'Confirmación']

export default function ReservationModal({ editing, initialVarietyId, varieties, reservations, config, occupancy, onClose, onSave }) {
  const dialog = useRef(null)
  const heading = useRef(null)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [draft, setDraft] = useState({
    varietyId: editing?.varietyId ?? initialVarietyId,
    grams: editing?.grams ?? 1, date: editing?.date ?? '', time: editing?.time ?? '',
  })
  const variety = varieties.find((item) => item.id === draft.varietyId)
  const clock = clubClock()
  const balance = consumptionFor(reservations, clock.date, config.limits)
  const pickupBalance = consumptionFor(reservations, draft.date || clock.date, config.limits)
  const available = Math.min(balance.available, pickupBalance.available)
  const maximum = Math.min(available, variety?.stock ?? 0)
  const slots = availableSlots(draft.date, config.schedule, occupancy, clock)

  useEffect(() => {
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => { heading.current?.focus() }, [step])

  function update(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value, ...(field === 'date' ? { time: '' } : {}) }))
    setError('')
  }

  function validateStep() {
    if (!variety || variety.stock <= 0) return 'Elegí una variedad con stock.'
    if (step >= 1 && (!Number.isInteger(draft.grams) || draft.grams < 1 || draft.grams > maximum)) {
      return `Elegí una cantidad entera entre 1 y ${maximum} g. Si tu saldo es cero, no podés reservar.`
    }
    if (step >= 2) return validateReservation(draft, {
      varieties, reservations, ...config, occupancy, editingId: editing?.id, clock: clubClock(),
    })
    return ''
  }

  function handleSubmit(event) {
    event.preventDefault()
    const message = validateStep()
    if (message) { setError(message); return }
    if (step < 3) { setStep(step + 1); return }
    dialog.current.close()
    const saveError = onSave(draft)
    if (saveError) { dialog.current.showModal(); setError(saveError) }
  }

  return (
    <dialog ref={dialog} className="member-modal member-app" aria-labelledby="reservation-title" onCancel={(event) => { event.preventDefault(); onClose() }}>
      <div className="member-modal-heading">
        <div><p className="member-eyebrow">{editing ? `EDITAR ${editing.id}` : 'TU PRÓXIMA VISITA'}</p><h2 id="reservation-title">{editing ? 'Editar reserva' : 'Nueva reserva'}</h2></div>
        <button type="button" className="member-close" onClick={onClose} aria-label="Cerrar ventana de reserva">×</button>
      </div>
      <ol className="member-steps" aria-label="Pasos de la reserva">{steps.map((label, index) => (
        <li key={label} className={index <= step ? 'is-current' : ''} aria-current={step === index ? 'step' : undefined}><span>{index + 1}</span><small>{label}</small></li>
      ))}</ol>
      <form onSubmit={handleSubmit} noValidate>
        <h3 ref={heading} tabIndex={-1} className="member-step-title">{steps[step]}</h3>
        {step === 0 && (
          <div className="member-step-content">
            <p className="member-muted">Elegí la variedad que querés reservar.</p>
            <label className="member-field">Variedad
              <select value={draft.varietyId} onChange={(event) => update('varietyId', event.target.value)}>
                {varieties.map((item) => <option key={item.id} value={item.id} disabled={item.stock <= 0}>{item.name}{item.stock <= 0 ? ' · Sin stock' : ''}</option>)}
              </select>
            </label>
            {variety && <div className="member-choice"><img src={variety.image} alt="" /><div><h4>{variety.name}</h4><p>{variety.description}</p><strong>{money(variety.price)} / g</strong></div></div>}
          </div>
        )}
        {step === 1 && (
          <div className="member-step-content">
            <label className="member-field">Cantidad en gramos
              <input type="number" min="1" max={maximum} step="1" inputMode="numeric" value={draft.grams} onChange={(event) => update('grams', event.target.value === '' ? '' : Number(event.target.value))} aria-describedby="quantity-balance reservation-error" />
            </label>
            <div className="member-quantity-info" id="quantity-balance">
              <p>Saldo disponible del socio <strong>{available} g</strong></p>
              <p>Stock de {variety.name} <strong>{variety.stock} g</strong></p>
              <p>Precio por gramo <strong>{money(variety.price)}</strong></p>
              <p>Cantidad solicitada <strong>{draft.grams || 0} g</strong></p>
              <p className="member-total">Total estimado <strong>{money((Number(draft.grams) || 0) * variety.price)}</strong></p>
            </div>
            <p className="member-muted">El saldo se calcula con las entregas completadas. La reserva no registra consumo ni procesa pagos.</p>
          </div>
        )}
        {step === 2 && (
          <div className="member-step-content">
            <p className="member-muted">{config.hoursLabel}. Turnos de una hora, hasta {config.schedule.capacity} socios por turno. Hora de Uruguay.</p>
            <label className="member-field">Fecha de retiro
              <input type="date" min={clock.date} value={draft.date} onChange={(event) => update('date', event.target.value)} aria-describedby="reservation-error" />
            </label>
            <fieldset className="member-slot-fieldset"><legend>Horarios disponibles</legend>
              {draft.date && slots.length === 0 && <p className="member-muted">No hay turnos para esta fecha. Elegí un día de lunes a sábado, sin fechas pasadas.</p>}
              {!draft.date && <p className="member-muted">Elegí una fecha para ver los turnos.</p>}
              <div className="member-slots">{slots.map((slot) => (
                <label key={slot.time} className={`member-slot ${slot.past || !slot.remaining ? 'is-disabled' : ''}`}>
                  <input type="radio" name="pickup-time" value={slot.time} checked={draft.time === slot.time} disabled={slot.past || !slot.remaining} onChange={() => update('time', slot.time)} />
                  <span><strong>{slot.time}</strong><small>{slot.past ? 'Finalizado' : slot.remaining ? `${slot.remaining} cupos` : 'Completo'}</small></span>
                </label>
              ))}</div>
            </fieldset>
          </div>
        )}
        {step === 3 && (
          <div className="member-step-content">
            <p className="member-muted">Revisá los datos de tu retiro antes de {editing ? 'guardar los cambios' : 'confirmar'}.</p>
            <ReservationDetails reservation={{ ...draft, varietyName: variety.name, price: variety.price }} />
            <p className="member-callout">Reserva ficticia. El importe es estimado y no se realiza ningún pago.</p>
          </div>
        )}
        <p id="reservation-error" className="member-error" role="alert">{error}</p>
        <div className="member-modal-actions">
          <button type="button" className="member-button member-button--secondary" onClick={() => { if (step === 0) onClose(); else { setStep(step - 1); setError('') } }}>{step === 0 ? 'Cancelar' : 'Anterior'}</button>
          <button type="submit" className="member-button">{step < 3 ? 'Continuar →' : editing ? 'Guardar cambios' : 'Confirmar reserva'}</button>
        </div>
      </form>
    </dialog>
  )
}
