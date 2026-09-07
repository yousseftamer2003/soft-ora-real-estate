import { useEffect, useState } from 'react'
import { listCompoundsWithCommission, listUserCompounds, listUserDevelopers } from '../api/marketplace'
import { mapCompound, mapDeveloper } from '../api/mapListing'
import { useAuth } from '../auth/AuthProvider'

async function loadProjects(signal) {
  try {
    const res = await listCompoundsWithCommission({ signal })
    const compounds = (res.compounds ?? []).map(mapCompound)
    if (compounds.length) return { compounds, developers: [] }
  } catch {
    /* fall through to developer + compound lists */
  }

  const devRes = await listUserDevelopers({ signal })
  const developers = (devRes.developers ?? []).map(mapDeveloper)
  const nested = await Promise.all(
    developers.map((dev) => listUserCompounds(dev.id, { signal }).catch(() => ({ compounds: [] }))),
  )
  const compounds = nested.flatMap((res) => (res.compounds ?? []).map(mapCompound))
  return { compounds, developers }
}

export function useProjects() {
  const { token } = useAuth()
  const [projects, setProjects] = useState([])
  const [developers, setDevelopers] = useState([])
  const [loading, setLoading] = useState(Boolean(token))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      setProjects([])
      setDevelopers([])
      setLoading(false)
      setError(null)
      return
    }

    const ac = new AbortController()
    setLoading(true)
    setError(null)
    loadProjects(ac.signal)
      .then(({ compounds, developers: nextDevelopers }) => {
        setProjects(compounds)
        setDevelopers(nextDevelopers)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => ac.abort()
  }, [token])

  return { projects, developers, loading, error, needsAuth: !token }
}
