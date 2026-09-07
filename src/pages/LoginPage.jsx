import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'

export default function LoginPage({ onClose, onSwitch }) {
  const { signIn } = useAuth()
  const [show, setShow] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    setPending(true)
    try {
      const credentials = identifier.includes('@')
        ? { email: identifier.trim(), password }
        : { phone: identifier.trim(), password }
      await signIn(credentials)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="modal-card" onSubmit={onSubmit}>
      <div className="modal-card__head">
        <h1>Log In</h1>
        <button type="button" className="close" aria-label="Close" onClick={onClose}>
          ×
        </button>
      </div>
      <label className="field">
        <span>Email or Phone Number</span>
        <input
          type="text"
          name="identifier"
          autoComplete="username"
          placeholder="Write your email or phone number here"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>Password</span>
        <div className="phone-row">
          <input
            type={show ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            placeholder="Write your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" className="btn-text" onClick={() => setShow((v) => !v)}>
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
      </label>
      {error ? <p className="form-status form-status--error">{error}</p> : null}
      <button type="submit" className="btn-accent" style={{ width: '100%' }} disabled={pending}>
        {pending ? 'Logging in…' : 'Log In'}
      </button>
      <p className="hint-row" style={{ justifyContent: 'center' }}>
        Don’t have an account?{' '}
        <button type="button" className="text-link" onClick={onSwitch}>
          Sign Up
        </button>
      </p>
    </form>
  )
}
