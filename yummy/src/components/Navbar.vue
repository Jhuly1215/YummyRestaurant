<template>
  <nav class="nav-container">
      <div class="navIzquierda">
        <img src="@/assets/images/logoprincipal.jpeg" alt="Imagen del logo" class="logo" style="width: 120px;" @click="goToHome">
        <h1>Tu lugar para compartir y disfrutar</h1>
        <div class="opciones">
          <a><router-link to="/ofertas">Ofertas</router-link></a>
          <a><router-link to="/iniciarsesion">Login</router-link></a>
          <a><router-link to="/registro">Registrarse</router-link></a>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      isLoggedIn: false, // Simulación de estado de login
    };
  },
  methods: {
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    },
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>

/* Reiniciar márgenes y padding globales */
html, body {
  margin: 0;
  padding: 0;
}
.opciones {
  text-align: end;
}

.opciones a{
  padding-right: 3%;
  text-decoration: none;
  color: white;
}

.opciones a:hover{
  text-decoration: underline;
  color: black;
}

.navIzquierda h1{
    color: aliceblue;
    font-size: 2vh;
    display: block;
    text-align: center;
    padding-right: 5%;
    padding-left: 5%;
}

/* Estilos del contenedor del navbar */
.nav-container {
  background-color: #FE9900; /* Color principal de la barra de navegación */
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   /* position: fixed;position: fixed;   Fija el navbar en la parte superior */
  top: 0;
  width: 100%; /* Asegura que ocupe todo el ancho */
   /*z-index: 1000;  Asegura que esté sobre otros elementos */
}

/* Ajustes para la imagen del logo */
.logo {
  width: 40px; /* Ajuste de tamaño del logo */
  margin-left: 0%;
  margin-right: 0;
  text-align: center;
}

/* Añadir margen superior al contenido debajo del navbar */
</style>

