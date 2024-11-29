<template>
  <div class="pedidos-admin">
    <h1>Gestión de Pedidos</h1>

    <h2>Pedidos en espera</h2>
    <div v-if="cargando">Cargando pedidos...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="lista-pedidos">
      <div v-if="!pedidosEnEspera || pedidosEnEspera.length === 0" class="mensaje-vacio">
        <p>No hay pedidos en espera.</p>
      </div>
      <div class="cards" v-else>
        <CardPedido
          v-for="pedido in pedidosEnEspera"
          :key="pedido.idpedido"
          :pedido="pedido"
          @actualizarEstado="handleActualizarEstado"
        />
      </div>
    </div>

    <h2>Pedidos entregados</h2>
    <div class="lista-pedidos">
      <div v-if="!pedidosEntregados || pedidosEntregados.length === 0" class="mensaje-vacio">
        <p>No hay pedidos entregados.</p>
      </div>
      <div class="cards" v-else>
        <CardPedido
          v-for="pedido in pedidosEntregados"
          :key="pedido.idpedido"
          :pedido="pedido"
          @actualizarEstado="handleActualizarEstado"
        />
      </div>
    </div>

    <h2>Pedidos cancelados</h2>
    <div class="lista-pedidos">
      <div v-if="!pedidosCancelados || pedidosCancelados.length === 0" class="mensaje-vacio">
        <p>No hay pedidos cancelados.</p>
      </div>
      <div class="cards" v-else>
        <CardPedido
          v-for="pedido in pedidosCancelados"
          :key="pedido.idpedido"
          :pedido="pedido"
        />
      </div>
    </div>

    <h2>Pedidos pagados</h2>
    <div class="lista-pedidos">
      <div v-if="!pedidosPagados || pedidosPagados.length === 0" class="mensaje-vacio">
        <p>No hay pedidos pagados.</p>
      </div>
      <div class="cards" v-else>
        <CardPedido
          v-for="pedido in pedidosPagados"
          :key="pedido.idpedido"
          :pedido="pedido"
        />
      </div>
    </div>

    <ConfirmationModal
      v-if="modalVisible"
      :mensaje="modalMensaje"
      @onCancel="closeModal"
      @onConfirm="confirmAction"
    />
    <SuccessModal
      v-if="successModalVisible"
      :mensaje="successMensaje"
      @onClose="closeSuccessModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import CardPedido from '@/components/CardPedido.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import SuccessModal from '@/components/SuccessModal.vue';

export default {
  name: 'PedidosAdmin',
  components: {
    CardPedido,
    ConfirmationModal,
    SuccessModal,
  },
  data() {
    return {
      pedidos: [],
      cargando: false,
      error: null,
      modalVisible: false,
      modalMensaje: '',
      successModalVisible: false,
      successMensaje: '',
      action: null,
      pedidoSeleccionado: null,
    };
  },
  computed: {
    pedidosEnEspera() {
      return Array.isArray(this.pedidos) ? this.pedidos.filter((pedido) => pedido.estado === 0) : [];
    },
    pedidosEntregados() {
      return Array.isArray(this.pedidos) ? this.pedidos.filter((pedido) => pedido.estado === 1) : [];
    },
    pedidosCancelados() {
      return Array.isArray(this.pedidos) ? this.pedidos.filter((pedido) => pedido.estado === 2) : [];
    },
    pedidosPagados() {
      return Array.isArray(this.pedidos) ? this.pedidos.filter((pedido) => pedido.estado === 3) : [];
    }
  },
  mounted() {
    this.obtenerPedidos();
  },
  methods: {
    async obtenerPedidos() {
      this.cargando = true;
      try {
        const response = await axios.get('http://localhost:5000/api/pedidos');
        this.pedidos = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        this.error = "No se pudieron cargar los pedidos.";
      } finally {
        this.cargando = false;
      }
    },

    handleActualizarEstado(idpedido, nuevoEstado) {
      console.log(`Evento recibido: Pedido ID ${idpedido}, Nuevo Estado: ${nuevoEstado}`);
      this.pedidoSeleccionado = this.pedidos.find((p) => p.idpedido === idpedido);
      this.action = nuevoEstado;

      if (nuevoEstado === 3) {
        this.modalMensaje = `¿Desea registrar el pago del pedido #${idpedido}?`;
      } else if (nuevoEstado === 1) {
        this.modalMensaje = `¿Desea marcar el pedido #${idpedido} como entregado?`;
      } else if (nuevoEstado === 2) {
        this.modalMensaje = `¿Seguro que desea cancelar el pedido #${idpedido}?`;
      }
      this.modalVisible = true;
    },

    closeModal() {
      this.modalVisible = false;
      this.pedidoSeleccionado = null;
    },

    async confirmAction() {
      if (!this.pedidoSeleccionado) return;

      try {
        let endpoint;
        switch (this.action) {
          case 1:
            endpoint = `http://localhost:5000/api/pedidos/entregar/${this.pedidoSeleccionado.idpedido}`;
            break;
          case 2:
            endpoint = `http://localhost:5000/api/pedidos/cancelar/${this.pedidoSeleccionado.idpedido}`;
            break;
          case 3: // Registrar pago
            endpoint = `http://localhost:5000/api/pedidos/pagar/${this.pedidoSeleccionado.idpedido}`;
            break;
          default:
            throw new Error("Acción no válida");
        }

        // Realizamos la solicitud al backend
        await axios.put(endpoint);

        // Actualizamos el estado del pedido en la lista
        this.pedidoSeleccionado.estado = this.action;
        this.pedidos = this.pedidos.map((pedido) =>
          pedido.idpedido === this.pedidoSeleccionado.idpedido
            ? { ...pedido, estado: this.pedidoSeleccionado.estado }
            : pedido
        );

        // Mostramos el mensaje de éxito
        const mensajes = {
          1: "El pedido se marcó como entregado.",
          2: "El pedido fue cancelado.",
          3: "El pago del pedido se registró exitosamente.",
        };
        this.successMensaje = mensajes[this.action];
        this.successModalVisible = true;
      } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        this.error = "No se pudo actualizar el pedido.";
      } finally {
        this.closeModal();
      }
    }, 
    closeSuccessModal() {
      this.successModalVisible = false;
      this.obtenerPedidos();  // Refresca la lista de pedidos después de registrar el pago
    },
  },
};
</script>

<style scoped>
/* Estilos del componente */
.pedidos-admin {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.cards > * {
  flex: 1 1 calc(33.33% - 20px); /* 3 tarjetas por fila */
  max-width: calc(33.33% - 20px);
}

@media (max-width: 768px) {
  .cards > * {
    flex: 1 1 100%; /* 1 tarjeta por fila en móviles */
    max-width: 90%; /* Margen horizontal */
  }
}

.error {
  color: red;
}

p {
  color: #322209;
  font-style: italic;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

h1 {
  color: #FE9900;
}
h2 {
  color: #FE9900;
}
</style>
