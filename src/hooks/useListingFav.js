import { toggleCompoundFavourite, toggleUnitFavourite } from '../api/marketplace'
import { useAuth } from '../auth/AuthProvider'
import { useAuthModal } from './useAuthModal'

export function useListingFav() {
  const { isAuthed } = useAuth()
  const { openLogin } = useAuthModal()

  async function toggleUnit(item, onChanged) {
    if (!isAuthed) {
      openLogin()
      return
    }
    const favourite = item.favourite ? 0 : 1
    await toggleUnitFavourite(item.id, favourite)
    onChanged?.(item.id, Boolean(favourite))
  }

  async function toggleCompound(item, onChanged) {
    if (!isAuthed) {
      openLogin()
      return
    }
    const favourite = item.favourite ? 0 : 1
    await toggleCompoundFavourite(item.id, favourite)
    onChanged?.(item.id, Boolean(favourite))
  }

  return { toggleUnit, toggleCompound }
}

export function markFavourite(list, id, favourite) {
  return list.map((item) => (item.id === String(id) ? { ...item, favourite } : item))
}
