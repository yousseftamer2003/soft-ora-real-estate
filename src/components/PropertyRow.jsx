import { Link } from 'react-router-dom'
import heart from '../assets/figma/heart.svg'
import pin from '../assets/figma/pin.svg'
import arrow from '../assets/figma/arrow-left.svg'
import dots from '../assets/figma/dots.svg'
import iconType from '../assets/figma/icon-type.svg'
import iconArea from '../assets/figma/icon-area.svg'
import iconBed from '../assets/figma/icon-bed.svg'
import iconBath from '../assets/figma/icon-bath.svg'
import fallback from '../assets/figma/property-h.jpg'

export default function PropertyRow({ item, to, onFav }) {
  return (
    <article className="row-card">
      <div className="row-card__media">
        <img className="cover" src={item.image || fallback} alt="" width={239} height={211} />
        <div className="carousel-ui" aria-hidden="true">
          <img src={arrow} alt="" width={16} height={16} />
          <img className="dots" src={dots} alt="" width={65} height={10} />
          <img src={arrow} alt="" width={16} height={16} style={{ transform: 'rotate(180deg)' }} />
        </div>
      </div>
      <div className="row-card__body">
        <div className="row-card__top">
          <div>
            <h3>{item.title}</h3>
            <p className="price">{item.price}</p>
          </div>
          <button
            type="button"
            className="fav"
            aria-label={item.favourite ? 'Remove from favorites' : 'Save to favorites'}
            onClick={() => onFav?.(item)}
          >
            <img src={heart} alt="" width={24} height={24} />
          </button>
        </div>
        <p className="loc">
          <img src={pin} alt="" width={11} height={14} />
          {item.location}
        </p>
        {item.type && (
          <div className="specs">
            <div>
              <img src={iconType} alt="" width={24} height={24} />
              <span>Type</span>
              <strong>{item.type}</strong>
            </div>
            <div>
              <img src={iconArea} alt="" width={24} height={24} />
              <span>Area</span>
              <strong>{item.area}</strong>
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
        )}
        <p className="desc">{item.description}</p>
        <Link to={to} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
          More Details
        </Link>
      </div>
    </article>
  )
}
