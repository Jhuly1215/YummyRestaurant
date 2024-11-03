import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../ventanas/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/login',
        name: 'login',
        component: loginView
      },
    ]
  })
  
  export default router
  