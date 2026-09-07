import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import QueryState from '../components/QueryState'
import { addUserLead } from '../api/marketplace'
import { useAuth } from '../auth/AuthProvider'
import { useAuthModal } from '../hooks/useAuthModal'
import { useProjects } from '../hooks/useProjects'
import pin from '../assets/figma/pin.svg'
import fallback from '../assets/figma/hero.jpg'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { projects, loading, error, needsAuth } = useProjects()
  const { isAuthed } = useAuth()
  const { openLogin } = useAuthModal()
  const item = useMemo(() => projects.find((project) => String(project.id) === String(id)), [projects, id])
  const [status, setStatus] = useState('')
  const [pending, setPending] = useState(false)
  const gallery = item?.image ? [item.image] : [fallback]

  async function onSubmit(event) {
    event.preventDefault()
    if (!isAuthed) {
      openLogin()
      return
    }
    const form = new FormData(event.currentTarget)
    setStatus('')
    setPending(true)
    try {
      await addUserLead({
        lead_name: String(form.get('name') || '').trim(),
        lead_phone: String(form.get('phone') || '').trim(),
        interested_place: item?.title || '',
      })
      setStatus('Thanks. We received your interest.')
      event.currentTarget.reset()
    } catch (err) {
      setStatus(err.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="wrap">
      <QueryState needsAuth={needsAuth} onLogin={openLogin} loading={loading} error={error} empty={!item} emptyText="This project was not found.">
        {item ? (
          <>
            <p className="crumb">Home &gt; Projects &gt; {item.title}</p>
            <div className="gallery">
              <img className="gallery__main" src={gallery[0]} alt="" width={811} height={460} />
              <div className="gallery__side">
                {gallery.map((src) => (
                  <img key={src} src={src} alt="" width={230} height={152} />
                ))}
              </div>
            </div>
            <div className="detail-layout">
              <div>
                <div className="panel">
                  <div className="card__title-row">
                    <h1 style={{ margin: 0, fontSize: 32, fontWeight: 500 }}>{item.title}</h1>
                    <span className="badge">Project</span>
                  </div>
                  <p className="detail-price">{item.price}</p>
                  <p className="loc">
                    <img src={pin} alt="" width={11} height={14} />
                    {item.location}
                  </p>
                  <p>{item.description}</p>
                </div>
                {item.units?.length ? (
                  <div className="panel">
                    <h2>Available units in this project</h2>
                    <div className="card-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                      {item.units.map((unit) => (
                        <PropertyCard key={unit.id} item={unit} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <form className="panel side-form" onSubmit={onSubmit}>
                <h2>Interested in this Project?</h2>
                <p>Fill in this form and we will contact you</p>
                <label className="field">
                  <span>Your Name</span>
                  <input name="name" type="text" placeholder="Your Name" required />
                </label>
                <label className="field">
                  <span>Phone Number</span>
                  <input name="phone" type="tel" placeholder="Phone Number" required />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input name="email" type="email" placeholder="Email" />
                </label>
                {status ? <p className="form-status">{status}</p> : null}
                <button type="submit" className="btn-accent" disabled={pending}>
                  {pending ? 'Sending…' : 'Submit'}
                </button>
              </form>
            </div>
          </>
        ) : null}
      </QueryState>
    </div>
  )
}
