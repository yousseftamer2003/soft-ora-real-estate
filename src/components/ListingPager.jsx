export default function ListingPager({ page, last, onPage }) {
  if (last <= 1) return null
  const numbers = Array.from({ length: Math.min(5, last) }, (_, i) => i + 1)
  return (
    <div className="pagination" aria-label="Pagination">
      <button type="button" onClick={() => onPage(1)} disabled={page === 1}>
        {'<<'}
      </button>
      <button type="button" onClick={() => onPage(page - 1)} disabled={page === 1}>
        {'<'}
      </button>
      {numbers.map((n) => (
        <button key={n} type="button" className={n === page ? 'active' : ''} onClick={() => onPage(n)}>
          {n}
        </button>
      ))}
      <button type="button" onClick={() => onPage(page + 1)} disabled={page === last}>
        {'>'}
      </button>
      <button type="button" onClick={() => onPage(last)} disabled={page === last}>
        {'>>'}
      </button>
    </div>
  )
}
