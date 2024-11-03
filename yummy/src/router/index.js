import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/ventanas/home.vue';
import Registro from '@/ventanas/registro.vue';
import LogIn from '@/ventanas/login.vue';

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
  ],
});

export default router;