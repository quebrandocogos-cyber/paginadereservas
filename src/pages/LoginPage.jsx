import LoginForm from '../components/LoginForm.jsx'
import '../Style/Login.css'

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">

        <img
          className="login-logo"
          src="/logoclub.png"
          alt="Quebrando Cogos, club cannábico"
        />

        <header className="login-header">
          <h1 id="login-title">LOGIN</h1>
        </header>

        <LoginForm />

      </section>
    </main>
  )
}

export default LoginPage