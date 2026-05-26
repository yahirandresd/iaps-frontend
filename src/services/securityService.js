import { supabase } from '../lib/supabaseClient'

/**
 * Devuelve la sesión activa de Supabase (access_token, refresh_token, user…).
 * Supabase gestiona el refresco automáticamente.
 * @returns {Promise<import('@supabase/supabase-js').Session|null>}
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

/**
 * Devuelve el access_token JWT actual para enviarlo al backend NestJS.
 * @returns {Promise<string|null>}
 */
export async function getToken() {
  const session = await getSession()
  return session?.access_token ?? null
}

// setSession / clearSession ya no son necesarios (Supabase los maneja internamente),
// pero se exportan vacíos para no romper importaciones existentes mientras se migra.
export function setSession() {}
export function clearSession() {}
