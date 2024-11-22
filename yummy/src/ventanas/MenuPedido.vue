<template>
  <div>
    <CarouselComponent />
    <ListaProductosPedidos
      :cantidadesSeleccionadas="cantidadesSeleccionadas"
      :platillos="platillos"
      @reiniciarCantidades="cantidadesSeleccionadas = {}"
    />

    <FiltroCategorias @categoriaSeleccionada="categoriaSeleccionada = $event" />

    <div class="main">
      <div class="cards">
        <CardMenuPedido
          v-for="platillo in platillosFiltrados"
          :key="platillo.idplato"
          :imagen="platillo.imagen"
          :nombre="platillo.nombre"
          :descripcion="platillo.descripcion"
          :precio="platillo.precio"
          :id="platillo.idplato"
          :cantidad="cantidadesSeleccionadas[platillo.idplato] || 0"
          @actualizarCantidad="actualizarCantidad"
        />
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';
import FooterComponent from '@/components/Footer.vue';
import CarouselComponent from '@/components/CarouselComponent.vue';
import FiltroCategorias from '@/components/FiltroCategorias.vue';
import CardMenuPedido from '@/components/CardMenuPedido.vue';
import ListaProductosPedidos from '@/components/ListaProductosPedidos.vue';

export default {
  name: 'MenuPedido',
  components: {
    FooterComponent,
    CarouselComponent,
    CardMenuPedido,
    FiltroCategorias,
    ListaProductosPedidos,
  },
  data() {
    return {
      platillos: [],
      categoriaSeleccionada: null,
      cargando: false,
      error: null,
      cantidadesSeleccionadas: {}, // Almacena las cantidades seleccionadas por ID de platillo
    };
  },
  computed: {
    platillosFiltrados() {
      return this.categoriaSeleccionada
        ? this.platillos.filter(p => p.idcategoria === this.categoriaSeleccionada)
        : this.platillos;
    },
  },
  mounted() {
    this.obtenerPlatillos();
  },
  methods: {
    async obtenerPlatillos() {
      this.cargando = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:5000/api/platillos');
        this.platillos = response.data;
      } catch (error) {
        console.error("Error al obtener los platillos:", error);
        this.error = "No se pudieron cargar los platillos. Por favor, intenta más tarde.";
      } finally {
        this.cargando = false;
      }
    },
    actualizarCantidad(idplato, cantidad) {
      // Actualiza la cantidad directamente
      this.cantidadesSeleccionadas = {
        ...this.cantidadesSeleccionadas,
        [idplato]: cantidad,
      };
    },
  },
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
