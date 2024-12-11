<template>
  <nav class="nav-container">
    <div class="navIzquierda">
      <img src="@/assets/images/logoprincipal.jpeg" alt="Imagen del logo" class="logo" style="width: 120px;" @click="goToHome">
      <h1>Tu lugar para compartir y disfrutar</h1>
      <div class="opciones">
        <a><router-link to="/ofertas">Ofertas</router-link></a>
        <a><router-link to="/menupedido">Realizar Pedido</router-link></a>
        <a v-if="isLoggedIn && isAdmin != 2"><router-link to="/mapa">Mapa Interactivo</router-link></a>
        <a><router-link to="/menu">Menu</router-link></a>
        <a v-if="isLoggedIn && isAdmin === 2">
          <router-link to="/panelAdministrativo">Panel Administrativo</router-link>
        </a>
        <a @click="handleAuthAction">
          <router-link v-if="!isLoggedIn" to="/iniciarsesion">Login</router-link>
          <span v-else>Cerrar sesión</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      isLoggedIn: false, // Estado de autenticación
      isAdmin: '', // Estado de autenticación
    };
  },
  mounted() {
    // Verifica si hay un token al cargar el componente
    this.isLoggedIn = !!localStorage.getItem('token');
    this.isAdmin = parseInt(localStorage.getItem("rol"), 10);
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    handleAuthAction() {
      if (this.isLoggedIn) {
        // Si el usuario está logueado, cerrar sesión
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('rol'); // Elimina el token del almacenamiento local
        this.isLoggedIn = false;
        this.$router.push('/'); // Redirige al Home después de cerrar sesión
      } else {
        // Si no está logueado, redirige al inicio de sesión
        this.$router.push('/iniciarsesion');
      }
    },
  },
};
</script>

<style scoped>
/* Estilos */
html, body {
  margin: 0;
  padding: 0;
}
.opciones {
  text-align: end;
}
.opciones a {
  padding-right: 3%;
  text-decoration: none;
  color: white;
}
.opciones a:hover {
  text-decoration: underline;
  color: black;
}
.navIzquierda h1 {
  color: aliceblue;
  font-size: 2vh;
  display: block;
  text-align: center;
  padding-right: 5%;
  padding-left: 5%;
}
.nav-container {
  background-color: #FE9900;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  top: 0;
  width: 100%;
}
.logo {
  width: 40px;
  margin-left: 0%;
  margin-right: 0;
  text-align: center;
}
</style>
