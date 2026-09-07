import { useEffect, useState } from 'react'
import { userHomepage } from '../api/marketplace'
import { useAuth } from '../auth/AuthProvider'

export function useHomepage() {
  const { token } = useAuth()
  const [ads, setAds] = useState([])
  const [broker, setBroker] = useState(null)
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      setAds([])
      setBroker(null)
      setLoading(false)
      setError(null)
      return
    }

    const ac = new AbortController()
    setLoading(true)
    setError(null)
    userHomepage({ signal: ac.signal })
      .then((res) => {
        setAds(res.ads ?? [])
        setBroker(res.brocker ?? null)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => ac.abort()
  }, [token])

  return { ads, broker, loading, error, needsAuth: !token }
}
