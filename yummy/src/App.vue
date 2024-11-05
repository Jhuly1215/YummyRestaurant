<template>
  <!--<HomePage/>-->
  <MenuPedido/>
</template>

<script>
//import HomePage from './ventanas/home.vue'
//import MenuCliente from './ventanas/MenuCliente.vue';
import MenuPedido from './ventanas/MenuPedido.vue';

export default {
  name: 'App',
  components: {
    //HomePage,
    //MenuCliente,
    MenuPedido
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
