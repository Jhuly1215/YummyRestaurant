import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/ventanas/home.vue';
import RegistroUsuario from '@/ventanas/registro.vue';
import LogIn from '@/ventanas/login.vue';
import Reservas from '@/ventanas/reservas/Reservas.vue';
import PanelAdministrativo from '@/ventanas/panelAdministrativo.vue';
import Recupera from '@/ventanas/recupera.vue';
import CambioPass from '@/ventanas/cambioPassword.vue';
import Ofertas from '@/ventanas/ofertasPage.vue';

import MenuPedido from '@/ventanas/MenuPedido.vue';
import PedidosAdmin from '@/ventanas/PedidosAdmin.vue';

import MapaInteractivo1 from '@/ventanas/mapaInteractivo.vue';

import MenuCliente from '@/ventanas/MenuCliente.vue'
import TemporalCalificacion from '@/ventanas/temporalCalificacion.vue'

//para el administrador

import MapaInteractivo2 from '@/ventanas/mapaAdmin.vue';
import OfertasAdminComponent from '../ventanas/OfertasAdminComponent.vue'
import PlatillosAdminComponent from '@/components/PlatillosAdminComponent.vue';
import JReservasAdminComponent from '@/ventanas/reservas/Reservas.vue';
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
      name: 'MapaUsuario',
      component: MapaInteractivo1,
    },
    {
      path: '/menucliente',
      name: 'MenuCliente',
      component: MenuCliente,
    },
    {
      path: '/menupedido',
      name: 'MenuPedido',
      component: MenuPedido,
    },
    
    {
      path: '/temporal',
      name: 'Calificaciones',
      component: TemporalCalificacion,
    },

   {
    path: '/panelAdministrativo',
    name: 'PanelAdministrativo',
    component: PanelAdministrativo,
    children: [
      {
        path: 'section1',
        name: 'Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'ofertas',
        name: 'AdminOfertas',
        component: OfertasAdminComponent,
      },
      {
        path: 'platillos',
        name: 'AdminPlatillos',
        component: PlatillosAdminComponent,
      },
      {
        path: 'reservas',
        name: 'AdminReservas',
        component: JReservasAdminComponent,
      },
      {
        path: 'mapa',
        name: 'MapaAdmin',
        component: MapaInteractivo2,
      },
      {
        path: 'pedidosadmin',
        name: 'PedidosAdmin',
        component: PedidosAdmin,
      },
    ],
  },
  ],
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const rol = parseInt(localStorage.getItem('rol'), 10);

  /*if (to.name === 'PanelAdministrativo' && (!token || rol !== 2)) {
    next('/iniciarsesion'); // Redirige al inicio de sesión si no es admin
  } else */if (to.name === 'Reservas' && !token) {
    next('/iniciarsesion'); // Redirige al inicio de sesión si no está logueado
  } else if (to.name === 'MapaAdmin' && (!token || rol !== 2)) {
    next('/iniciarsesion'); // Protege el mapa del admin
  }else if (to.name === 'MapaUsuario' && (!token || rol !== 2)) {
    next('/iniciarsesion'); // Protege el mapa del admin
  }   else {
    next();
  }
});

export default router;
