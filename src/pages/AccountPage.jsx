import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QueryState from '../components/QueryState'
import { displayName } from '../api/mapListing'
import { useAuthModal } from '../hooks/useAuthModal'
import { useProfile } from '../hooks/useProfile'

export default function AccountPage() {
  const { user, loading, error, needsAuth, save } = useProfile()
  const { openLogin } = useAuthModal()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!user) return
    setFullName(displayName(user))
    setEmail(user.email || '')
    setPhone(user.phone || '')
  }, [user])

  async function onSubmit(event) {
    event.preventDefault()
    setStatus('')
    setPending(true)
    try {
      const [first_name, ...rest] = fullName.trim().split(/\s+/)
      await save({
        first_name: first_name || fullName,
        last_name: rest.join(' ') || first_name || fullName,
        email: email.trim(),
        phone: phone.trim(),
      })
      setStatus('Saved.')
    } catch (err) {
      setStatus(err.message)
    } finally {
      setPending(false)
    }
  }

  const initial = (displayName(user) || 'U').charAt(0).toUpperCase()

  return (
    <div className="modal-page">
      <form className="modal-card" onSubmit={onSubmit}>
        <div className="modal-card__head">
          <h1>My Account</h1>
          <Link to="/" className="close" aria-label="Close">
            ×
          </Link>
        </div>
        <QueryState needsAuth={needsAuth} onLogin={openLogin} loading={loading} error={error}>
          <div className="avatar" aria-hidden="true">
            {initial}
          </div>
          <label className="field">
            <span>Full Name</span>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </label>
          <label className="field">
            <span>Email</span>
            <div className="phone-row">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </label>
          <label className="field">
            <span>Phone Number</span>
            <div className="phone-row">
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </label>
          <p className="hint-row">
            Want to change your password? <Link to="/change-password">Change</Link>
          </p>
          <p className="hint-row">
            <Link to="/favorites">View my favorites</Link>
          </p>
          {status ? <p className="form-status">{status}</p> : null}
          <button type="submit" className="btn-accent" style={{ width: '100%' }} disabled={pending}>
            {pending ? 'Saving…' : 'Save'}
          </button>
        </QueryState>
      </form>
    </div>
  )
}
