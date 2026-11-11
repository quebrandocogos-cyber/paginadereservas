import AuthProvider from './components/auth/AuthProvider.jsx'
﻿
import AppRouter from './router/AppRouter.jsx'

function App() {
  return <AuthProvider><AppRouter /></AuthProvider>
}

export default App
