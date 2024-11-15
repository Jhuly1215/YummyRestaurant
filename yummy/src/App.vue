<template>
  <MenuPedido />
  
</template>

<script>
//import MenuCliente from './ventanas/MenuCliente.vue';
import MenuPedido from './ventanas/MenuPedido.vue';
//import HomePage from './ventanas/home.vue'
//import OfertasPage from './ventanas/ofertasPage.vue';

export default {
  name: 'App',
  components: {
    //OfertasPage,
    //HomePage,
    //MenuCliente,
    MenuPedido,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>