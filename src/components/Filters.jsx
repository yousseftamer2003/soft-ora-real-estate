import { useState } from 'react'
import { developers, propertyTypes } from '../data/mock'

export default function Filters({ showDevelopers = false }) {
  const [beds, setBeds] = useState('3')
  const [baths, setBaths] = useState('2')

  return (
    <aside className="filters">
      <div className="filters__head">
        <span>Filters</span>
        <button type="button">Clear All</button>
      </div>
      <div className="filter-block" style={{ borderTop: 0, paddingTop: 0 }}>
        <h3>Property Type</h3>
        {propertyTypes.map((type) => (
          <label key={type}>
            <input type="checkbox" name="type" value={type} />
            {type}
          </label>
        ))}
      </div>
      <div className="filter-block">
        <h3>Price Range</h3>
        <div className="range-inputs">
          <input type="text" defaultValue="100" aria-label="Minimum price" />
          <input type="text" defaultValue="100" aria-label="Maximum price" />
        </div>
        <div className="range-track" aria-hidden="true" />
      </div>
      <div className="filter-block">
        <h3>Bedrooms</h3>
        <div className="chip-row">
          {['1', '2', '3', '4', '5', '6+'].map((n) => (
            <button
              key={n}
              type="button"
              className={beds === n ? 'chip active' : 'chip'}
              onClick={() => setBeds(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-block">
        <h3>Bathrooms</h3>
        <div className="chip-row">
          {['1', '2', '3', '4', '5', '6+'].map((n) => (
            <button
              key={n}
              type="button"
              className={baths === n ? 'chip active' : 'chip'}
              onClick={() => setBaths(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-block">
        <h3>Unit Area</h3>
        <div className="range-inputs">
          <input type="text" defaultValue="100" aria-label="Minimum area" />
          <input type="text" defaultValue="100" aria-label="Maximum area" />
        </div>
        <div className="range-track" aria-hidden="true" />
      </div>
      {showDevelopers && (
        <div className="filter-block">
          <h3>Developer</h3>
          {developers.map((name) => (
            <label key={name}>
              <input type="checkbox" name="developer" value={name} />
              {name}
            </label>
          ))}
        </div>
      )}
    </aside>
  )
}
