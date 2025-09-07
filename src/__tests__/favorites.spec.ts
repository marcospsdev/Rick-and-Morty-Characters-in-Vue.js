import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'

const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(global, 'localStorage', { value: mockLocalStorage })

describe('Favorites Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('should initialize with an empty list of favorites', () => {
    const store = useFavoritesStore()
    expect(store.favoriteIds.length).toBe(0)
  })

  it('should add a character to favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(1)
    expect(store.favoriteIds).toContain(1)
    expect(store.isFavorite(1)).toBe(true)
  })

  it('should remove a character from favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(1)
    expect(store.favoriteIds).toContain(1)
    store.toggleFavorite(1)
    expect(store.favoriteIds).not.toContain(1)
    expect(store.isFavorite(1)).toBe(false)
  })
})
