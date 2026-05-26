import { useState, useEffect, useCallback } from 'react'

const MAX_ATTEMPTS = 5
const LOCK_SECONDS = 60

function storageKey(key) { return `iaps_rl_${key}` }

function readState(key) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(key))) ?? { attempts: 0, lockedUntil: 0 }
  } catch {
    return { attempts: 0, lockedUntil: 0 }
  }
}

export function useRateLimit(key) {
  const [state, setState] = useState(() => readState(key))

  const isLocked = state.lockedUntil > Date.now()
  const secondsLeft = isLocked ? Math.ceil((state.lockedUntil - Date.now()) / 1000) : 0

  useEffect(() => {
    if (!isLocked) return
    const id = setInterval(() => {
      const s = readState(key)
      setState({ ...s })
      if (s.lockedUntil <= Date.now()) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [isLocked, key])

  const recordAttempt = useCallback(() => {
    const s = readState(key)
    const attempts = s.attempts + 1
    const next = attempts >= MAX_ATTEMPTS
      ? { attempts: 0, lockedUntil: Date.now() + LOCK_SECONDS * 1000 }
      : { attempts, lockedUntil: 0 }
    localStorage.setItem(storageKey(key), JSON.stringify(next))
    setState(next)
  }, [key])

  const resetAttempts = useCallback(() => {
    localStorage.removeItem(storageKey(key))
    setState({ attempts: 0, lockedUntil: 0 })
  }, [key])

  return { isLocked, secondsLeft, recordAttempt, resetAttempts }
}
