<template>
    <div class="pedido-card">
      <div class="info">
        <h3>Pedido #{{ pedido.idpedido }}</h3>
        <p><strong>Usuario:</strong> {{ pedido.usuario }}</p>
        <p><strong>Monto Total:</strong> {{ pedido.monto }} Bs.</p>
        <p><strong>Fecha:</strong> {{ pedido.fecha }}</p>
        <p><strong>Estado:</strong> {{ estadoTexto }}</p>
      </div>
      <div class="acciones" v-if="pedido.estado === 0">
        <button @click="entregar">Entregar</button>
        <button @click="cancelar">Cancelar</button>
      </div>
    </div>
</template>

<script>
export default {
name: 'CardPedido',
props: {
    pedido: {
    type: Object,
    required: true,
    },
},
computed: {
    estadoTexto() {
    return ['En espera', 'Entregado', 'Cancelado'][this.pedido.estado] || 'Desconocido';
    },
},
methods: {
    entregar() {
    this.$emit('actualizarEstado', this.pedido.idpedido, 1);
    },
    cancelar() {
    this.$emit('actualizarEstado', this.pedido.idpedido, 2);
    },
},
};
</script>
  

<style scoped>
.pedido-card {
border: 1px solid #ccc;
border-radius: 10px;
padding: 15px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
margin: 10px;
background-color: #f9f9f9;
}
.info {
margin-bottom: 10px;
}
.acciones button {
margin-right: 10px;
padding: 5px 10px;
background-color: #4caf50;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
}
.acciones button:last-child {
background-color: #2196f3;
}
</style>
