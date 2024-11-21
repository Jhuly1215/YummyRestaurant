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
      categoriaSeleccionada: null,
      cargando: false,
      error: null
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
    this.cargando = true; // Inicia el estado de carga
    this.error = null; // Limpia errores anteriores
    try {
      const response = await axios.get('http://localhost:5000/api/platillos');
      this.platillos = response.data;
    } catch (error) {
      console.error("Error al obtener los platillos:", error);
      this.error = "No se pudieron cargar los platillos. Por favor, intenta más tarde.";
    } finally {
      this.cargando = false; // Finaliza el estado de carga
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
  gap: 30px;
  justify-content: center;
}

.cards > * {
  flex: 1 1 calc(33.33% - 20px); /* 33.33% para tres tarjetas por fila, menos el espacio de gap */
  max-width: calc(33.33% - 20px); /* Para asegurar que no exceda el ancho */
}

@media (max-width: 768px) {
  .cards > * {
    flex: 1 1 100%;
    max-width: 90%;
  }
}

</style>
