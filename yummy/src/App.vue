<template>
<<<<<<< HEAD
  <NavbarComponent />
  <router-view />
  <FooterComponent />
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue';
import FooterComponent from '@/components/Footer.vue';
=======
  <OfertasPage />
</template>

<script>
//import HomePage from './ventanas/home.vue'
import OfertasPage from './ventanas/ofertasPage.vue';
>>>>>>> 1a53c5b7310993566963a62188f35dcafa1b799a

export default {
  name: 'App',
  components: {
<<<<<<< HEAD
    NavbarComponent,
    FooterComponent,
  },
};
=======
    OfertasPage,
    //HomePage,
  }
}
>>>>>>> 1a53c5b7310993566963a62188f35dcafa1b799a
</script>

<style>
body, #app {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>