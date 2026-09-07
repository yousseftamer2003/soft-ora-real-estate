import QueryState from '../components/QueryState'
import PropertyRow from '../components/PropertyRow'
import { useFavourites } from '../hooks/useFavourites'
import { useAuthModal } from '../hooks/useAuthModal'

export default function FavoritesPage() {
  const { units, compounds, loading, error, needsAuth, toggleUnit, toggleCompound } = useFavourites()
  const { openLogin } = useAuthModal()
  const total = units.length + compounds.length

  return (
    <div className="wrap">
      <p className="crumb">Home &gt; My Fav</p>
      <div className="listing-title">
        <h2>My Favorites</h2>
        <p>{total} saved</p>
      </div>
      <QueryState
        needsAuth={needsAuth}
        onLogin={openLogin}
        loading={loading}
        error={error}
        empty={!total}
        emptyText="You have not saved any listings yet."
      >
        {units.map((item) => (
          <PropertyRow
            key={`u-${item.id}`}
            item={item}
            to={`/properties/${item.id}`}
            onFav={() => toggleUnit(item.id, false)}
          />
        ))}
        {compounds.map((item) => (
          <PropertyRow
            key={`c-${item.id}`}
            item={item}
            to={`/projects/${item.id}`}
            onFav={() => toggleCompound(item.id, false)}
          />
        ))}
      </QueryState>
    </div>
  )
}
