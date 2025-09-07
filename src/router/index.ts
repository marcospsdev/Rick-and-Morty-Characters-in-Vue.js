import { createRouter, createWebHistory } from 'vue-router'
import CharacterList from '@/views/CharacterList.vue'
import CharacterDetails from '@/views/CharacterDetails.vue'
import FavoritesList from '@/views/FavoritesList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: CharacterList,
    },
    {
      path: '/characters/:id',
      name: 'details',
      component: CharacterDetails,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesList,
    },
  ],
})

export default router
