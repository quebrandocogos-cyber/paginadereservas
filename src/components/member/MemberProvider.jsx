import { createContext, useContext, useRef, useState } from 'react'
import { mockConfig, mockMember, mockOccupancy, mockReservations, mockVarieties } from '../../data/memberMock.js'
import { clubClock, consumptionFor, validateReservation } from '../../utils/reservationRules.js'
import ReservationModal from './ReservationModal.jsx'
import { memberAlert, showReservationTicket } from './memberAlerts.js'

const MemberContext = createContext(null)

export function useMember() {
  return useContext(MemberContext)
}

export default function MemberProvider({ children }) {
  const [reservations, setReservations] = useState(mockReservations)
  const [wizard, setWizard] = useState(null)
  const nextNumber = useRef(109)
  const active = reservations.find((item) => item.status === 'confirmed')
  const consumption = consumptionFor(reservations, clubClock().date, mockConfig.limits)
  const varieties = mockVarieties.map((item) => ({
    ...item, stock: item.stock - (active?.varietyId === item.id ? active.grams : 0),
  }))

  function editReservation() {
    if (active) setWizard({ editing: active, varietyId: active.varietyId })
  }

  async function reserve(varietyId) {
    if (active) {
      const result = await memberAlert({
        icon: 'info', title: 'Ya tenés una reserva activa',
        text: 'Podés editar tu reserva actual o cancelarla antes de crear otra.',
        showCancelButton: true, confirmButtonText: 'Editar mi reserva', cancelButtonText: 'Volver',
      })
      if (result.isConfirmed) editReservation()
      return
    }
    setWizard({ editing: null, varietyId })
  }

  function saveReservation(draft) {
    const error = validateReservation(draft, {
      varieties: mockVarieties, reservations, ...mockConfig,
      occupancy: mockOccupancy, editingId: wizard.editing?.id,
    })
    if (error) return error
    const variety = mockVarieties.find((item) => item.id === draft.varietyId)
    const reservation = {
      ...draft, id: wizard.editing?.id ?? `QC-${String(nextNumber.current++).padStart(4, '0')}`,
      varietyName: variety.name, price: variety.price, status: 'confirmed',
    }
    setReservations((previous) => wizard.editing
      ? previous.map((item) => item.id === reservation.id ? reservation : item)
      : [reservation, ...previous])
    setWizard(null)
    showReservationTicket(reservation, wizard.editing ? 'Reserva actualizada' : 'Reserva confirmada')
    return ''
  }

  async function cancelReservation() {
    if (!active) return
    const result = await memberAlert({
      icon: 'warning', title: '¿Cancelar tu reserva?',
      text: `La reserva ${active.id} quedará en tu historial como cancelada.`,
      showCancelButton: true, confirmButtonText: 'Sí, cancelar reserva', cancelButtonText: 'Conservar reserva',
    })
    if (result.isConfirmed) {
      setReservations((previous) => previous.map((item) => item.id === active.id ? { ...item, status: 'cancelled' } : item))
      memberAlert({ icon: 'success', title: 'Reserva cancelada', text: 'Ya podés crear una nueva reserva.', confirmButtonText: 'Entendido' })
    }
  }

  return (
    <MemberContext.Provider value={{ member: mockMember, config: mockConfig, varieties, reservations, active, consumption, reserve, editReservation, cancelReservation }}>
      {children}
      {wizard && (
        <ReservationModal
          key={wizard.editing?.id ?? wizard.varietyId}
          editing={wizard.editing}
          initialVarietyId={wizard.varietyId}
          varieties={mockVarieties}
          reservations={reservations}
          config={mockConfig}
          occupancy={mockOccupancy}
          onClose={() => setWizard(null)}
          onSave={saveReservation}
        />
      )}
    </MemberContext.Provider>
  )
}
