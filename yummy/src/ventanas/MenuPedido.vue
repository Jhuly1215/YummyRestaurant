<template>
  <div>
    <CarouselComponent />
    <ListaProductosPedidos
      :cantidadesSeleccionadas="cantidadesSeleccionadas"
      :platillos="platillos"
      @pedidoRealizado="mostrarSuccessModal"
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

    <!-- Modal de éxito -->
    <SuccessModal
      v-if="successModalVisible"
      :mensaje="successMensaje"
      @onClose="closeSuccessModal"
    />

    <!-- Modal de calificación -->
    <ExpCalificacion
      :show="isModalOpen"
      @close="closeModal"
      @submitted="handleSubmitted"
    />
  </div>
</template>

<script>
import axios from "axios";
import FooterComponent from "@/components/Footer.vue";
import CarouselComponent from "@/components/CarouselComponent.vue";
import FiltroCategorias from "@/components/FiltroCategorias.vue";
import CardMenuPedido from "@/components/CardMenuPedido.vue";
import ListaProductosPedidos from "@/components/ListaProductosPedidos.vue";
import SuccessModal from "@/components/SuccessModal.vue";
import ExpCalificacion from "@/components/ExpCalificacion.vue";

export default {
  name: "MenuPedido",
  components: {
    FooterComponent,
    CarouselComponent,
    CardMenuPedido,
    FiltroCategorias,
    ListaProductosPedidos,
    SuccessModal,
    ExpCalificacion,
  },
  data() {
    return {
      platillos: [],
      categoriaSeleccionada: null,
      cargando: false,
      error: null,
      cantidadesSeleccionadas: {}, // Almacena las cantidades seleccionadas por ID de platillo
      successModalVisible: false,
      successMensaje: "",
      isModalOpen: false, // Controla la visibilidad del modal de calificación
    };
  },
  computed: {
    platillosFiltrados() {
      return this.categoriaSeleccionada
        ? this.platillos.filter((p) => p.idcategoria === this.categoriaSeleccionada)
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
    reiniciarCantidades() {
      this.cantidadesSeleccionadas = {};
    },
    mostrarSuccessModal() {
      this.successModalVisible = true;
      this.successMensaje = "¡Pedido realizado exitosamente!";
    },
    closeSuccessModal() {
      this.successModalVisible = false;
      this.openModal(); // Abrir modal de calificación al cerrar el modal de éxito
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleSubmitted(rating) {
      console.log("Calificación enviada:", rating);
      this.closeModal();
      alert(`¡Gracias por calificar con ${rating} estrellas!`);
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
