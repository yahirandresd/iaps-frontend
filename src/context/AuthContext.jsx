import { createContext, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser, selectUser, selectIsAuthenticated } from '../store/userSlice'
import { setSession, clearSession } from '../services/securityService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  function login(userData) {
    setSession(userData)
    dispatch(setUser(userData))
  }

  function logout() {
    clearSession()
    dispatch(clearUser())
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
