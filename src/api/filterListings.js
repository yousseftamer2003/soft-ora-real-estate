function priceNumber(item) {
  const raw = item.raw?.price ?? item.raw?.total_price ?? item.raw?.list_price
  const n = Number(raw)
  return Number.isNaN(n) ? null : n
}

export function filterUnits(units, { location, type, price } = {}) {
  return units.filter((item) => {
    if (location) {
      const hay = `${item.title} ${item.location} ${item.description}`.toLowerCase()
      if (!hay.includes(location.toLowerCase())) return false
    }
    if (type && String(item.type).toLowerCase() !== type.toLowerCase()) return false
    if (price) {
      const n = priceNumber(item)
      if (n == null) return true
      if (price === 'under5' && n >= 5_000_000) return false
      if (price === '5to10' && (n < 5_000_000 || n > 10_000_000)) return false
      if (price === '10plus' && n < 10_000_000) return false
    }
    return true
  })
}

export function paginate(items, page, perPage = 5) {
  const last = Math.max(1, Math.ceil(items.length / perPage) || 1)
  const current = Math.min(Math.max(1, page), last)
  const start = (current - 1) * perPage
  return { page: current, last, slice: items.slice(start, start + perPage) }
}
