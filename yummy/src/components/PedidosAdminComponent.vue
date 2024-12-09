<template>
  <header class="offers-header">
    <h2>
      <i class="fas fa-clipboard-list"></i>
      Pedidos
    </h2>
    <p>Administra los pedidos realizados</p>
  </header>
  <FiltroEstadoPedido :estadoInicial="estadoActual" @cambioEstado="actualizarFiltro" />
  <div class="pedidos-admin">
    <div v-if="cargando">Cargando pedidos...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="lista-pedidos">
      <div v-if="pedidosFiltrados.length === 0" class="mensaje-vacio">
        <p>No hay pedidos para mostrar.</p>
      </div>
      <div class="cards" v-else>
        <CardPedido
          v-for="pedido in pedidosFiltrados"
          :key="pedido.idpedido"
          :pedido="pedido"
          @actualizarEstado="handleActualizarEstado"
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
import FiltroEstadoPedido from "@/components/FiltroEstadoPedido.vue";

export default {
  name: 'PedidosAdmin',
  components: {
    CardPedido,
    ConfirmationModal,
    SuccessModal,
    FiltroEstadoPedido,
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
      estadoActual: 0, // Estado inicial: "En espera"
    };
  },
  computed: {
    pedidosFiltrados() {
      return this.pedidos.filter((pedido) => pedido.estado === this.estadoActual);
    },
    /*
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
      */
  },
  mounted() {
    this.obtenerPedidos();
  },
  methods: {
    actualizarFiltro(nuevoEstado) {
      this.estadoActual = nuevoEstado;
    },
    async obtenerPedidos() {
      this.cargando = true;
      try {
        const response = await axios.get("http://localhost:5000/api/pedidos");
        this.pedidos = response.data;
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
/* Encabezado principal */
.offers-header {
  text-align: center;
  background: linear-gradient(180deg, #ff9900, #ffcc00);
  color: white;
  padding: 20px 10px;
  border-radius: 0 0 15px 15px;
  /* Redondeo en las esquinas inferiores */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  /* Sombra para dar profundidad */
  margin-bottom: 20px;
}

/* Título principal */
.offers-header h2 {
  font-size: 2.5em;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* Espacio entre el texto y el icono */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* Sombra del texto */
}

/* Icono decorativo */
.offers-header h2 i {
  font-size: 0.8em;
  color: #ffd700;
  /* Color dorado para el icono */
  animation: bounce 1s infinite;
  /* Animación de rebote */
}

/* Subtítulo */
.offers-header p {
  font-size: 1.2em;
  margin-top: 10px;
  color: #fff8e7;
  /* Color claro para contraste */
  font-style: italic;
}

/* Contenedor de la tabla */
.table-container {
  overflow-x: auto;
  margin: 20px 0;
  
}

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

</style>
