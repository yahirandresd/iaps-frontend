// import { axiosInstance } from './axiosInterceptor'  ← descomentar al conectar backend
import { MEDICAMENTOS } from '../data/mockData'

/** @typedef {import('../models').Medicamento} Medicamento */

/**
 * Obtiene los medicamentos pendientes por recoger del usuario.
 * @returns {Promise<Medicamento[]>}
 */
export async function getMedicamentos() {
  // const { data } = await axiosInstance.get('/medicamentos')
  // return data
  return MEDICAMENTOS
}
