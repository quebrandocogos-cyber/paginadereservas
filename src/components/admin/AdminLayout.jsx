import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import AdminProvider, { useAdmin } from './AdminProvider.jsx'
import { AdminAvatar, AdminIcon } from './AdminUI.jsx'
import { clubClock, formatDate } from '../../utils/reservationRules.js'
import '../../Style/Admin.css'

const navigation = [
  { to: '/admin', name: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/socios', name: 'Socios', icon: 'members' },
  { to: '/admin/stock', name: 'Stock', icon: 'stock' },
  { to: '/admin/balance', name: 'Balance', icon: 'balance' },
]

function AdminShell() {
  const { administrator, administrators, setAdminId, notice, clearNotice } = useAdmin()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const section = pathname.includes('configuracion') ? 'Configuración' : navigation.slice().reverse().find((item) => pathname.startsWith(item.to))?.name
  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0) }, [pathname])

  return <div className="admin-app admin-shell">
    {menuOpen && <button className="admin-menu-backdrop" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />}
    <aside className={`admin-sidebar ${menuOpen ? 'is-open' : ''}`} id="admin-sidebar" aria-label="Administración">
      <Link to="/admin" className="admin-brand"><img src="/logoclub.png" alt="" /><span>QUEBRANDO COGOS<small>ADMINISTRACIÓN</small></span></Link>
      <p className="admin-nav-caption">ESPACIO DE GESTIÓN</p>
      <nav className="admin-navigation" aria-label="Menú principal administrativo">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMenuOpen(false)}><AdminIcon name={item.icon} />{item.name}</NavLink>)}</nav>
      <div className="admin-sidebar-bottom">
        <NavLink className="admin-settings-link" to="/admin/configuracion" onClick={() => setMenuOpen(false)}><AdminIcon name="settings" />Configuración</NavLink>
        <div className="admin-identity"><AdminAvatar member={administrator} /><div><strong>{administrator.name}</strong><small>{administrator.role}</small></div></div>
        <label className="admin-switcher">Administrador de ejemplo<select value={administrator.id} onChange={(event) => setAdminId(event.target.value)}>{administrators.map((admin) => <option key={admin.id} value={admin.id}>{admin.name}</option>)}</select></label>
        <small className="admin-permissions-note">Los tres administradores tienen los mismos permisos.</small>
      </div>
    </aside>
    <div className="admin-workspace">
      <header className="admin-topbar"><div><button className="admin-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="admin-sidebar" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>☰</button><span>Administración <span aria-hidden="true">/</span> <strong>{section}</strong></span></div><span className="admin-topbar-date">{formatDate(clubClock().date)} · Uruguay</span></header>
      <div className="admin-demo"><span /> Modo demostración · Datos ficticios en memoria. Al recargar se reinician. No modifica el área del socio.</div>
      {notice && <div className="admin-notice" role="status"><span>{notice}</span><button onClick={clearNotice} aria-label="Cerrar aviso">×</button></div>}
      <main className="admin-main"><Outlet /></main>
      <footer className="admin-footer">Quebrando Cogos · Gestión interna de demostración · Sin operaciones reales ni procesamiento de pagos.</footer>
    </div>
  </div>
}

export default function AdminLayout() { return <AdminProvider><AdminShell /></AdminProvider> }
