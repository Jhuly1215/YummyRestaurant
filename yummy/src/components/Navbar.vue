<template>
  <nav class="nav-container">
      <div class="navIzquierda">
        <img src="@/assets/images/logoprincipal.jpeg" alt="Imagen del logo" class="logo" style="width: 120px;">
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

/* Estilos del contenedor del navbar */
.nav-container {
  background-color: #FE9900; /* Color principal de la barra de navegación */
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed; /* Fija el navbar en la parte superior */
  top: 0;
  width: 100%; /* Asegura que ocupe todo el ancho */
  z-index: 1000; /* Asegura que esté sobre otros elementos */
}

/* Ajustes para la imagen del logo */
.logo {
  width: 120px; /* Ajuste de tamaño del logo */
  margin-left: 2%;
  margin-right: 0;
}

/* Añadir margen superior al contenido debajo del navbar */
.content {
  margin-top: 50px; /* Ajusta según la altura del navbar */
}
</style>

