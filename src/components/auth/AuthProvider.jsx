import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { supabase } from '../../services/supabaseClient'
import { restoreAccess, logout, loginWithUsername } from '../../services/authService'

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
  const [access, setAccess] = useState({ loading: true, profile: null, error: null })
  const generation = useRef(0)
  const mounted = useRef(false)
  const signingOut = useRef(false)
  const signingIn = useRef(false)
  const refresh = useCallback(async () => {
    if (signingOut.current || signingIn.current) return
    const current = ++generation.current
    // Revalidar una identidad ya aprobada sin desmontar los providers de negocio.
    setAccess(previous => previous.profile && !previous.error
      ? previous
      : { loading: true, profile: null, error: null })
    try {
      const profile = await restoreAccess()
      if (mounted.current && current === generation.current) setAccess({ loading: false, profile, error: null })
    } catch {
      if (mounted.current && current === generation.current) setAccess({ loading: false, profile: null, error: 'No se pudo validar el acceso. Revisá tu conexión y que tu perfil esté activo y autorizado.' })
    }
  }, [])
  useEffect(() => {
    mounted.current = true
    // No ejecutar llamadas Auth dentro del callback de onAuthStateChange.
    let timer
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (signingIn.current) return
      ++generation.current
      setAccess(previous => event !== 'SIGNED_OUT' && previous.profile?.id === session?.user?.id
        ? previous
        : { loading: event !== 'SIGNED_OUT', profile: null, error: null })
      clearTimeout(timer)
      if (event !== 'SIGNED_OUT') timer = setTimeout(refresh, 0)
    })
    refresh()
    const onFocus = () => refresh()
    window.addEventListener('focus', onFocus)
    return () => {
      mounted.current = false
      ++generation.current
      clearTimeout(timer)
      subscription.unsubscribe()
      window.removeEventListener('focus', onFocus)
    }
  }, [refresh])
  async function signOut() {
    if (signingOut.current || signingIn.current) return false
    signingOut.current = true
    ++generation.current
    setAccess({ loading: true, profile: null, error: null })
    try {
      await logout()
      if (mounted.current) setAccess({ loading: false, profile: null, error: null })
      return true
    } catch {
      if (mounted.current) setAccess({ loading: false, profile: null, error: 'No se pudo cerrar la sesión. Intentá nuevamente.' })
      return false
    } finally { signingOut.current = false }
  }
  async function signIn(username, password) {
    if (signingIn.current || signingOut.current) throw new Error('Esperá a que finalice la operación actual.')
    signingIn.current = true
    const current = ++generation.current
    setAccess({ loading: true, profile: null, error: null })
    try {
      const profile = await loginWithUsername(username, password)
      if (mounted.current && current === generation.current) setAccess({ loading: false, profile, error: null })
      return profile
    } catch (error) {
      if (mounted.current && current === generation.current) setAccess({ loading: false, profile: null, error: error.message })
      throw error
    } finally { signingIn.current = false }
  }
  return <AuthContext.Provider value={{ ...access, refresh, signOut, signIn }}>{children}</AuthContext.Provider>
}
