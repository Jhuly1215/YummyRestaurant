<template>
  <div class="pedidos-admin">
    <h1>Gestión de Pedidos</h1>

    <h2>Pedidos en espera</h2>
    <div v-if="cargando">Cargando pedidos...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="lista-pedidos">
      <!-- Aplica estilos para organizar los cards -->
      <div class="cards">
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
      <div class="cards">
        <CardPedido
          v-for="pedido in pedidosEntregados"
          :key="pedido.idpedido"
          :pedido="pedido"
        />
      </div>
    </div>

    <h2>Pedidos cancelados</h2>
    <div class="lista-pedidos">
      <div class="cards">
        <CardPedido
          v-for="pedido in pedidosCancelados"
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
  </div>
</template>

<script>
import axios from 'axios';
import CardPedido from '@/components/CardPedido.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

export default {
  name: 'PedidosAdmin',
  components: {
    CardPedido,
    ConfirmationModal,
  },
  data() {
    return {
      pedidos: [],
      cargando: false,
      error: null,
      modalVisible: false,
      modalMensaje: '',
      action: null,
      pedidoSeleccionado: null,
    };
  },
  computed: {
    pedidosEnEspera() {
      return this.pedidos.filter((pedido) => pedido.estado === 0);
    },
    pedidosEntregados() {
      return this.pedidos.filter((pedido) => pedido.estado === 1);
    },
    pedidosCancelados() {
      return this.pedidos.filter((pedido) => pedido.estado === 2);
    },
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
      this.pedidoSeleccionado = this.pedidos.find((p) => p.idpedido === idpedido);
      this.action = nuevoEstado;
      this.modalMensaje =
        nuevoEstado === 1
          ? `¿Desea marcar el pedido #${idpedido} como entregado?`
          : `¿Seguro que desea cancelar el pedido #${idpedido}?`;
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
      this.pedidoSeleccionado = null;
    },
    async confirmAction() {
      if (!this.pedidoSeleccionado) return;

      try {
        const endpoint =
          this.action === 1
            ? `http://localhost:5000/api/pedidos/entregar/${this.pedidoSeleccionado.idpedido}`
            : `http://localhost:5000/api/pedidos/cancelar/${this.pedidoSeleccionado.idpedido}`;

        await axios.put(endpoint); // Ajuste para las rutas específicas

        // Actualiza el estado localmente
        this.pedidoSeleccionado.estado = this.action;

        alert(
          this.action === 1
            ? "El pedido se marcó como entregado."
            : "El pedido fue cancelado."
        );

        // Opcional: Vuelve a cargar todos los pedidos desde el backend si prefieres no actualizar localmente
        // await this.obtenerPedidos();
      } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        alert("No se pudo actualizar el pedido.");
      } finally {
        this.closeModal();
      }
    }

  },
};
</script>

<style scoped>
.pedidos-admin {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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
</style>
