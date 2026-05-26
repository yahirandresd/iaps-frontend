import { createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser, selectUser, selectIsAuthenticated } from '../store/userSlice'
import { supabase } from '../lib/supabaseClient'
import { logout as logoutService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') {
        // App recargada — restauramos perfil si hay sesión activa
        if (session) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profile) {
            const initials = profile.nombre?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? ''
            dispatch(setUser({ ...profile, initials }))
          } else {
            dispatch(setUser({ id: session.user.id, email: session.user.email }))
          }
        } else {
          dispatch(clearUser())
        }
      }

      if (event === 'SIGNED_OUT') {
        dispatch(clearUser())
      }
    })

    return () => subscription.unsubscribe()
  }, [dispatch])

  async function login(userData) {
    dispatch(setUser(userData))
  }

  async function logout() {
    await logoutService()
    dispatch(clearUser())
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
