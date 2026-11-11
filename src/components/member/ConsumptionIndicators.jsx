import { useMember } from './MemberProvider.jsx'

function ConsumptionRing({ title, consumed, limit, remaining, period }) {
  const percentage = Math.min(100, Math.max(0, consumed / limit * 100))
  return (
    <article className="member-consumption">
      <div className="member-ring" style={{ '--progress': `${percentage}%` }} role="img" aria-label={`${title}: ${consumed} de ${limit} gramos, ${remaining} disponibles`}>
        <span><strong>{consumed}<small> g</small></strong><small>de {limit} g</small></span>
      </div>
      <div><p className="member-eyebrow">{period}</p><h3>{title}</h3><p><strong>{remaining} g</strong> disponibles</p></div>
    </article>
  )
}

export default function ConsumptionIndicators() {
  const { consumption, config } = useMember()
  const date = new Date()
  return (
    <div className="member-consumption-grid">
      <ConsumptionRing title="Consumo mensual" consumed={consumption.monthly} limit={config.limits.monthly} remaining={consumption.monthlyRemaining} period={date.toLocaleDateString('es-UY', { month: 'long', timeZone: 'America/Montevideo' })} />
      <ConsumptionRing title="Consumo anual" consumed={consumption.annual} limit={config.limits.annual} remaining={consumption.annualRemaining} period={date.toLocaleDateString('es-UY', { year: 'numeric', timeZone: 'America/Montevideo' })} />
    </div>
  )
}
