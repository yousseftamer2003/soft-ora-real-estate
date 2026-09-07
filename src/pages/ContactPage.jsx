import { useState } from 'react'
import { addUserLead, sendComplaint } from '../api/marketplace'
import { useAuth } from '../auth/AuthProvider'
import { useAuthModal } from '../hooks/useAuthModal'

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const dates = [
  { n: 27, muted: true },
  { n: 28, muted: true },
  { n: 29, muted: true },
  { n: 30, muted: true },
  ...Array.from({ length: 31 }, (_, i) => ({ n: i + 1, muted: false })),
  { n: 1, muted: true },
  { n: 2, muted: true },
  { n: 3, muted: true },
  { n: 4, muted: true },
]

export default function ContactPage() {
  const [picked, setPicked] = useState(18)
  const { isAuthed, user } = useAuth()
  const { openLogin } = useAuthModal()
  const [messageStatus, setMessageStatus] = useState('')
  const [bookingStatus, setBookingStatus] = useState('')
  const [pendingMessage, setPendingMessage] = useState(false)
  const [pendingBooking, setPendingBooking] = useState(false)

  async function onMessage(event) {
    event.preventDefault()
    if (!isAuthed) {
      openLogin()
      return
    }
    const form = new FormData(event.currentTarget)
    const digits = String(form.get('phone') || '').replace(/\D/g, '')
    setMessageStatus('')
    setPendingMessage(true)
    try {
      await sendComplaint({
        name: String(form.get('name') || '').trim(),
        phone: Number(digits),
        message: String(form.get('message') || '').trim(),
      })
      setMessageStatus('Message sent.')
      event.currentTarget.reset()
    } catch (err) {
      setMessageStatus(err.message)
    } finally {
      setPendingMessage(false)
    }
  }

  async function onBooking(event) {
    event.preventDefault()
    if (!isAuthed) {
      openLogin()
      return
    }
    const form = new FormData(event.currentTarget)
    setBookingStatus('')
    setPendingBooking(true)
    try {
      await addUserLead({
        lead_name: 'Viewing appointment',
        lead_phone: user?.phone || '01000000000',
        interested_place: `Viewing ${picked} May 2026 ${form.get('slot')}`,
      })
      setBookingStatus('Appointment request sent.')
    } catch (err) {
      setBookingStatus(err.message)
    } finally {
      setPendingBooking(false)
    }
  }

  return (
    <>
      <section className="page-hero">
        <h1>Contact Us</h1>
        <p>We’re here to help. Reach out to us with any question or inquiries you may have</p>
      </section>
      <div className="wrap contact-grid">
        <form onSubmit={onMessage}>
          <h2>Send us a message</h2>
          <label className="field">
            <span>Name</span>
            <input name="name" type="text" placeholder="Write your name here" required />
          </label>
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" placeholder="Write your email here" />
          </label>
          <label className="field">
            <span>Phone Number</span>
            <input name="phone" type="tel" placeholder="Write your phone number here" required />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea name="message" placeholder="How can we help you" required />
          </label>
          {messageStatus ? <p className="form-status">{messageStatus}</p> : null}
          <button type="submit" className="btn-accent" style={{ width: '100%' }} disabled={pendingMessage}>
            {pendingMessage ? 'Sending…' : 'Send Message'}
          </button>
        </form>
        <form onSubmit={onBooking}>
          <h2>Book a viewing appointment</h2>
          <div className="calendar">
            <div className="calendar__head">
              <button type="button" aria-label="Previous month">
                ‹
              </button>
              <span>May 2026</span>
              <button type="button" aria-label="Next month">
                ›
              </button>
            </div>
            <div className="calendar__grid">
              {days.map((d) => (
                <span key={d} className="dow">
                  {d}
                </span>
              ))}
              {dates.map((d, i) => (
                <button
                  key={`${d.n}-${i}`}
                  type="button"
                  className={`${d.muted ? 'muted' : ''} ${!d.muted && d.n === picked ? 'picked' : ''}`}
                  onClick={() => !d.muted && setPicked(d.n)}
                >
                  {d.n}
                </button>
              ))}
            </div>
          </div>
          <label className="field" style={{ marginTop: 24 }}>
            <span>Preferred Time Slot</span>
            <select name="slot" defaultValue="10:00 AM - 11:00 AM">
              <option>10:00 AM - 11:00 AM</option>
              <option>11:00 AM - 12:00 PM</option>
              <option>2:00 PM - 3:00 PM</option>
              <option>4:00 PM - 5:00 PM</option>
            </select>
          </label>
          {bookingStatus ? <p className="form-status">{bookingStatus}</p> : null}
          <button type="submit" className="btn-accent" style={{ width: '100%' }} disabled={pendingBooking}>
            {pendingBooking ? 'Sending…' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </>
  )
}
