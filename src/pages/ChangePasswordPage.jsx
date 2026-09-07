import { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateUserProfile } from '../api/marketplace'

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [status, setStatus] = useState('')
  const [pending, setPending] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setStatus('')
    if (password !== verify) {
      setStatus('New passwords do not match.')
      return
    }
    setPending(true)
    try {
      await updateUserProfile({ password })
      setStatus('Password updated.')
      setCurrentPassword('')
      setPassword('')
      setVerify('')
    } catch (err) {
      setStatus(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="modal-page">
      <form className="modal-card" onSubmit={onSubmit}>
        <div className="modal-card__head">
          <h1>Change Password</h1>
          <Link to="/account" className="close" aria-label="Close">
            ×
          </Link>
        </div>
        <label className="field">
          <span>Current Password</span>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Write your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label className="field">
          <span>New Password</span>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Write your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>
        <label className="field">
          <span>Verify Password</span>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Rewrite your new password"
            value={verify}
            onChange={(e) => setVerify(e.target.value)}
            required
          />
        </label>
        {status ? <p className="form-status">{status}</p> : null}
        <button type="submit" className="btn-accent" style={{ width: '100%' }} disabled={pending}>
          {pending ? 'Saving…' : 'Save'}
        </button>
      </form>
    </div>
  )
}
