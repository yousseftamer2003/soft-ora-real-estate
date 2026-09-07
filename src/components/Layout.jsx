import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import Footer from './Footer'
import Header from './Header'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

const userRoutes = ['/account', '/favorites', '/change-password']

export default function Layout() {
  const { pathname } = useLocation()
  const [params, setParams] = useSearchParams()
  const { isAuthed } = useAuth()
  const auth = params.get('auth')

  function setAuth(mode) {
    const next = new URLSearchParams(params)
    if (mode) next.set('auth', mode)
    else next.delete('auth')
    setParams(next, { replace: true })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = auth ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [auth])

  if (pathname === '/login') return <Navigate to="/?auth=login" replace />
  if (pathname === '/signup') return <Navigate to="/?auth=signup" replace />
  if (userRoutes.includes(pathname) && !isAuthed) {
    return <Navigate to={`/?auth=login`} replace />
  }

  return (
    <div className="page">
      <Header onOpenAuth={setAuth} />
      <main className="page-main">
        <div key={pathname} className="page-fade">
          <Outlet />
        </div>
      </main>
      <Footer />
      {auth === 'login' || auth === 'signup' ? (
        <div className="auth-overlay">
          <button
            type="button"
            className="auth-overlay__bg"
            aria-label="Close dialog"
            onClick={() => setAuth(null)}
          />
          <div className="auth-overlay__card">
            {auth === 'login' ? (
              <LoginPage onClose={() => setAuth(null)} onSwitch={() => setAuth('signup')} />
            ) : (
              <SignupPage onClose={() => setAuth(null)} onSwitch={() => setAuth('login')} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
