<template>
    <div class="pedido-card">
      <div class="info">
        <h3>Pedido #{{ pedido.idpedido }}</h3>
        <p><strong>Usuario:</strong> {{ pedido.usuario }}</p>
        <p><strong>Monto Total:</strong> {{ pedido.monto }} Bs.</p>
        <p><strong>Fecha:</strong> {{ pedido.fecha }}</p>
        <p><strong>Estado:</strong> {{ pedido.estado }}</p>
      </div>
      <div class="acciones">
        <button @click="registrarPago">Registrar Pago</button>
        <button @click="actualizarEstado">Actualizar Estado</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
name: 'CardPedido',
props: {
    pedido: {
    type: Object,
    required: true
    }
},
methods: {
    methods: {
    async registrarPago(pedido) {
        try {
            const { idpedido, idusuario, precio_total } = pedido;
            
            // Enviar datos a la API de creación de pagos
            await axios.post('http://localhost:5000/api/pagos', {
                idpedido,
                idusuario,
                monto: precio_total, // Usa el total del pedido
            });

            // Actualizar estado local del pedido (opcional)
            this.$set(pedido, 'estado', 1);
            alert('Pago registrado exitosamente');
        } catch (error) {
            console.error('Error al registrar el pago:', error);
            alert('No se pudo registrar el pago');
        }
    },
}

}
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
