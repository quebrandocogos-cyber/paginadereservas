import { Link } from 'react-router-dom'
import { useMember } from '../components/member/MemberProvider.jsx'
import ConsumptionIndicators from '../components/member/ConsumptionIndicators.jsx'
import { formatDate } from '../utils/reservationRules.js'

export default function MemberProfilePage() {
  const { member } = useMember()
  const details = [
    ['Nombre completo', member.fullName], ['Nombre de usuario', member.username], ['Número de socio', member.number],
    ['Correo electrónico', member.email], ['Teléfono', member.phone], ['Dirección', member.address], ['Fecha de ingreso', formatDate(member.joinedAt)],
  ]
  return (
    <>
      <Link className="member-back" to="/reservas">← Volver al club</Link>
      <header className="member-page-heading"><p className="member-eyebrow">TU ESPACIO PERSONAL</p><h1>Mi perfil</h1><p className="member-muted">Información de un socio ficticio para explorar la interfaz.</p></header>
      <section className="member-panel member-profile">
        <div className="member-profile-heading"><img className="member-avatar" src={member.photo} alt="Fotografía ilustrativa del perfil de demostración" /><div><h2>{member.fullName}</h2><span className="member-badge">Socio {member.number}</span></div></div>
        <dl className="member-profile-details">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>
      <section className="member-section"><div className="member-section-heading"><h2>Mis indicadores de consumo</h2></div><ConsumptionIndicators /></section>
      <section className="member-panel member-password-section">
        <h2>Cambiar contraseña</h2><p className="member-muted">Vista previa. El cambio de credenciales todavía no está habilitado.</p>
        <fieldset disabled><legend className="member-sr-only">Cambio de contraseña no disponible</legend>
          <label className="member-field">Contraseña actual<input type="password" autoComplete="current-password" placeholder="No disponible en esta demostración" /></label>
          <label className="member-field">Nueva contraseña<input type="password" autoComplete="new-password" /></label>
          <label className="member-field">Confirmar nueva contraseña<input type="password" autoComplete="new-password" /></label>
          <button type="button" className="member-button">Guardar contraseña</button>
        </fieldset>
      </section>
    </>
  )
}
