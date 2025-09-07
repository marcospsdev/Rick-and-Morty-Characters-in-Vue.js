import { ref } from 'vue'
import { getCharacters } from '@/api/character'
import type { Character, CharacterFilters } from '@/types'

export const useCharacters = () => {
  const characters = ref<Character[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const currentPage = ref<number>(1)
  const totalPages = ref<number>(1)
  const filters = ref<CharacterFilters>({
    name: '',
    status: '',
    gender: '',
  })

  const fetchCharacters = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await getCharacters(currentPage.value, filters.value)
      characters.value = data.results
      totalPages.value = data.info.pages
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = 'An unknown error has occurred.'
      }
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: Partial<CharacterFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchCharacters()
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      fetchCharacters()
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      fetchCharacters()
    }
  }

  return {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    fetchCharacters,
    setFilters,
    nextPage,
    prevPage,
  }
}
