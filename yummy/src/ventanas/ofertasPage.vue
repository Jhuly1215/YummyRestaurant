<template>
  <div>
    <NavbarComponent />
    <CarouselComponent />
    <AdminPanelComponent />

    <div class="main">
      <ul class="cards">
        <FlipCardComponent v-for="oferta in ofertas" :key="oferta.idOferta"
          :imageSrc="'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fast-food-restaurant-promotion-instagram-design-template-3c57e4999f03ed938f5255b37402bd63_screen.jpg?ts=1664730283'"
          :title="oferta.descripcion" :requirement="oferta.requerimiento" :discount="oferta.descuento"
          :date="oferta.fecha_inicio" />
      </ul>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';

import NavbarComponent from '@/components/Navbar.vue';
import FooterComponent from '@/components/Footer.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';
import FlipCardComponent from '@/components/FlipCardComponent.vue';
import AdminPanelComponent from '@/components/AdminPanelComponent.vue';

export default {
  name: "OfertasPage",
  components: {
    NavbarComponent,
    FooterComponent,
    FlipCardComponent,
    CarouselComponent,
    AdminPanelComponent,
  },
  data() {
    return {
      ofertas: []
    };
  },
  mounted() {
    this.obtenerOfertas();
  },
  methods: {
    async obtenerOfertas() {
      try {
        const response = await axios.get('http://localhost:5000/api/ofertas');
        const data = response.data;

        this.ofertas = Array.isArray(data) ? data : [data];
      } catch (error) {
        console.error("Error al obtener las ofertas:", error);
        if (error.response) {
          console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
        } else {
          console.error("Error al configurar la solicitud:", error.message);
        }
      }
    }
  }
};
</script>

<style scoped>
.content {
  padding: 20px 10px;
  text-align: center;
  background-color: white;
}

body {
  font-family: "Oxygen", sans-serif;
  color: #050505;
  background-image: url('https://b2090723.smushcdn.com/2090723/wp-content/uploads/2019/03/DSC_0614.jpg?lossy=0&strip=0&webp=1');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.title-fade {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 90%; /* Reduce ancho en pantallas pequeñas */
  color: white;
  opacity: 0;
  animation: fadeIn 3s ease-in-out forwards;
  z-index: 10;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 75px;
  margin-bottom: 100px;
  padding: 0 20px; /* Padding en ambos lados para pantallas pequeñas */
}

.title-fade h1 {
  font-family: "EB Garamond";
  font-size: 5rem; /* Tamaño de fuente más pequeño en pantallas pequeñas */
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center; /* Centra las tarjetas */
}

.cards_item {
  width: 100%;
  margin-bottom: 20px;
}

@media (min-width: 40rem) {
  .cards_item {
    width: 50%; /* 2 columnas en pantallas medianas */
  }
}

@media (min-width: 56rem) {
  .cards_item {
    width: 33.3333%; /* 3 columnas en pantallas grandes */
  }
}

@media (max-width: 600px) {
  /* Ajustes para pantallas pequeñas */
  .title-fade h1 {
    font-size: 3.5rem; /* Reduce el tamaño del título en pantallas pequeñas */
  }

  .floating-button {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  .carousel-component,
  .navbar-component,
  .footer-component {
    padding: 10px; /* Reduce el padding para componentes en pantallas pequeñas */
  }

  .offers-table th, .offers-table td {
    padding: 5px;
    font-size: 0.9rem;
  }
}

hr {
  margin: 24px auto;
  width: 50px;
  border-top: 2px solid #c89b3f;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
