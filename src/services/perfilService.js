// import { axiosInstance } from './axiosInterceptor'  ← descomentar al conectar backend
import { USER } from '../data/mockData'

/** @typedef {import('../models').User} User */

/**
 * Obtiene el perfil completo del usuario autenticado.
 * @returns {Promise<User>}
 */
export async function getPerfil() {
  // const { data } = await axiosInstance.get('/perfil')
  // return data
  return USER
}

/**
 * Actualiza datos del perfil del usuario.
 * @param {Partial<User>} payload
 * @returns {Promise<{ data: User|null, error: string|null }>}
 */
export async function updatePerfil(payload) {
  try {
    // const { data } = await axiosInstance.put('/perfil', payload)
    // return { data, error: null }
    return { data: { ...USER, ...payload }, error: null }
  } catch (e) {
    return { data: null, error: e.message ?? 'Error al actualizar perfil' }
  }
}

/**
 * Actualiza el contacto de emergencia.
 * @param {{ nombre: string, telefono: string }} payload
 * @returns {Promise<{ data: null, error: string|null }>}
 */
export async function updateContactoEmergencia(payload) {
  try {
    // await axiosInstance.put('/perfil/emergencia', payload)
    void payload
    return { data: null, error: null }
  } catch (e) {
    return { data: null, error: e.message ?? 'Error al actualizar contacto' }
  }
}

/**
 * Cambia la contraseña del usuario.
 * @param {{ actual: string, nueva: string }} payload
 * @returns {Promise<{ data: null, error: string|null }>}
 */
export async function cambiarPassword(payload) {
  try {
    // await axiosInstance.post('/perfil/password', payload)
    void payload
    return { data: null, error: null }
  } catch (e) {
    return { data: null, error: e.message ?? 'Error al cambiar contraseña' }
  }
}
