import axios from 'axios'
import { toast } from 'sonner'
import { getToken } from './securityService'
import { supabase } from '../lib/supabaseClient'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await supabase.auth.signOut()
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
