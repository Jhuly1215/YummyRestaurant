import { createRouter, createWebHistory } from 'vue-router'
import home from '@/ventanas/home.vue'
import loginView from '../ventanas/LoginView.vue'
import MenuCliente from '@/ventanas/MenuCliente.vue'
import ofertasPage from '@/ventanas/ofertasPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: home
      },
      {
        path: '/login',
        name: 'login',
        component: loginView
      },
      {
        path: '/menu',
        name: 'menu',
        component: MenuCliente
      },
      {
        path: '/ofertas',
        name: 'ofertas',
        component: ofertasPage
      },
    ]
  })
  
  export default router
  