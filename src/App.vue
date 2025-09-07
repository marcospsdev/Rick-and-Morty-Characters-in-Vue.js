<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Rick and Morty App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Characters</v-btn>
      <v-btn text to="/favorites">Favorites</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
