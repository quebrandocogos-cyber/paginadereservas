
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from './auth/AuthProvider'

function LoginForm() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const mounted = useRef(false)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const submitting = useRef(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting.current) return

    if (!username.trim() || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Ingresá tu nombre de usuario y contraseña.',
        confirmButtonColor: '#29dba0',
      })
      return
    }

    submitting.current = true
    setLoading(true)

    try {
      const profile = await signIn(username, password)
      if (!mounted.current) return

      if (profile.role === 'admin') {
        navigate('/admin', { replace: true })
      } else if (profile.role === 'member') {
        navigate('/reservas', { replace: true })
      }
    } catch (error) {
      if (!mounted.current) return
      Swal.fire({
        icon: 'error',
        title: 'No se pudo ingresar',
        text: error.message || 'Verificá tus credenciales.',
        confirmButtonColor: '#29dba0',
      })
    } finally {
      submitting.current = false
      if (mounted.current) setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-field">
        <label htmlFor="username">Nombre de usuario</label>

        <div className="login-input-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
          </svg>

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="login-field">
        <label htmlFor="password">Contraseña</label>

        <div className="login-input-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" aria-hidden="true">
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>

          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
            required
          />

          <button
            type="button"
            className="login-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" aria-hidden="true">
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" aria-hidden="true">
                <path d="M3 3l18 18" />
                <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a16 16 0 0 1-3.1 3.7M6.2 6.2C3.5 8.1 2 12 2 12s4 7 10 7a10 10 0 0 0 4.3-.9" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <button
        className="login-submit"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  )
}

export default LoginForm
