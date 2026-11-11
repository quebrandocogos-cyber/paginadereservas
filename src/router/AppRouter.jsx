import RequireAdmin from '../components/auth/RequireAdmin.jsx'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/LoginPage.jsx'

const AdminLayout = lazy(() => import('../components/admin/AdminLayout.jsx'))
const AdminPage = lazy(() => import('../pages/AdminPage.jsx'))
const AdminMembersPage = lazy(() => import('../pages/admin/AdminMembersPage.jsx'))
const AdminMemberDetailPage = lazy(() => import('../pages/admin/AdminMemberDetailPage.jsx'))
const AdminStockPage = lazy(() => import('../pages/admin/AdminStockPage.jsx'))
const AdminBalancePage = lazy(() => import('../pages/admin/AdminBalancePage.jsx'))
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage.jsx'))

const MemberLayout = lazy(() => import('../components/member/MemberLayout.jsx'))
const ReservasPage = lazy(() => import('../pages/ReservasPage.jsx'))
const MemberProfilePage = lazy(() => import('../pages/MemberProfilePage.jsx'))
const MemberInformationPage = lazy(() => import('../pages/MemberInformationPage.jsx'))

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/reservas" element={
        <Suspense fallback={<p role="status">Cargando el espacio del socio…</p>}>
          <MemberLayout />
        </Suspense>
      }>
        <Route index element={<ReservasPage />} />
        <Route path="perfil" element={<MemberProfilePage />} />
        <Route path="informacion/:slug" element={<MemberInformationPage />} />
      </Route>
      <Route path="/admin" element={
        <Suspense fallback={<p role="status">Cargando el panel administrativo…</p>}>
          <RequireAdmin><AdminLayout /></RequireAdmin>
        </Suspense>
      }>
        <Route index element={<AdminPage />} />
        <Route path="socios" element={<AdminMembersPage />} />
        <Route path="socios/:memberId" element={<AdminMemberDetailPage />} />
        <Route path="stock" element={<AdminStockPage />} />
        <Route path="balance" element={<AdminBalancePage />} />
        <Route path="configuracion" element={<AdminSettingsPage />} />
        <Route path="*" element={<p>Sección no encontrada. Usá el menú para volver al panel.</p>} />
      </Route>
    </Routes>
  )
}

export default AppRouter
