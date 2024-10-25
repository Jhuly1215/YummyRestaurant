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
.nav-container {
  background-color: #FE9900; /* Color principal de la barra de navegación */
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.logo {
  width: 80px;
  margin-left: 2%;
  margin-right: 0;
}


</style>
