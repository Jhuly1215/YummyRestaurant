<!-- src/views/Reservas.vue -->
<template>
    <div class="reservas-container">
      <h2 class="titulo">Reservas:</h2>
      <div class="reservas-grid">
        <ReservaCard
          v-for="reserva in reservas"
          :key="reserva.id"
          :mesa="reserva.mesa"
          :fecha="reserva.fecha"
          :hora="reserva.hora"
          :nombre="reserva.nombre"
          :estado="reserva.estado"
          @click="editarReserva(reserva)"
        />
        <ModalEditReserva
            v-if="modalVisible"
            :titulo="'Editar Reserva'"
            :reserva="reservaSeleccionada"
            @onClose="modalVisible = false"
            @onSave="guardarReservaEditada"
        />
      </div>
    </div>
  </template>
  
  <script>
  import ReservaCard from '@/components/ReservaCard.vue';
  import ModalEditReserva from '@/ventanas/reservas/editarReserva.vue';

  export default {
    name: "ReservasView",
    components: {
      ReservaCard,
      ModalEditReserva
    },
    data() {
      return {
        reservas: [
          { id: 1, mesa: 'Mesa D', fecha: '10/10/2024', hora: '14:00', nombre: 'Juan Perez', estado: 'Pendiente' },
          { id: 2, mesa: 'Mesa A', fecha: '10/10/2024', hora: '14:00', nombre: 'Juan Perez', estado: 'Entregada' },
          { id: 3, mesa: 'Mesa D', fecha: '10/10/2024', hora: '14:00', nombre: 'Juan Perez', estado: 'Pendiente' },
          { id: 4, mesa: 'Mesa C', fecha: '10/10/2024', hora: '14:00', nombre: 'Juan Perez', estado: 'Entregada' },
          { id: 5, mesa: 'Mesa D', fecha: '10/10/2024', hora: '14:00', nombre: 'Juan Perez', estado: 'Pendiente' },
          { id: 6, mesa: 'Mesa D', fecha: '10/10/2024', hora: '14:00', nombre: 'Juan Perez', estado: 'Entregada' },
          { id: 7, mesa: 'Mesa D4', fecha: '10/10/2024', hora: '14:00', nombre: 'Juan Perez', estado: 'Pendiente' },
          { id: 8, mesa: 'Mesa D2', fecha: '10/10/2024', hora: '14:00', nombre: 'Juan Perez', estado: 'Entregada' }
        ],
        modalVisible: false,
        reservaSeleccionada: null
      };
    },
    methods: {
        editarReserva(reserva) {
        this.reservaSeleccionada = { ...reserva }; // Copia la reserva seleccionada
        this.modalVisible = true; // Muestra el modal
        },
        guardarReservaEditada(nuevaReserva) {
        const index = this.reservas.findIndex(r => r.id === nuevaReserva.id);
        if (index !== -1) {
            this.reservas.splice(index, 1, nuevaReserva); // Actualiza la reserva en la lista
        }
        this.modalVisible = false; // Oculta el modal
        }
    }
  };
  </script>
  
  <style scoped>
  .reservas-container {
    padding-top: 3%;
    padding-bottom: 3%;
    padding-left: 5%;
    padding-right: 5%;
    text-align: left;

  }
  
  .titulo {
    color: #A16F23; /* Color marrón */
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .reservas-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  </style>
  