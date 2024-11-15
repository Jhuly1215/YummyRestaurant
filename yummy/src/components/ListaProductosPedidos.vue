<template>
  <div>
    <button class="floating-button" @click="toggleModal">
      <i class="fas fa-utensils"></i>
    </button>
    <transition name="fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="toggleModal">
        <div class="modal-content">
          <div class="side-menu">
            <h2>Tu Pedido</h2>
            <ul v-if="platillosSeleccionados.length">
              <li v-for="platillo in platillosSeleccionados" :key="platillo.idplato">
                {{ platillo.nombre }} - {{ platillo.precio }} Bs. x {{ platillo.cantidad }} = {{ platillo.total }} Bs.
              </li>
            </ul>
            <p v-else>No hay productos seleccionados</p>
          </div>
          <button class="close-button" @click="toggleModal">Cerrar</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ListaProductosPedidos",
  props: {
    cantidadesSeleccionadas: {
      type: Object,
      required: true,
    },
    platillos: {
      type: Array,
      required: true,
    },
  },
  computed: {
    platillosSeleccionados() {
      // Filtra solo los platillos con cantidades mayores a cero
      return this.platillos
        .filter(p => this.cantidadesSeleccionadas[p.idplato] > 0)
        .map(p => ({
          ...p,
          cantidad: this.cantidadesSeleccionadas[p.idplato],
          total: this.cantidadesSeleccionadas[p.idplato] * p.precio,
        }));
    },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
};
</script>

<style scoped>
.floating-button {
  position: fixed;
  top: 40px;
  right: 0px;
  background-color: #322209;
  color: white;
  border: none;
  border-radius: 50% 0 0 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  width: 70%;
  background-color: #FFFEDC;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  padding: 20px;
}

.side-menu {
  background-color: #FFFEDC;
  color: white;
  padding: 20px;
  border-radius: 8px;
}

.side-menu h2 {
  margin-top: 0;
  color: #724A0E;
  text-align: center;
}

.side-menu ul {
  list-style: none;
  padding: 0;
}

.side-menu li {
  margin: 10px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.side-menu i {
  margin-right: 10px;
}

.close-button {
  background-color: #ccc;
  color: black;
  border: none;
  padding: 10px;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
}

.close-button:hover {
  background-color: #807f7f;
}

/* Animación para mostrar el modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
