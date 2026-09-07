import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import ProjectCard from '../components/ProjectCard'
import QueryState from '../components/QueryState'
import { whyChoose } from '../data/mock'
import { useUnits } from '../hooks/useUnits'
import { useProjects } from '../hooks/useProjects'
import { useHomepage } from '../hooks/useHomepage'
import { useListingFav, markFavourite } from '../hooks/useListingFav'
import { useAuthModal } from '../hooks/useAuthModal'
import arrow from '../assets/figma/arrow-up.svg'
import arrowWhite from '../assets/figma/arrow-up-white.svg'
import loc from '../assets/figma/loc-filled.svg'
import network from '../assets/figma/icon-network.svg'
import insights from '../assets/figma/icon-insights.svg'
import support from '../assets/figma/icon-support.svg'
import invest from '../assets/figma/icon-invest.svg'

const whyIcons = { network, insights, support, invest }

function featuredFromAds(ads) {
  const ad = ads[0]
  if (!ad) return null
  return {
    label: 'Featured Property',
    title: ad.title || ad.name || 'Featured listing',
    subtitle: ad.subtitle || ad.tagline || ad.headline || '',
    detail: ad.description || ad.details || ad.body || '',
    location: ad.location || ad.area || ad.city || '',
  }
}

export default function HomePage() {
  const { units, loading: unitsLoading, error: unitsError, needsAuth } = useUnits()
  const { projects, loading: projectsLoading, error: projectsError } = useProjects()
  const { ads, loading: adsLoading, error: adsError } = useHomepage()
  const { toggleUnit, toggleCompound } = useListingFav()
  const { openLogin } = useAuthModal()
  const [unitList, setUnitList] = useState(null)
  const [projectList, setProjectList] = useState(null)

  const shownUnits = unitList ?? units
  const shownProjects = projectList ?? projects
  const featured = featuredFromAds(ads)

  return (
    <>
      <section className="hero">
        <div>
          <h1>Find Your Dream Home Today</h1>
          <SearchBar />
        </div>
      </section>

      <div className="wrap section">
        <div className="section-head">
          <h2>Special Properties Offers</h2>
          <Link to="/properties" className="link-more">
            View more properties
            <img src={arrow} alt="" width={24} height={24} />
          </Link>
        </div>
        <QueryState
          needsAuth={needsAuth}
          onLogin={openLogin}
          loading={unitsLoading}
          error={unitsError}
          empty={!shownUnits.length}
          emptyText="No units are available yet."
        >
          <div className="card-grid">
            {shownUnits.slice(0, 4).map((item) => (
              <PropertyCard
                key={item.id}
                item={item}
                onFav={(unit) =>
                  toggleUnit(unit, (id, favourite) =>
                    setUnitList(markFavourite(shownUnits, id, favourite)),
                  )
                }
              />
            ))}
          </div>
        </QueryState>
      </div>

      {featured ? (
        <div className="wrap section">
          <article className="featured">
            <div>
              <p className="featured__label">{featured.label}</p>
              <h2>{featured.title}</h2>
              <p>{featured.subtitle}</p>
            </div>
            <div>
              <p>{featured.detail}</p>
              {featured.location ? (
                <p className="loc" style={{ color: '#fff', marginTop: 8 }}>
                  <img src={loc} alt="" width={16} height={16} />
                  {featured.location}
                </p>
              ) : null}
            </div>
            <div className="dots-bar" aria-hidden="true">
              {ads.slice(0, 5).map((ad, index) => (
                <button key={ad.id ?? index} type="button" className={index === 0 ? 'dot active' : 'dot'} />
              ))}
            </div>
          </article>
        </div>
      ) : adsLoading || adsError ? (
        <div className="wrap section">
          <QueryState loading={adsLoading} error={adsError} />
        </div>
      ) : null}

      <div className="wrap section">
        <div className="section-head">
          <h2>Special Projects</h2>
          <Link to="/projects" className="link-more">
            View more projects
            <img src={arrow} alt="" width={24} height={24} />
          </Link>
        </div>
        <QueryState
          needsAuth={needsAuth}
          onLogin={openLogin}
          loading={projectsLoading}
          error={projectsError}
          empty={!shownProjects.length}
          emptyText="No projects are available yet."
        >
          <div className="card-grid">
            {shownProjects.slice(0, 4).map((item) => (
              <ProjectCard
                key={item.id}
                item={item}
                onFav={(project) =>
                  toggleCompound(project, (id, favourite) =>
                    setProjectList(markFavourite(shownProjects, id, favourite)),
                  )
                }
              />
            ))}
          </div>
        </QueryState>
      </div>

      <div className="wrap section why">
        <h2 className="center-title">Why Choose Us</h2>
        <div className="why-grid">
          {whyChoose.map((item) => (
            <article key={item.title} className="why-card">
              <h3>
                <img src={whyIcons[item.icon]} alt="" width={24} height={24} />
                {item.title}
              </h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <Link to="/about" className="btn-accent lg">
          About Us
          <img src={arrowWhite} alt="" width={24} height={24} />
        </Link>
      </div>
    </>
  )
}
