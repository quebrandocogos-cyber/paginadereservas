import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function RequireAdmin({ children }) {
  const { loading, profile, error, refresh, signOut } = useAuth()
  if (loading) return <p role="status">Validando acceso…</p>
  if (error) return <div role="alert"><p>{error}</p><button onClick={refresh}>Reintentar</button><button onClick={signOut}>Cerrar sesión</button></div>
  if (!profile || profile.status !== 'active') return <Navigate to="/" replace />
  if (profile.role !== 'admin') return <Navigate to={profile.role === 'member' ? '/reservas' : '/'} replace />
  return children
}
