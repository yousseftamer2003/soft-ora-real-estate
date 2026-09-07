import { useState } from 'react'
import { sendRegisterPhoneOtp } from '../api/auth'
import { useAuth } from '../auth/AuthProvider'

export default function SignupPage({ onClose, onSwitch }) {
  const { signUp, verifySignupOtp, applySession } = useAuth()
  const [show, setShow] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [code, setCode] = useState('')
  const [needsOtp, setNeedsOtp] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    if (password !== verify) {
      setError('Passwords do not match.')
      return
    }
    setPending(true)
    try {
      if (needsOtp) {
        await verifySignupOtp({ phone, code })
        onClose()
        return
      }
      const payload = await signUp({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        platform: 'web',
      })
      if (payload?.token) {
        applySession(payload)
        onClose()
        return
      }
      if (payload?.needs_verification) {
        setNeedsOtp(true)
        return
      }
      setError(payload?.message || 'Check your WhatsApp for a verification code.')
      setNeedsOtp(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  async function resendOtp() {
    setError('')
    setPending(true)
    try {
      await sendRegisterPhoneOtp({ phone: phone.trim() })
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="modal-card" onSubmit={onSubmit}>
      <div className="modal-card__head">
        <div>
          <h1>Sign Up</h1>
          <p>{needsOtp ? 'Enter the WhatsApp code sent to your phone' : 'Create an account to save properties'}</p>
        </div>
        <button type="button" className="close" aria-label="Close" onClick={onClose}>
          ×
        </button>
      </div>
      {!needsOtp ? (
        <>
          <label className="field">
            <span>Full Name</span>
            <input
              type="text"
              name="full_name"
              autoComplete="name"
              placeholder="Write your name here"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Write your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Phone Number</span>
            <div className="phone-row">
              <span>+20</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="Write your phone number here"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="field">
            <span>Password</span>
            <div className="phone-row">
              <input
                type={show ? 'text' : 'password'}
                name="password"
                autoComplete="new-password"
                placeholder="Write your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <button type="button" className="btn-text" onClick={() => setShow((v) => !v)}>
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          <label className="field">
            <span>Verify Password</span>
            <input
              type="password"
              name="password_confirm"
              autoComplete="new-password"
              placeholder="Rewrite your password here"
              value={verify}
              onChange={(e) => setVerify(e.target.value)}
              required
            />
          </label>
        </>
      ) : (
        <label className="field">
          <span>Verification code</span>
          <input
            type="text"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="4–10 character code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            minLength={4}
            maxLength={10}
            required
          />
        </label>
      )}
      {error ? <p className="form-status form-status--error">{error}</p> : null}
      <button type="submit" className="btn-accent" style={{ width: '100%' }} disabled={pending}>
        {pending ? 'Please wait…' : needsOtp ? 'Verify' : 'Sign Up'}
      </button>
      {needsOtp ? (
        <p className="hint-row" style={{ justifyContent: 'center' }}>
          <button type="button" className="text-link" onClick={resendOtp} disabled={pending}>
            Resend code
          </button>
        </p>
      ) : (
        <p className="hint-row" style={{ justifyContent: 'center' }}>
          Already have an account?{' '}
          <button type="button" className="text-link" onClick={onSwitch}>
            Log in
          </button>
        </p>
      )}
    </form>
  )
}
