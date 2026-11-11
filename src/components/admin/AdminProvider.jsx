import { createContext, useContext, useRef, useState } from 'react'
import { createAdminMock, mockAdministrators } from '../../data/adminMock.js'
import { applyAdminAction } from '../../utils/adminRules.js'

const AdminContext = createContext(null)
export function useAdmin() { return useContext(AdminContext) }

export default function AdminProvider({ children }) {
  const [state, setState] = useState(createAdminMock)
  const currentState = useRef(state)
  const [adminId, setAdminId] = useState(mockAdministrators[0].id)
  const [notice, setNotice] = useState('')
  const administrator = mockAdministrators.find((item) => item.id === adminId)

  function execute(type, payload, message = 'Cambio guardado en la demostración.') {
    try {
      const next = applyAdminAction(currentState.current, { type, payload, adminId, id: crypto.randomUUID() })
      currentState.current = next
      setState(next)
      setNotice(`${message} Solo durante esta sesión; no se modificó Supabase.`)
      return ''
    } catch (error) {
      return error.message
    }
  }

  return <AdminContext.Provider value={{ state, administrator, administrators: mockAdministrators, setAdminId, execute, notice, clearNotice: () => setNotice('') }}>{children}</AdminContext.Provider>
}
