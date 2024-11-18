<!-- src/ventanas/reservas/editarReserva.vue -->
<template>
    <div class="modal-success">
      <div class="modal-content">
        <span class="close-button" @click="onClose">&times;</span>
        <h2>{{ titulo }}</h2>
        
        <!-- Formulario para editar la reserva -->
        <form @submit.prevent="guardarCambios">
          <div class="form-group">
            <label for="mesa">Mesa:</label>
            <input type="text" id="mesa" v-model="reservaData.mesa" required />
          </div>
  
          <div class="form-group">
            <label for="fecha">Fecha:</label>
            <input type="date" id="fecha" v-model="reservaData.fecha" required />
          </div>
  
          <div class="form-group">
            <label for="hora">Hora:</label>
            <input type="time" id="hora" v-model="reservaData.hora" required />
          </div>
  
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="reservaData.nombre" required />
          </div>
  
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select id="estado" v-model="reservaData.estado" required>
              <option value="Pendiente">Pendiente</option>
              <option value="Entregada">Entregada</option>
            </select>
          </div>
  
          <button type="submit" class="save-button">Guardar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive } from 'vue';
  
  export default {
    name: "EditarReserva",
    props: {
      titulo: String,
      reserva: {
        type: Object,
        required: true
      }
    },
    emits: ['onClose', 'onSave'],
    setup(props, { emit }) {
      // Usamos reactive para que reservaData sea reactivo
      const reservaData = reactive({
        mesa: props.reserva.mesa,
        fecha: props.reserva.fecha,
        hora: props.reserva.hora,
        nombre: props.reserva.nombre,
        estado: props.reserva.estado
      });
  
      // Función para guardar cambios
      const guardarCambios = () => {
        emit('onSave', { ...reservaData });
        emit('onClose'); // Cierra el modal después de guardar
      };
  
      // Función para cerrar el modal sin guardar
      const onClose = () => {
        emit('onClose');
      };
  
      return { reservaData, guardarCambios, onClose };
    }
  };
  </script>
  
  <style scoped>
  .modal-success h2 {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 5vh;
    padding: 2vh;
    text-align: center;
    margin-bottom: 3vh;
  }
  .modal-success p {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 3vh;
    text-align: center;
  }
  .modal-success {
    width: 100%;
    padding-left: 25%;
    padding-right: 25%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1005;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    position: relative;
    width: 100%;
    max-width: 400px;
  }
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .form-group {
    margin-bottom: 1rem;
    text-align: left;
  }
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .save-button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .save-button:hover {
    background-color: #45a049;
  }
  </style>
  