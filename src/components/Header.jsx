import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/softora-logo.png'
import { useAuth } from '../auth/AuthProvider'

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Us' },
]

export default function Header({ onOpenAuth }) {
  const [open, setOpen] = useState(false)
  const { isAuthed, displayName, signOut } = useAuth()

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="softora — digital solutions, made simple" />
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Primary">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {isAuthed ? (
          <div className={open ? 'header-actions open' : 'header-actions'}>
            <Link to="/account" className="user-chip" onClick={() => setOpen(false)}>
              {displayName || 'Account'} ▾
            </Link>
            <button
              type="button"
              className="btn-text"
              onClick={() => {
                setOpen(false)
                signOut()
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className={open ? 'header-actions open' : 'header-actions'}>
            <button
              type="button"
              className="btn-text"
              onClick={() => {
                setOpen(false)
                onOpenAuth?.('login')
              }}
            >
              Login
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setOpen(false)
                onOpenAuth?.('signup')
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
