<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 text-center">My Favorite Characters</h1>
        <v-divider class="my-4"></v-divider>
      </v-col>
    </v-row>

    <v-row v-if="favoriteCharacters.length === 0">
      <v-col cols="12" class="text-center">
        <v-alert type="info" outlined> You don't have any favorite characters yet. </v-alert>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="character in favoriteCharacters"
        :key="character.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="pa-2">
          <router-link :to="`/characters/${character.id}`">
            <v-img :src="character.image" height="200px" class="rounded-lg"></v-img>
          </router-link>
          <v-card-title>{{ character.name }}</v-card-title>
          <v-card-subtitle> {{ character.species }} - {{ character.status }} </v-card-subtitle>
          <v-card-actions>
            <v-btn color="red" icon @click="toggleFavorite(character.id)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { getCharacterDetails } from '@/api/character'
import type { Character } from '@/types'

const favoritesStore = useFavoritesStore()
const favoriteCharacters = ref<Character[]>([])
const loading = ref(true)

const fetchFavorites = async () => {
  loading.value = true
  const ids = favoritesStore.favoriteIds
  const fetchedCharacters: Character[] = []

  for (const id of ids) {
    try {
      const character = await getCharacterDetails(id)
      fetchedCharacters.push(character)
    } catch (e) {
      console.error(`Error fetching favorite character with ID ${id}:`, e)
    }
  }

  favoriteCharacters.value = fetchedCharacters
  loading.value = false
}

const toggleFavorite = (id: number) => {
  favoritesStore.toggleFavorite(id)
}

watch(
  () => favoritesStore.favoriteIds,
  () => {
    fetchFavorites()
  },
)

onMounted(() => {
  fetchFavorites()
})
</script>
