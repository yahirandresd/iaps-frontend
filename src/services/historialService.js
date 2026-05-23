// import { axiosInstance } from './axiosInterceptor'  ← descomentar al conectar backend
import { HISTORIAL } from '../data/mockData'

/** @typedef {import('../models').RegistroHistorial} RegistroHistorial */

/**
 * Obtiene el historial clínico del usuario para un año específico.
 * @param {string|number} year
 * @returns {Promise<RegistroHistorial[]>}
 */
export async function getHistorialByYear(year) {
  // const { data } = await axiosInstance.get(`/historial?year=${year}`)
  // return data
  return HISTORIAL[year] ?? []
}

/**
 * Obtiene todos los años disponibles en el historial del usuario.
 * @returns {Promise<string[]>}
 */
export async function getHistorialYears() {
  // const { data } = await axiosInstance.get('/historial/years')
  // return data
  return Object.keys(HISTORIAL)
}
