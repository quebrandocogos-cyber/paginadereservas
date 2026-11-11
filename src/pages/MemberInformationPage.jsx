import { Link, useParams } from 'react-router-dom'
import { informationPages } from '../data/memberMock.js'

export default function MemberInformationPage() {
  const { slug } = useParams()
  const page = Object.hasOwn(informationPages, slug) ? informationPages[slug] : null
  return (
    <>
      <Link className="member-back" to="/reservas">← Volver al club</Link>
      <header className="member-page-heading"><p className="member-eyebrow">INFORMACIÓN DEL CLUB</p><h1>{page?.title ?? 'Contenido no disponible'}</h1><p className="member-callout">{page?.intro ?? 'No encontramos esta sección.'}</p></header>
      {page?.sections.map((section) => <section className="member-panel member-document" key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    </>
  )
}
