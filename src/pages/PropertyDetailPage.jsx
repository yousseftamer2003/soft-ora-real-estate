import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import GalleryLightbox from '../components/GalleryLightbox'
import QueryState from '../components/QueryState'
import { addUserLead } from '../api/marketplace'
import { amenities } from '../data/mock'
import { useAuth } from '../auth/AuthProvider'
import { useAuthModal } from '../hooks/useAuthModal'
import { useUnits } from '../hooks/useUnits'
import pin from '../assets/figma/pin.svg'
import iconType from '../assets/figma/icon-type.svg'
import iconArea from '../assets/figma/icon-area.svg'
import iconBed from '../assets/figma/icon-bed.svg'
import iconBath from '../assets/figma/icon-bath.svg'
import fallback from '../assets/figma/property-1.jpg'

export default function PropertyDetailPage() {
  const { id } = useParams()
  const { units, loading, error, needsAuth } = useUnits()
  const { isAuthed } = useAuth()
  const { openLogin } = useAuthModal()
  const item = useMemo(() => units.find((unit) => String(unit.id) === String(id)), [units, id])
  const gallery = item?.images?.length ? item.images : [item?.image || fallback]
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState('')
  const [pending, setPending] = useState(false)

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
        interested_place: item?.title || item?.location || '',
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
      <QueryState needsAuth={needsAuth} onLogin={openLogin} loading={loading} error={error} empty={!item} emptyText="This unit was not found.">
        {item ? (
          <>
            <p className="crumb">Home &gt; search result &gt; {item.title}</p>
            <div className="gallery">
              <button type="button" className="gallery__hit" onClick={() => setPreview(0)}>
                <img
                  className="gallery__main"
                  src={gallery[0] || fallback}
                  alt={`${item.title} main photo`}
                  width={811}
                  height={460}
                />
              </button>
              <div className="gallery__side">
                {gallery.map((src, index) => (
                  <button
                    type="button"
                    className="gallery__hit"
                    key={src + index}
                    onClick={() => setPreview(index)}
                  >
                    <img src={src || fallback} alt={`${item.title} photo ${index + 1}`} width={230} height={152} />
                  </button>
                ))}
              </div>
            </div>
            {preview != null && (
              <GalleryLightbox
                images={gallery}
                index={preview}
                onClose={() => setPreview(null)}
                onIndex={setPreview}
              />
            )}
            <div className="detail-layout">
              <div>
                <div className="panel">
                  <div className="detail-head">
                    <div>
                      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 500 }}>{item.title}</h1>
                      <p className="loc">
                        <img src={pin} alt="" width={11} height={14} />
                        {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="card__meta">
                    <p className="detail-price">{item.price}</p>
                    <div className="specs" style={{ maxWidth: 368 }}>
                      <div>
                        <img src={iconType} alt="" width={24} height={24} />
                        <span>Type</span>
                        <strong>{item.type}</strong>
                      </div>
                      <div>
                        <img src={iconArea} alt="" width={24} height={24} />
                        <span>Area</span>
                        <strong>{item.area || '—'}</strong>
                      </div>
                      <div>
                        <img src={iconBed} alt="" width={24} height={24} />
                        <span>Bedroom</span>
                        <strong>{item.beds}</strong>
                      </div>
                      <div>
                        <img src={iconBath} alt="" width={24} height={24} />
                        <span>Bathroom</span>
                        <strong>{item.baths}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel">
                  <h2>Description</h2>
                  <p>{item.description || 'Details for this unit will appear here from the CRM catalog.'}</p>
                </div>
                <div className="panel">
                  <h2>Amenities</h2>
                  <div className="amenities">
                    {amenities.map((name) => (
                      <div key={name} className="amenity">
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <aside>
                <form className="panel side-form" onSubmit={onSubmit}>
                  <h2>Interested in this Property?</h2>
                  <p>Fill in this form and we will contact you</p>
                  <label className="field">
                    <span className="sr-only">Your Name</span>
                    <input name="name" type="text" placeholder="Your Name" required />
                  </label>
                  <label className="field">
                    <span className="sr-only">Phone Number</span>
                    <input name="phone" type="tel" placeholder="Phone Number" required />
                  </label>
                  <label className="field">
                    <span className="sr-only">Email</span>
                    <input name="email" type="email" placeholder="Email" />
                  </label>
                  <label className="field">
                    <span className="sr-only">Message</span>
                    <textarea name="message" placeholder="Message" />
                  </label>
                  {status ? <p className="form-status">{status}</p> : null}
                  <button type="submit" className="btn-accent" disabled={pending}>
                    {pending ? 'Sending…' : 'Submit'}
                  </button>
                </form>
              </aside>
            </div>
          </>
        ) : null}
      </QueryState>
    </div>
  )
}
