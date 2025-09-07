<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 text-center">Rick and Morty Characters</h1>
        <v-divider class="my-4"></v-divider>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="filters.name"
          label="Filter by Name"
          outlined
          dense
          clearable
          @input="setFilters({ name: filters.name })"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="filters.status"
          label="Filter by Status"
          :items="['Alive', 'Dead', 'Unknown']"
          outlined
          dense
          clearable
          @update:model-value="setFilters({ status: filters.status })"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="filters.gender"
          label="Filter by Gender"
          :items="['Female', 'Male', 'Genderless', 'Unknown']"
          outlined
          dense
          clearable
          @update:model-value="setFilters({ gender: filters.gender })"
        ></v-select>
      </v-col>
    </v-row>

    <v-row v-if="loading">
      <v-col cols="12">
        <v-skeleton-loader type="card-avatar" v-for="n in 6" :key="n"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else-if="error">
      <v-col cols="12">
        <v-alert type="error" outlined>{{ error }}</v-alert>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="character in characters" :key="character.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="pa-2">
          <router-link :to="`/characters/${character.id}`">
            <v-img :src="character.image" height="200px" class="rounded-lg"></v-img>
          </router-link>
          <v-card-title>{{ character.name }}</v-card-title>
          <v-card-subtitle> {{ character.species }} - {{ character.status }} </v-card-subtitle>
          <v-card-actions>
            <v-btn
              :color="isFavorite(character.id) ? 'red' : 'grey-lighten-1'"
              icon
              @click="toggleFavorite(character.id)"
            >
              <v-icon>{{ isFavorite(character.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="auto">
        <v-btn @click="prevPage" :disabled="currentPage === 1" class="mx-2"> Previous </v-btn>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <v-btn @click="nextPage" :disabled="currentPage >= totalPages" class="mx-2"> Next </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharacters } from '@/composables/useCharacters'
import { useFavoritesStore } from '@/stores/favorites'

const {
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
} = useCharacters()

const favoritesStore = useFavoritesStore()

const isFavorite = (id: number) => {
  return favoritesStore.isFavorite(id)
}

const toggleFavorite = (id: number) => {
  favoritesStore.toggleFavorite(id)
}

onMounted(() => {
  fetchCharacters()
})
</script>
