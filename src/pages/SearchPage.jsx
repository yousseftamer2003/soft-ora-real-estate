import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Filters from '../components/Filters'
import ListingPager from '../components/ListingPager'
import PropertyRow from '../components/PropertyRow'
import QueryState from '../components/QueryState'
import SearchBar from '../components/SearchBar'
import { filterUnits, paginate } from '../api/filterListings'
import { useAuthModal } from '../hooks/useAuthModal'
import { markFavourite, useListingFav } from '../hooks/useListingFav'
import { useUnits } from '../hooks/useUnits'

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const { units, loading, error, needsAuth } = useUnits()
  const { toggleUnit } = useListingFav()
  const { openLogin } = useAuthModal()
  const [list, setList] = useState(null)
  const location = params.get('location') || ''
  const type = params.get('type') || ''
  const price = params.get('price') || ''
  const page = Number(params.get('page') || 1)

  const filtered = useMemo(
    () => filterUnits(list ?? units, { location, type, price }),
    [list, units, location, type, price],
  )
  const { slice, last, page: current } = useMemo(() => paginate(filtered, page), [filtered, page])

  function setPage(next) {
    const copy = new URLSearchParams(params)
    copy.set('page', String(next))
    setParams(copy)
  }

  return (
    <div className="wrap">
      <p className="crumb">Home &gt; search result</p>
      <SearchBar compact />
      <div className="listing-layout" style={{ marginTop: 24 }}>
        <Filters showDevelopers />
        <div>
          <div className="listing-title">
            <h2>{location ? `Search Result in “${location}”` : 'Search Result'}</h2>
            <p>{filtered.length} Result</p>
          </div>
          <QueryState
            needsAuth={needsAuth}
            onLogin={openLogin}
            loading={loading}
            error={error}
            empty={!slice.length}
            emptyText="No units match those filters."
          >
            {slice.map((item) => (
              <PropertyRow
                key={item.id}
                item={item}
                to={`/properties/${item.id}`}
                onFav={(unit) =>
                  toggleUnit(unit, (id, favourite) => setList(markFavourite(list ?? units, id, favourite)))
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
