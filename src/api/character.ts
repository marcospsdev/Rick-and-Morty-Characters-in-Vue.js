import axios from 'axios'
import type { ApiResponse, Character, CharacterFilters, Episode } from '@/types'

const API_URL = 'https://rickandmortyapi.com/api'

export const getCharacters = async (
  page: number,
  filters: CharacterFilters,
): Promise<ApiResponse<Character>> => {
  try {
    const response = await axios.get<ApiResponse<Character>>(`${API_URL}/character`, {
      params: {
        page,
        name: filters.name,
        status: filters.status,
        gender: filters.gender,
      },
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching characters: ${error.message}`)
    }
    throw new Error('An unknown error occurred while fetching characters.')
  }
}

export const getCharacterDetails = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get<Character>(`${API_URL}/character/${id}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching character details: ${error.message}. It may not exist.`)
    }
    throw new Error('An unknown error occurred while fetching character details.')
  }
}

export const getEpisodesByIds = async (ids: number[]): Promise<Episode[]> => {
  if (ids.length === 0) {
    return []
  }
  const episodeIds = ids.join(',')
  try {
    const response = await axios.get<Episode | Episode[]>(`${API_URL}/episode/${episodeIds}`)
    return Array.isArray(response.data) ? response.data : [response.data]
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching episodes: ${error.message}.`)
    }
    throw new Error('An unknown error occurred while fetching episodes.')
  }
}
