import { useEffect, useState } from 'react'
import { useMember } from '../components/member/MemberProvider.jsx'
import VarietyCard from '../components/member/VarietyCard.jsx'
import ConsumptionIndicators from '../components/member/ConsumptionIndicators.jsx'
import MemberReservations from '../components/member/MemberReservations.jsx'
import { listInformationCards } from '../services/informationCardsService.js'

function ReservasPage() {
  const { member, varieties, reserve } = useMember()
  const [cards, setCards] = useState([])
  const [cardsLoading, setCardsLoading] = useState(true)
  const [cardsError, setCardsError] = useState('')
  const [cardsRevision, setCardsRevision] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setCardsLoading(true)
    setCardsError('')
    listInformationCards({ activeOnly: true, signal: controller.signal }).then((rows) => {
      if (!controller.signal.aborted) setCards(rows)
    }).catch((error) => {
      if (!controller.signal.aborted) setCardsError(error.message)
    }).finally(() => {
      if (!controller.signal.aborted) setCardsLoading(false)
    })
    return () => controller.abort()
  }, [cardsRevision])
  return (
    <>
      <section className="member-welcome">
        <div><p className="member-eyebrow">TU CLUB, MÁS CERCA</p><h1>Bienvenido a tu espacio<span>.</span></h1><p>Hola, {member.firstName}. Descubrí nuestras variedades y prepará tu próxima visita.</p></div>
        <span className="member-member-number">SOCIO <strong>{member.number}</strong></span>
      </section>
      <section id="variedades" className="member-section">
        <div className="member-section-heading"><div><p className="member-eyebrow">CULTIVADAS CON DEDICACIÓN</p><h2>Nuestras variedades</h2></div><span className="member-muted">Selección del club · Datos de ejemplo</span></div>
        <div className="member-variety-grid">{varieties.map((variety) => <VarietyCard key={variety.id} variety={variety} onReserve={reserve} />)}</div>
      </section>
      <section className="member-section">
        <div className="member-section-heading"><div><p className="member-eyebrow">CONECTADOS CON EL CLUB</p><h2>Información del club</h2></div></div>
        {cardsLoading && <p role="status">Cargando información del club…</p>}
        {cardsError && <div><p className="member-error" role="alert">{cardsError}</p><button type="button" className="member-button member-button--secondary" disabled={cardsLoading} onClick={() => setCardsRevision((value) => value + 1)}>Reintentar</button></div>}
        {!cardsLoading && !cardsError && <div className="member-information-grid">{cards.map((item, index) => <article className="member-info-card" key={item.id}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>}
        {!cardsLoading && !cardsError && cards.length === 0 && <p className="member-muted">No hay tarjetas informativas publicadas.</p>}
      </section>
      <section className="member-section" aria-labelledby="consumption-heading">
        <div className="member-section-heading"><div><p className="member-eyebrow">TUS ENTREGAS, EN PERSPECTIVA</p><h2 id="consumption-heading">Mi consumo</h2></div><span className="member-muted">Solo entregas completadas</span></div>
        <ConsumptionIndicators />
      </section>
      <MemberReservations />
    </>
  )
}

export default ReservasPage
