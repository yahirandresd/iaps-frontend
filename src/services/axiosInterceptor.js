import axios from 'axios'
import { toast } from 'sonner'
import { getToken, isExpiringSoon, refreshSession, clearSession } from './securityService'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

axiosInstance.interceptors.request.use(async (config) => {
  if (isExpiringSoon()) {
    await refreshSession()
  }
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let _retrying = false

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !_retrying) {
      _retrying = true
      try {
        const session = await refreshSession()
        if (session?.token) {
          original.headers.Authorization = `Bearer ${session.token}`
          _retrying = false
          return axiosInstance(original)
        }
      } catch { /* fall through */ }
      _retrying = false
      clearSession()
      // Dynamic import breaks the securityService → axiosInterceptor → store circular chain
      const { store } = await import('../store')
      const { clearUser } = await import('../store/userSlice')
      store.dispatch(clearUser())
      window.location.href = '/login'
    }

    if (error.response?.status === 403) {
      toast.error('No tienes permisos para realizar esta acción.')
    }

    return Promise.reject(error)
  },
)
