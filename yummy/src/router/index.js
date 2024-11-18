import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/ventanas/home.vue';
import RegistroUsuario from '@/ventanas/registro.vue';
import LogIn from '@/ventanas/login.vue';
import Reservas from '@/ventanas/reservas/Reservas.vue';
import Ofertas from '@/ventanas/ofertasPage.vue';
import PanelAdministrativo from '@/ventanas/panelAdministrativo.vue';

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
      name: 'RegistroUsuario',
      component: RegistroUsuario,
    },
    {
      path: '/reservas',
      name: 'Reservas',
      component: Reservas,
    },
    {
      path: '/ofertas',
      name: 'Ofertas',
      component: Ofertas,
    },
    {
      path: '/panelAdministrativo',
      name: 'PanelAdministrativo',
      component: PanelAdministrativo,
    },
  ],
});

export default router;
