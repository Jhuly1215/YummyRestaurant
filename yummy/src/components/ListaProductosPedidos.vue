<template>
  <div>
    <button class="floating-button" @click="toggleModal">
      <i class="fas fa-utensils"></i>
    </button>
    <transition name="fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="toggleModal">
        <div class="modal-content">
          <button class="close-icon" @click="toggleModal">
            <i class="fa-solid fa-x"></i>
          </button>
          <h2>Tu Pedido</h2>
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Platillo</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="platillo in platillosSeleccionados" :key="platillo.idplato">
                  <td>{{ platillo.nombre }}</td>
                  <td>{{ platillo.precio }} Bs.</td>
                  <td>{{ platillo.cantidad }}</td>
                  <td>{{ platillo.subtotal }} Bs.</td>
                </tr>
              </tbody>
            </table>
                <h2><strong>Total: {{ total }} Bs. </strong></h2>                
          </div>
          <button class="order-button" @click="realizarPedido">Realizar pedido</button>
        </div>
      </div>
    </transition>
  </div>
  <SuccessModal
      v-if="successModalVisible"
      :mensaje="successMensaje"
      @onClose="closeSuccessModal"
    />
</template>

<script>
import axios from "axios";
import SuccessModal from "./SuccessModal.vue";

export default {
  name: "ListaProductosPedidos",
  components:{
    SuccessModal
  },
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
      return this.platillos
        .filter((p) => this.cantidadesSeleccionadas[p.idplato] > 0)
        .map((p) => ({
          ...p,
          cantidad: this.cantidadesSeleccionadas[p.idplato],
          subtotal: this.cantidadesSeleccionadas[p.idplato] * p.precio,
        }));
    },
    total() {
      return this.platillosSeleccionados.reduce((sum, p) => sum + p.subtotal, 0);
    },
  },
  data() {
    return {
      isModalOpen: false,
      successModalVisible: false,
      successMensaje: '',
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    async realizarPedido() {
      if (this.platillosSeleccionados.length === 0) {
        alert("Debe seleccionar productos primero");
        return;
      }

      // Obtener el ID del usuario logueado desde localStorage
      const idUsuario = localStorage.getItem('id');
      if (!idUsuario) {
        alert("Debe iniciar sesión antes de realizar un pedido.");
        return;
      }

      // Construir el objeto del pedido
      const pedido = {
        fecha: new Date().toISOString().slice(0, 10), // Fecha actual en formato YYYY-MM-DD
        hora: new Date().toTimeString().slice(0, 8), // Hora actual en formato HH:mm:ss
        estado: 0, // Pedido en espera
        idusuario: parseInt(idUsuario, 10), // ID del usuario logueado
        precio_total: this.total, // Total calculado
        detalles: this.platillosSeleccionados.map(p => ({
          idplato: p.idplato,
          cantidad: p.cantidad,
        })), // Detalles del pedido
      };

      try {
        const response = await axios.post('http://localhost:5000/api/pedidos', pedido);
        this.mostrarSuccessModal('Pedido realizado con éxito');
        this.$emit("pedidoRealizado"); // Notifica al componente padre para reiniciar el estado
        this.toggleModal(); // Cierra el modal
      } catch (error) {
        console.error("Error al realizar el pedido:", error);
        alert("Hubo un error al realizar el pedido. Por favor, inténtelo nuevamente.");
      }
    },

    mostrarSuccessModal(mensaje) {
      this.successMensaje = mensaje;
      this.successModalVisible = true;
    },
    closeSuccessModal() {
      this.successModalVisible = false;
    },

  },
};
</script>

<style scoped>
.floating-button {
  position: fixed;
  top: 50px;
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

.table-container {
  overflow-x: auto;
  width: 100%;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 12px;
}

.table th {
  background-color: #FFFDA4;
  color: #322209;
  text-align: center;
}

.table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.table tfoot tr td {
  background-color: #FFFDA4;
  font-weight: bold;
  text-align: center;
}

h2 {
  color: #322209;

}

.order-button {
  background-color: #322209;
  color: #FFFEDC;
  border: none;
  padding: 10px;
  width: 40%;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 50px;
  align-self: center;
}

.order-button:hover {
  background-color: #807f7f;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  background-color: #322209;
  color: #FFFEDC;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
  border-radius: 50px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
}

.close-icon:hover {
  color: #807f7f;
}

</style>
