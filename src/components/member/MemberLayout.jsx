import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import MemberProvider, { useMember } from './MemberProvider.jsx'
import '../../Style/Member.css'

function MemberShell() {
  const { signOut, loading, error } = useAuth()
  const navigate = useNavigate()
  async function handleLogout() {
    if (await signOut()) navigate('/', { replace: true })
  }
  const { member } = useMember()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="member-app">
      <header className="member-navbar">
        <div className="member-navbar-inner">
          <Link className="member-brand" to="/reservas" aria-label="Quebrando Cogos, inicio">
            <img src="/logoclub.png" alt="" /><span>QUEBRANDO COGOS<small>CLUB CANNÁBICO</small></span>
          </Link>
          <nav className="member-main-nav" aria-label="Navegación del socio">
            <NavLink to="/reservas" end>Variedades</NavLink>
            <Link to="/reservas#mis-reservas">Mis reservas</Link>
          </nav>
          <div className="member-account">
            <span>Hola, <strong>{member.firstName}</strong></span>
            <Link className="member-avatar-link" to="/reservas/perfil" aria-label="Mi perfil">
              <img src={member.photo} alt="" className="member-avatar" /><span className="member-avatar-label">Mi perfil</span>
            </Link>
            <button className="member-logout" disabled={loading} onClick={handleLogout}>Cerrar sesión</button>
            {error && <span role="alert">{error}</span>}
          </div>
        </div>
      </header>
      <div className="member-demo"><span /> Modo demostración · Datos ficticios. Los cambios se conservan solo mientras navegás en esta sesión.</div>
      <main className="member-main"><Outlet /></main>
      <footer className="member-footer">
        <div><strong>Quebrando Cogos</strong><p>Un club. Una comunidad.</p></div>
        <nav aria-label="Información del club">
          <a href="https://ircca.gub.uy/" target="_blank" rel="noreferrer">IRCCA ↗</a>
          <Link to="/reservas/informacion/preguntas-frecuentes">Preguntas frecuentes</Link>
          <Link to="/reservas/informacion/estatutos">Estatutos</Link>
          <Link to="/reservas/informacion/terminos">Términos y condiciones</Link>
        </nav>
        <small>Prototipo privado · Contenido del club pendiente de validación.</small>
      </footer>
    </div>
  )
}

export default function MemberLayout() {
  return <MemberProvider><MemberShell /></MemberProvider>
}
