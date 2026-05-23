// import { axiosInstance } from './axiosInterceptor'  ← descomentar al conectar backend
import { AUTORIZACIONES } from '../data/mockData'

/** @typedef {import('../models').Autorizacion} Autorizacion */

/**
 * Obtiene todas las autorizaciones del usuario autenticado.
 * @returns {Promise<Autorizacion[]>}
 */
export async function getAutorizaciones() {
  // const { data } = await axiosInstance.get('/autorizaciones')
  // return data
  return AUTORIZACIONES
}

/**
 * Obtiene una autorización por su ID.
 * @param {string} id
 * @returns {Promise<Autorizacion|null>}
 */
export async function getAutorizacion(id) {
  // const { data } = await axiosInstance.get(`/autorizaciones/${id}`)
  // return data
  return AUTORIZACIONES.find(a => a.id === id) ?? null
}
