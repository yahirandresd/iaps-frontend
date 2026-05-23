import { useState, useEffect, useCallback } from 'react'

/**
 * Ejecuta una función async y expone { data, loading, error, refetch }.
 *
 * @template T
 * @param {() => Promise<T>} fn - Función async a ejecutar
 * @param {any[]} [deps=[]]    - Dependencias (re-ejecuta cuando cambien)
 * @returns {{ data: T|null, loading: boolean, error: string|null, refetch: () => void }}
 */
export function useAsync(fn, deps = []) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      setData(result)
    } catch (e) {
      setError(e.message ?? 'Error desconocido')
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => { execute() }, [execute])

  return { data, loading, error, refetch: execute }
}
