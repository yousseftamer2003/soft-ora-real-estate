import { useCallback, useEffect, useState } from 'react'
import { listFavourites, toggleCompoundFavourite, toggleUnitFavourite } from '../api/marketplace'
import { mapCompound, mapUnit } from '../api/mapListing'
import { useAuth } from '../auth/AuthProvider'

export function useFavourites() {
  const { token } = useAuth()
  const [units, setUnits] = useState([])
  const [compounds, setCompounds] = useState([])
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState(null)

  const reload = useCallback(
    async (signal) => {
      if (!token) {
        setUnits([])
        setCompounds([])
        return
      }
      const res = await listFavourites({ signal })
      setUnits((res.units ?? []).map(mapUnit))
      setCompounds((res.compounds ?? []).map(mapCompound))
    },
    [token],
  )

  useEffect(() => {
    if (!token) {
      setUnits([])
      setCompounds([])
      setLoading(false)
      setError(null)
      return
    }

    const ac = new AbortController()
    setLoading(true)
    setError(null)
    reload(ac.signal)
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => ac.abort()
  }, [token, reload])

  async function toggleUnit(id, favourite) {
    await toggleUnitFavourite(id, favourite ? 1 : 0)
    await reload()
  }

  async function toggleCompound(id, favourite) {
    await toggleCompoundFavourite(id, favourite ? 1 : 0)
    await reload()
  }

  return { units, compounds, loading, error, needsAuth: !token, toggleUnit, toggleCompound }
}
