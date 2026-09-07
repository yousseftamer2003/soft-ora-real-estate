import { useEffect, useState } from 'react'
import { listUnits } from '../api/marketplace'
import { mapUnit } from '../api/mapListing'
import { useAuth } from '../auth/AuthProvider'

export function useUnits() {
  const { token } = useAuth()
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      setUnits([])
      setLoading(false)
      setError(null)
      return
    }

    const ac = new AbortController()
    setLoading(true)
    setError(null)
    listUnits({ signal: ac.signal })
      .then((res) => setUnits((res.units ?? []).map(mapUnit)))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => ac.abort()
  }, [token])

  return { units, loading, error, needsAuth: !token }
}
