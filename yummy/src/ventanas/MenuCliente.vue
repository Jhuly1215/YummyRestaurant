<template>
  <div>
    <NavbarComponent />
    <CarouselComponent />
    
    <!-- Escucha el evento y almacena el ID de la categoría seleccionada -->
    <FiltroCategorias @categoriaSeleccionada="categoriaSeleccionada = $event" />

    <div class="main">
      <div class="cards">
        <!-- Filtra y muestra los platillos según la categoría seleccionada -->
        <CardMenu
          v-for="(platillo, index) in platillosFiltrados"
          :key="index"
          :imagen="platillo.imagen"
          :nombre="platillo.nombre"
          :descripcion="platillo.descripcion"
          :precio="platillo.precio"
        />
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';
import NavbarComponent from '@/components/Navbar.vue';
import FooterComponent from '@/components/Footer.vue';
import CardMenu from '@/components/CardMenu.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';
import FiltroCategorias from '@/components/FiltroCategorias.vue';

export default {
  name: 'MenuCliente',
  components: {
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    CardMenu,
    FiltroCategorias,
  },
  data() {
    return {
      platillos: [],
      categoriaSeleccionada: null // Guarda la categoría seleccionada
    };
  },
  computed: {
    // Filtra los platillos según la categoría seleccionada
    platillosFiltrados() {
      return this.categoriaSeleccionada
        ? this.platillos.filter(p => p.idcategoria === this.categoriaSeleccionada)
        : this.platillos;
    }
  },
  mounted() {
    this.obtenerPlatillos();
  },
  methods: {
    async obtenerPlatillos() {
      try {
        const response = await axios.get('http://localhost:5000/api/platillos');
        this.platillos = response.data;
      } catch (error) {
        console.error("Error al obtener los platillos:", error);
      }
    }
  }
};
</script>

<style scoped>
.main {
max-width: 1200px;
margin: 0 auto;
margin-top: 20px;
margin-bottom: 100px;
}

.cards {
display: flex;
flex-wrap: wrap;
gap: 20px;
justify-content: center;
}
@media (max-width: 768px) {
  .cards > * {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
