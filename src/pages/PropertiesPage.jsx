import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Filters from '../components/Filters'
import ListingPager from '../components/ListingPager'
import PropertyRow from '../components/PropertyRow'
import QueryState from '../components/QueryState'
import SearchBar from '../components/SearchBar'
import { paginate } from '../api/filterListings'
import { useAuthModal } from '../hooks/useAuthModal'
import { markFavourite, useListingFav } from '../hooks/useListingFav'
import { useUnits } from '../hooks/useUnits'

export default function PropertiesPage() {
  const [params, setParams] = useSearchParams()
  const { units, loading, error, needsAuth } = useUnits()
  const { toggleUnit } = useListingFav()
  const { openLogin } = useAuthModal()
  const [list, setList] = useState(null)
  const shown = list ?? units
  const page = Number(params.get('page') || 1)
  const { slice, last, page: current } = useMemo(() => paginate(shown, page), [shown, page])

  function setPage(next) {
    const copy = new URLSearchParams(params)
    copy.set('page', String(next))
    setParams(copy)
  }

  return (
    <div className="wrap">
      <p className="crumb">Home &gt; Properties</p>
      <SearchBar compact />
      <div className="listing-layout" style={{ marginTop: 24 }}>
        <Filters />
        <div>
          <div className="listing-title">
            <h2>Recently Featured Properties</h2>
            <p>{shown.length} Result</p>
          </div>
          <QueryState
            needsAuth={needsAuth}
            onLogin={openLogin}
            loading={loading}
            error={error}
            empty={!slice.length}
            emptyText="No units match this view."
          >
            {slice.map((item) => (
              <PropertyRow
                key={item.id}
                item={item}
                to={`/properties/${item.id}`}
                onFav={(unit) =>
                  toggleUnit(unit, (id, favourite) => setList(markFavourite(shown, id, favourite)))
                }
              />
            ))}
            <ListingPager page={current} last={last} onPage={setPage} />
          </QueryState>
        </div>
      </div>
    </div>
  )
}
