import { Link } from 'react-router-dom'
import heart from '../assets/figma/heart.svg'
import pin from '../assets/figma/pin.svg'
import arrow from '../assets/figma/arrow-left.svg'
import dots from '../assets/figma/dots.svg'
import fallback from '../assets/figma/property-2.jpg'

export default function ProjectCard({ item, onFav }) {
  return (
    <article className="card">
      <div className="card__media">
        <img className="cover" src={item.image || fallback} alt="" width={270} height={211} />
        <button
          type="button"
          className="fav"
          aria-label={item.favourite ? 'Remove from favorites' : 'Save to favorites'}
          onClick={() => onFav?.(item)}
        >
          <img src={heart} alt="" width={24} height={24} />
        </button>
        <div className="carousel-ui" aria-hidden="true">
          <img src={arrow} alt="" width={16} height={16} />
          <img className="dots" src={dots} alt="" width={65} height={10} />
          <img src={arrow} alt="" width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        </div>
      </div>
      <div className="card__body">
        <div className="card__title-row">
          <h3>{item.title}</h3>
          <span className="badge">Project</span>
        </div>
        <p className="price">{item.price}</p>
        <p className="loc">
          <img src={pin} alt="" width={11} height={14} />
          {item.location}
        </p>
        <p className="desc">{item.description}</p>
        <Link to={`/projects/${item.id}`} className="btn-primary">
          More Details
        </Link>
      </div>
    </article>
  )
}
