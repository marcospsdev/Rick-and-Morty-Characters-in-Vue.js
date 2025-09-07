import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const FAVORITES_STORAGE_KEY = 'favorites-list'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteIds = ref<number[]>(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]'))

  const isFavorite = (id: number): boolean => {
    return favoriteIds.value.includes(id)
  }

  const toggleFavorite = (id: number) => {
    const index = favoriteIds.value.indexOf(id)
    if (index === -1) {
      favoriteIds.value.push(id)
    } else {
      favoriteIds.value.splice(index, 1)
    }
  }

  watch(
    favoriteIds,
    (newValue) => {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newValue))
    },
    { deep: true },
  )

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
  }
})
