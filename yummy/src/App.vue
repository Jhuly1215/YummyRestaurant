<template>
  <LoginView/>
</template>

<script>
//import HomePage from './ventanas/home.vue'
import LoginView from './ventanas/LoginView.vue'

export default {
  name: 'App',
  components: {
    LoginView,
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
