import { money } from '../../utils/reservationRules.js'

export default function VarietyCard({ variety, onReserve }) {
  const available = variety.stock > 0
  return (
    <article className="member-variety-card">
      <div className="member-variety-image">
        <img src={variety.image} alt={`Fotografía ilustrativa de flores de ${variety.name}`} loading="lazy" />
        <span className={`member-badge ${available ? '' : 'member-badge--muted'}`}>{available ? '● Disponible' : 'Sin stock'}</span>
        <small className="member-photo-credit">Foto ilustrativa · {variety.imageCredit}</small>
      </div>
      <div className="member-variety-body">
        <p className="member-eyebrow">{variety.category}</p>
        <h3>{variety.name}</h3>
        <p className="member-description">{variety.description}</p>
        <ul className="member-tags">{variety.characteristics.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="member-variety-bottom">
          <div><strong>{money(variety.price)}<small> / g</small></strong><span>{available ? `${variety.stock} g en stock` : 'Próxima disponibilidad a confirmar'}</span></div>
          <button className="member-button" disabled={!available} onClick={() => onReserve(variety.id)}>Reservar <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </article>
  )
}
