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
import MenuCliente from '@/ventanas/MenuCliente.vue';
import MenuPedido from '@/ventanas/MenuPedido.vue';
import PedidosAdmin from '@/ventanas/PedidosAdmin.vue';


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
      path: '/panelAdministrativo',
      name: 'PanelAdministrativo',
      component: PanelAdministrativo,
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
      path: '/pedidosadmin',
      name: 'PedidosAdmin',
      component: PedidosAdmin,
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
