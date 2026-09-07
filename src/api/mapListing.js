function pick(...values) {
  for (const value of values) {
    if (value == null || value === '') continue
    return value
  }
  return ''
}

function firstImage(record) {
  const images = record?.images ?? record?.unit_images ?? record?.photos
  if (Array.isArray(images) && images.length) {
    const first = images[0]
    if (typeof first === 'string') return first
    return pick(first?.url, first?.full_url, first?.path, first?.image)
  }
  if (typeof images === 'string') return images
  return pick(record?.image, record?.cover, record?.photo, record?.thumbnail)
}

function money(value) {
  if (value == null || value === '') return ''
  if (typeof value === 'string' && /[a-zA-Z]/.test(value)) return value
  const n = Number(value)
  if (Number.isNaN(n)) return String(value)
  return `EGP ${n.toLocaleString('en-EG')}`
}

export function mapUnit(unit) {
  const compound = unit.compound ?? unit.compounds ?? {}
  const developer = unit.developer ?? compound.developer ?? {}
  const type = unit.uptown_type ?? unit.type ?? unit.unit_type
  const typeName = typeof type === 'object' ? pick(type?.name, type?.title) : type
  return {
    id: String(unit.id),
    raw: unit,
    title: pick(unit.name, unit.title, unit.unit_name, unit.unit_number, 'Unit'),
    price: money(pick(unit.price, unit.total_price, unit.list_price, unit.current_price)),
    location: pick(
      unit.location,
      unit.area,
      compound.name,
      compound.area,
      developer.name,
      'Egypt',
    ),
    type: typeName || 'Unit',
    area: unit.space || unit.area_m2 || unit.area ? `${pick(unit.space, unit.area_m2, unit.area)} m²` : '',
    beds: pick(unit.rooms_no, unit.rooms, unit.bedrooms, '—'),
    baths: pick(unit.bathrooms_no, unit.bathrooms, unit.baths, '—'),
    description: pick(unit.description, unit.notes, unit.details, ''),
    image: firstImage(unit) || firstImage(compound),
    images: Array.isArray(unit.images)
      ? unit.images.map((img) => (typeof img === 'string' ? img : pick(img?.url, img?.full_url, img?.path))).filter(Boolean)
      : [],
    favourite: Boolean(unit.favourite ?? unit.is_favourite ?? unit.favorited),
  }
}

export function mapCompound(compound) {
  const units = compound.uptwons ?? compound.uptowns ?? compound.units ?? []
  const prices = units.map((u) => Number(u.price ?? u.total_price)).filter((n) => !Number.isNaN(n))
  const min = prices.length ? Math.min(...prices) : null
  const max = prices.length ? Math.max(...prices) : null
  const price =
    min != null && max != null && min !== max
      ? `From ${money(min)} - ${money(max)}`
      : money(pick(compound.price, min, compound.min_price))
  return {
    id: String(compound.id),
    raw: compound,
    title: pick(compound.name, compound.title, 'Project'),
    price,
    location: pick(compound.location, compound.area, compound.city, compound.developer?.name, 'Egypt'),
    description: pick(compound.description, compound.details, ''),
    image: firstImage(compound) || (units[0] ? firstImage(units[0]) : ''),
    favourite: Boolean(compound.favourite ?? compound.is_favourite),
    units: units.map(mapUnit),
  }
}

export function mapDeveloper(developer) {
  return {
    id: String(developer.id),
    raw: developer,
    title: pick(developer.name, developer.title, 'Developer'),
    image: firstImage(developer),
  }
}

export function displayName(user) {
  if (!user) return ''
  return pick(user.full_name, [user.first_name, user.last_name].filter(Boolean).join(' '), user.email, user.phone)
}
