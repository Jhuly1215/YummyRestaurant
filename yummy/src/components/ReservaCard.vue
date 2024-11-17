<template>
  <div :class="['reserva-card', estadoClase]" @click="abrirModal">
    <h3 class="mesa">{{ mesa }}</h3>
    <p>Fecha: {{ fecha }}</p>
    <p>Hora: {{ hora }}</p>
    <p>Nombre: {{ nombre }}</p>
    <!-- Evita la propagación del evento de clic al componente padre -->
    <button :class="['estado', estadoClase]" @click.stop="toggleEstado">{{ estado }}</button>
  </div>
</template>

<script>
export default {
name: "ReservaCard",
props: {
  mesa: String,
  fecha: String,
  hora: String,
  nombre: String,
  estadoInicial: {
    type: String,
    default: 'Pendiente'
  }
},
data() {
  return {
    estado: this.estadoInicial // Inicializa el estado con el valor de estadoInicial
  };
},
computed: {
  estadoClase() {
    // Cambia la clase de la tarjeta según el estado actual
    return this.estado === 'Entregada' ? 'entregada' : 'pendiente';
  }
},
methods: {
  toggleEstado() {
    // Alterna el estado entre "Pendiente" y "Entregada"
    this.estado = this.estado === 'Pendiente' ? 'Entregada' : 'Pendiente';
    this.$emit("estadoCambiado", this.estado); // Emitir evento al cambiar estado
  },
  abrirModal() {
    this.$emit("abrirModal"); // Emitir evento para abrir el modal
  }
}
};
</script>
  
<style scoped>
  .reserva-card {
    width: 200px;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
    text-align: center;
  }
  
  .mesa {
    font-size: 1.2rem;
    color: #8B5E3C; /* Color marrón */
    font-weight: bold;
  }
  
  .entregada {
    background-color: #FFFEDC; /* Color de fondo para estado "Entregada" */
  }
  
  .pendiente {
    background-color: #F5F5F5; /* Color de fondo para estado "Pendiente" */
  }
  
  .estado {
    margin-top: 12px;
    padding: 6px 12px;
    font-size: 0.9rem;
    border: none;
    border-radius: 8px;
    color: #666;
    cursor: pointer;
  }
  
  .entregada.estado {
    background-color: #D8D8A7; /* Color para botón de estado "Entregada" */
  }
  
  .pendiente.estado {
    background-color: #D3D3D3; /* Color para botón de estado "Pendiente" */
  }
</style>
  