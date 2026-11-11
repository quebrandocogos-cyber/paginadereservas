import { useEffect, useRef } from 'react'
import { consumptionFor, clubClock } from '../../utils/reservationRules.js'

export function AdminIcon({ name }) {
  const paths = {
    dashboard: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
    members: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    stock: 'M12 3 3 8v9l9 5 9-5V8z M3 8l9 5 9-5 M12 13v9 M8 5l9 5',
    balance: 'M3 20h18 M6 16V9 M12 16V4 M18 16v-5',
    settings: 'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8 M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.dashboard} /></svg>
}

export function AdminAvatar({ member, large = false }) {
  const initials = member.initials || member.fullName?.split(' ').map((word) => word[0]).slice(0, 2).join('') || 'QC'
  return member.photo
    ? <img className={`admin-avatar ${large ? 'admin-avatar--large' : ''}`} src={member.photo} alt={`Fotografía de ${member.fullName || member.name}`} />
    : <span className={`admin-avatar ${large ? 'admin-avatar--large' : ''}`} role="img" aria-label={`Avatar de ${member.fullName || member.name}`}>{initials}</span>
}

export function AdminHeading({ eyebrow, title, description, children }) {
  return <div className="admin-page-heading"><div><p className="admin-eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="admin-muted">{description}</p>}</div>{children}</div>
}

export function AdminBadge({ tone = '', children }) {
  return <span className={`admin-badge ${tone ? `admin-badge--${tone}` : ''}`}>{children}</span>
}

export function AdminTable({ columns, rows, caption, empty = 'No hay registros para estos filtros.' }) {
  return <div className="admin-table-scroll"><table className="admin-table"><caption className="admin-sr-only">{caption}</caption><thead><tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}{rows.length === 0 && <tr><td colSpan={columns.length} className="admin-empty">{empty}</td></tr>}</tbody></table></div>
}

export function AdminModal({ title, onClose, children, wide = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    const previous = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => { element.close(); document.body.style.overflow = previous }
  }, [])
  return <dialog className={`admin-app admin-modal ${wide ? 'admin-modal--wide' : ''}`} ref={ref} aria-label={title} onCancel={(event) => { event.preventDefault(); onClose() }}><div className="admin-modal-heading"><h2>{title}</h2><button type="button" className="admin-close" onClick={onClose} aria-label="Cerrar ventana">×</button></div>{children}</dialog>
}

export function AdminConsumption({ reservations, limits, monthlyOnly = false }) {
  const consumption = consumptionFor(reservations, clubClock().date, limits)
  const rings = [
    { title: 'Consumo mensual', value: consumption.monthly, limit: limits.monthly, remaining: consumption.monthlyRemaining },
    ...monthlyOnly ? [] : [{ title: 'Consumo anual', value: consumption.annual, limit: limits.annual, remaining: consumption.annualRemaining }],
  ]
  return <div className="admin-consumption-grid">{rings.map((ring) => <article className="admin-consumption" key={ring.title}><div className="admin-ring" style={{ '--progress': `${Math.min(100, ring.value / ring.limit * 100)}%` }} role="img" aria-label={`${ring.title}: ${ring.value} de ${ring.limit} gramos`}><span><strong>{ring.value}<small> g</small></strong><small>de {ring.limit} g</small></span></div><div><h3>{ring.title}</h3><p><strong>{ring.remaining} g</strong> disponibles</p><small>Solo entregas completadas</small></div></article>)}</div>
}

export function matchesSearch(member, query) {
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  return normalize(`${member.fullName} ${member.username} ${member.number} ${member.phone}`).includes(normalize(query.trim()))
}
