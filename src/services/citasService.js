// import { axiosInstance } from './axiosInterceptor'  ← descomentar al conectar backend
import { CITAS } from '../data/mockData'

/** @typedef {import('../models').CitasResponse} CitasResponse */
/** @typedef {import('../models').Cita}          Cita */

/**
 * Obtiene todas las citas del usuario autenticado agrupadas por estado.
 * @returns {Promise<CitasResponse>}
 */
export async function getCitas() {
  // const { data } = await axiosInstance.get('/citas')
  // return data
  return CITAS
}

/**
 * Cancela una cita por su ID.
 * @param {string} id
 * @returns {Promise<{ data: null, error: string|null }>}
 */
export async function cancelarCita(id) {
  try {
    // await axiosInstance.patch(`/citas/${id}/cancelar`, {})
    void id
    return { data: null, error: null }
  } catch (e) {
    return { data: null, error: e.message ?? 'Error al cancelar' }
  }
}

/**
 * Solicita agendar una nueva cita.
 * @param {{ tipo: string, fecha: string, hora: string }} payload
 * @returns {Promise<{ data: Cita|null, error: string|null }>}
 */
export async function agendarCita(payload) {
  try {
    // const { data } = await axiosInstance.post('/citas', payload)
    // return { data, error: null }
    void payload
    throw new Error('Próximamente disponible')
  } catch (e) {
    return { data: null, error: e.message ?? 'Error al agendar' }
  }
}
