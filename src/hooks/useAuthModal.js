import { useSearchParams } from 'react-router-dom'

export function useAuthModal() {
  const [params, setParams] = useSearchParams()

  function openLogin() {
    const next = new URLSearchParams(params)
    next.set('auth', 'login')
    setParams(next)
  }

  return { openLogin }
}
