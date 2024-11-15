import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/ventanas/home.vue';
import RegistroUsuario from '@/ventanas/registro.vue';
import LogIn from '@/ventanas/login.vue';
import Reservas from '@/ventanas/reservas/Reservas.vue';
import Recupera from '@/ventanas/recupera.vue';
import CambioPass from '@/ventanas/cambioPassword.vue';
import Ofertas from '@/ventanas/ofertasPage.vue';
import MapaInteractivo from '@/ventanas/mapaInteractivo.vue';



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
  ],
});

// Guardia global de navegación
router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');  // O usa Vuex si prefieres
    if (!token) {
      // Si no hay token, redirige a la página de login
      next({ name: 'LogIn' });
    } else {
      // Si hay token, deja pasar
      next();
    }
  } else {
    // Si no requiere autenticación, deja pasar
    next();
  }
});
export default router;
