<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert type="error" outlined>{{ error }}</v-alert>
      </v-col>
    </v-row>

    <v-row v-else-if="character">
      <v-col cols="12" md="4" class="text-center">
        <v-img :src="character.image" class="rounded-circle" max-width="250" mx-auto></v-img>
        <h2 class="mt-4 text-h5">{{ character.name }}</h2>
        <v-btn
          :color="isFavorite(character.id) ? 'red' : 'grey-lighten-1'"
          class="mt-4"
          @click="toggleFavorite(character.id)"
        >
          <v-icon left>{{ isFavorite(character.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          Favorite
        </v-btn>
      </v-col>

      <v-col cols="12" md="8">
        <v-list dense>
          <v-list-item>
            <v-list-item-title>Status:</v-list-item-title>
            <v-list-item-subtitle>{{ character.status }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Species:</v-list-item-title>
            <v-list-item-subtitle>{{ character.species }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Gender:</v-list-item-title>
            <v-list-item-subtitle>{{ character.gender }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Origin:</v-list-item-title>
            <v-list-item-subtitle>{{ character.origin.name }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider class="my-4"></v-divider>

        <h3 class="text-h6">Episodes</h3>
        <v-list dense>
          <v-list-item v-for="episode in episodes" :key="episode.id">
            <v-list-item-title>{{ episode.episode }}: {{ episode.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCharacterDetails, getEpisodesByIds } from '@/api/character'
import { useFavoritesStore } from '@/stores/favorites'
import type { Character, Episode } from '@/types'

const route = useRoute()
const character = ref<Character | null>(null)
const episodes = ref<Episode[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const favoritesStore = useFavoritesStore()

const fetchDetails = async () => {
  loading.value = true
  error.value = null
  try {
    const id = parseInt(route.params.id as string)
    if (isNaN(id)) {
      error.value = 'Invalid character ID.'
      return
    }
    const characterData = await getCharacterDetails(id)
    character.value = characterData

    if (characterData.episode.length > 0) {
      const episodeIds = characterData.episode
        .map((url) => {
          const parts = url.split('/')
          return parseInt(parts[parts.length - 1])
        })
        .filter((id) => !isNaN(id))

      if (episodeIds.length > 0) {
        episodes.value = await getEpisodesByIds(episodeIds)
      }
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = e.message || 'Error fetching character details.'
    } else {
      error.value = 'An unknown error occurred.'
    }
  } finally {
    loading.value = false
  }
}

const isFavorite = (id: number) => {
  return favoritesStore.isFavorite(id)
}

const toggleFavorite = (id: number) => {
  favoritesStore.toggleFavorite(id)
}

onMounted(() => {
  fetchDetails()
})
</script>
