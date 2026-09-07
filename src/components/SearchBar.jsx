import { useSearchParams, useNavigate } from 'react-router-dom'
import pin from '../assets/figma/loc-hero.svg'

export default function SearchBar({ compact = false }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  function onSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const next = new URLSearchParams()
    const location = String(form.get('location') || '').trim()
    const type = String(form.get('type') || '').trim()
    const price = String(form.get('price') || '').trim()
    if (location) next.set('location', location)
    if (type) next.set('type', type)
    if (price) next.set('price', price)
    navigate(`/search?${next.toString()}`)
  }

  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <div className="search-bar__fields">
        <label>
          <img src={pin} alt="" width={24} height={24} />
          <input
            name="location"
            type="text"
            placeholder="Your Dream Home’s Location"
            autoComplete="off"
            defaultValue={params.get('location') || ''}
          />
        </label>
        {!compact && <span className="divider" aria-hidden="true" />}
        <label>
          <span className="sr-only">Property type</span>
          <select name="type" defaultValue={params.get('type') || ''}>
            <option value="">All Property Types</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </label>
        <span className="divider" aria-hidden="true" />
        <label>
          <span className="sr-only">Price range</span>
          <select name="price" defaultValue={params.get('price') || ''}>
            <option value="">Any Price Range</option>
            <option value="under5">Under 5M</option>
            <option value="5to10">5M – 10M</option>
            <option value="10plus">10M+</option>
          </select>
        </label>
      </div>
      <button type="submit" className="btn-search">
        Search
      </button>
    </form>
  )
}
