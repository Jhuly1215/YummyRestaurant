<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/ventanas/home.vue';
import Registro from '@/ventanas/registro.vue';
import LogIn from '@/ventanas/login.vue';
import Reservas from '@/ventanas/reservas/Reservas.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/iniciarsesion',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Registro,
    },
    {
        path: '/reservas',
        name: 'Reservas',
        component: Reservas,
    },
  ],
});

export default router;
=======
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
  
>>>>>>> 1a53c5b7310993566963a62188f35dcafa1b799a
