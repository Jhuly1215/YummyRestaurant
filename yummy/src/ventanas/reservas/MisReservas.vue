<template>
    <div class="reservas-container">
      <h1>Mis Reservas</h1>
  
      <!-- Mostrar error si existe -->
      <div v-if="error" class="error-card">
        <p>{{ error }}</p>
      </div>
  
      <!-- Mostrar tarjetas de reservas -->
      <div v-if="reservas.length > 0" class="reservas-list">
        <div 
          v-for="reserva in reservas" 
          :key="reserva.idreserva" 
          :class="['reserva-card', reserva.estado === 1 ? 'pendiente' : 'finalizada']"
        >
          <h3>{{ reserva.estado === 1 ? 'Reserva pendiente' : 'Reserva finalizada' }}</h3>
          <p>Mesa: {{ reserva.idmesa }}</p>
          <p>Fecha: {{ formatFecha(reserva.fecha) }}</p>
          <p>Hora: {{ reserva.hora }}</p>
          <div v-if="reserva.estado === 1" class="acciones">
            <button @click="cancelarReserva(reserva.idreserva)" class="cancelar-btn">Cancelar</button>
          </div>
        </div>
      </div>
  
      <!-- Si no hay reservas -->
      <p v-else>No tienes reservas en este momento.</p>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  
  export default {
    name: 'MisReservas',
    setup() {
      const reservas = ref([]);
      const error = ref(null);
  
      const cargarReservas = async () => {
        try {
          const idUsuario = localStorage.getItem('id');
          if (!idUsuario) {
            error.value = 'No se encontró un usuario logueado.';
            return;
          }
  
          const response = await axios.get(`/api/reservas/usuario/${idUsuario}`);
          reservas.value = response.data;
        } catch (err) {
          console.error('Error al cargar reservas:', err);
          error.value = 'Ocurrió un error al cargar tus reservas.';
        }
      };
  
      const modificarReserva = (reserva) => {
        alert(`Modificar reserva: ${JSON.stringify(reserva)}`);
      };
  
      const cancelarReserva = async (idReserva) => {
        try {
          if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) return;
  
          await axios.delete(`/api/reservas/${idReserva}`);
          reservas.value = reservas.value.filter(r => r.idreserva !== idReserva);
          alert('Reserva cancelada exitosamente.');
        } catch (err) {
          console.error('Error al cancelar reserva:', err);
          error.value = 'Ocurrió un error al cancelar la reserva.';
        }
      };
  
      const formatFecha = (fecha) => {
        const date = new Date(fecha + 'T00:00:00');
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };
  
      onMounted(cargarReservas);
  
      return {
        reservas,
        error,
        modificarReserva,
        cancelarReserva,
        formatFecha,
      };
    },
  };
</script>
  
<style scoped>

  .reservas-container {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .error-card {
    background-color: #ffe5e5;
    color: #ff0000;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
  }
  
  .reservas-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .reserva-card {
    width: 250px;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .pendiente {
    background-color: #fffedc;
  }
  
  .finalizada {
    background-color: #e2e2e2;
  }
  
  h3 {
    color: #a16f23;
    margin-bottom: 10px;
  }
  
  .acciones {
    margin-top: 15px;
  }
  
  button {
    border: none;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .modificar-btn {
    background-color: #a16f23;
    color: white;
  }
  
  .cancelar-btn {
    background-color: white;
    color: #a16f23;
    border: 1px solid #a16f23;
  }
</style>
  