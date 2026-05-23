// import { axiosInstance } from './axiosInterceptor'  ← descomentar al conectar backend
import { USER } from '../data/mockData'

/** @typedef {import('../models').LoginPayload}    LoginPayload */
/** @typedef {import('../models').RegisterPayload} RegisterPayload */
/** @typedef {import('../models').User}            User */

/**
 * Inicia sesión con cédula, fecha de expedición y contraseña.
 * @param {LoginPayload} payload
 * @returns {Promise<User>}
 */
export async function login(payload) {
  // const { data } = await axiosInstance.post('/auth/login', payload)
  // return data
  void payload
  return USER
}

/**
 * Registra un nuevo usuario.
 * @param {RegisterPayload} payload
 * @returns {Promise<{ data: User|null, error: string|null }>}
 */
export async function register(payload) {
  try {
    // const { data } = await axiosInstance.post('/auth/register', payload)
    // return { data, error: null }
    const initials = (payload.nombre ?? 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    return { data: { ...USER, ...payload, initials }, error: null }
  } catch (e) {
    return { data: null, error: e.message ?? 'Error al registrar' }
  }
}

/**
 * Cierra la sesión en el servidor (invalida el token).
 * @returns {Promise<void>}
 */
export async function logout() {
  // await axiosInstance.post('/auth/logout', {})
}
