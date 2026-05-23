import axios from 'axios'

const SESSION_KEY = 'iaps_user'
const BASE_URL = import.meta.env.VITE_API_URL ?? ''

/**
 * @typedef {import('../models').User} User
 */

/** @returns {User|null} */
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

/** @param {User} data */
export function setSession(data) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

/** @returns {string|null} */
export function getToken() {
  return getSession()?.token ?? null
}

/** @returns {boolean} true if token expires within the next 5 minutes */
export function isExpiringSoon() {
  const session = getSession()
  if (!session?.expires_at) return false
  return Date.now() / 1000 > session.expires_at - 300
}

/**
 * Uses a plain axios call (not the intercepted instance) to avoid circular imports.
 * @returns {Promise<User|null>}
 */
export async function refreshSession() {
  const session = getSession()
  if (!session?.refresh_token) return null
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
      refresh_token: session.refresh_token,
    })
    setSession(data)
    return data
  } catch {
    return null
  }
}
