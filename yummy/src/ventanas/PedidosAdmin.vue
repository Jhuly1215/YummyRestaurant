<template>
    <div class="pedidos-admin">
      <h1>Gestión de Pedidos</h1>
      <div v-if="cargando">Cargando pedidos...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="lista-pedidos">
        <CardPedido
          v-for="pedido in pedidos"
          :key="pedido.idpedido"
          :pedido="pedido"
          @registrarPago="handleRegistrarPago"
          @actualizarEstado="handleActualizarEstado"
        />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CardPedido from '@/components/CardPedido.vue';
  
  export default {
    name: 'PedidosAdmin',
    components: {
      CardPedido
    },
    data() {
      return {
        pedidos: [],
        cargando: false,
        error: null
      };
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
        } catch (error) {
          console.error("Error al obtener los pedidos:", error);
          this.error = "No se pudieron cargar los pedidos.";
        } finally {
          this.cargando = false;
        }
      },
      handleRegistrarPago(idpedido) {
        // Lógica para registrar el pago, por ejemplo, abrir un modal o redirigir
        console.log(`Registrar pago para el pedido ${idpedido}`);
      },
      handleActualizarEstado(idpedido) {
        // Lógica para actualizar el estado del pedido
        console.log(`Actualizar estado del pedido ${idpedido}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .pedidos-admin {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  .lista-pedidos {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .error {
    color: red;
  }
  </style>
  