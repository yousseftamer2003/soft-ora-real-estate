import { useEffect, useState } from 'react'
import { getUserProfile, updateUserProfile } from '../api/marketplace'
import { useAuth } from '../auth/AuthProvider'

export function useProfile() {
  const { token, applySession, user: sessionUser } = useAuth()
  const [user, setUser] = useState(sessionUser ?? null)
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      setUser(null)
      setLoading(false)
      setError(null)
      return
    }

    const ac = new AbortController()
    setLoading(true)
    setError(null)
    getUserProfile({ signal: ac.signal })
      .then((res) => {
        setUser(res.user ?? null)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => ac.abort()
  }, [token])

  async function save(body) {
    const res = await updateUserProfile(body)
    const next = res.user ?? { ...user, ...body }
    setUser(next)
    applySession({ token, user: next })
    return next
  }

  return { user, loading, error, needsAuth: !token, save }
}
