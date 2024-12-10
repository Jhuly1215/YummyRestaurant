import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/ventanas/home.vue';
import RegistroUsuario from '@/ventanas/registro.vue';
import LogIn from '@/ventanas/login.vue';
import Reservas from '@/ventanas/reservas/Reservas.vue';
import PanelAdministrativo from '@/ventanas/panelAdministrativo.vue';
import Recupera from '@/ventanas/recupera.vue';
import CambioPass from '@/ventanas/cambioPassword.vue';
import Ofertas from '@/ventanas/ofertasPage.vue';
import MapaInteractivo from '@/ventanas/mapaInteractivo.vue';
import MenuCliente from '@/ventanas/MenuCliente.vue'
import TemporalCalificacion from '@/ventanas/temporalCalificacion.vue'

//para el administrador

import OfertasAdminComponent from '../ventanas/OfertasAdminComponent.vue'
import PlatillosAdminComponent from '@/components/PlatillosAdminComponent.vue';
import JReservasAdminComponent from '@/ventanas/reservas/Reservas.vue';
import UsuariosAdminComponent from '../ventanas/UsuariosAdminComponent.vue';
import DashboardComponent from '../ventanas/dashboardComponent.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/ofertas',
      name: 'Ofertas',
      component: Ofertas,
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
      path: '/menu',
      name: 'Menu',
      component: MenuCliente,
    },
    {
      path: '/recupera',
      name: 'Recupera',
      component: Recupera,
    },
    {
      path: '/cambioPass/:id',
      name: 'CambioPassword',
      component: CambioPass,
    },
    {
      path: '/mapa',
      name: 'Mapa',
      component: MapaInteractivo,
    },
    {
      path: '/temporal',
      name: 'Calificaciones',
      component: TemporalCalificacion,
    },

    //Para el Panel Administrativo
    {
      path: '/panelAdministrativo',
      name: 'PanelAdministrativo',
      component: PanelAdministrativo,
      //meta: { requiresAuth: true }, // Requiere autenticación
      children: [
        {
          path: 'dashboard', // Ruta base de panel administrativo
          name: 'Dashboard',
          component: DashboardComponent, // Componente del Dashboard
        },
        {
          path: 'ofertas',
          name: 'AdminOfertas',
          component: OfertasAdminComponent, // Gestión de ofertas
        },
        {
          path: 'usuarios',
          name: 'AdminUsuarios',
          component: UsuariosAdminComponent, // Gestión de ofertas
        },
        {
          path: 'platillos',
          name: 'AdminPlatillos',
          component: PlatillosAdminComponent, // Gestión de platillos
        },
        {
          path: 'reservas',
          name: 'AdminReservas',
          component: JReservasAdminComponent, // Gestión de reservas
        },
      ],
    },
  ],
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'LogIn' });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
