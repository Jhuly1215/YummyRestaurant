import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../ventanas/login.vue'
import HomeView from '../ventanas/home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/login',
        name: 'login',
        component: LoginForm
      },
    ]
  })
  
  export default router
  