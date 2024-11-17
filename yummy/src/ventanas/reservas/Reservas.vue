<!-- src/views/Reservas.vue -->
<template>
    <div class="reservas-container">
      <h2 class="titulo">Reservas:</h2>
      <div class="reservas-grid">
        <ReservaCard
          v-for="reserva in reservas"
          :key="reserva.idreserva"
          :mesa="String(reserva.idmesa)"
          :fecha="reserva.fecha"
          :hora="reserva.hora"
          :nombre="reserva.nombre"
          :estado="String(reserva.estado)"
          @click="editarReserva(reserva)"
          @cambiarEstado="actualizarEstadoReserva(reserva, $event)" 
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
  import axios from 'axios';
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
      reservas: [],
      modalVisible: false,
      reservaSeleccionada: null
    };
  },
  methods: {
    async cargarReservas() {
      try {
        const response = await axios.get('/api/reservas');
        this.reservas = response.data;
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      }
    },
    editarReserva(reserva) {
      this.reservaSeleccionada = { ...reserva };
      this.modalVisible = true;
    },
    //console.log("Nueva reserva recibida del modal:", nuevaReserva);
    async guardarReservaEditada(nuevaReserva) {
      console.log("Nueva reserva recibida del modal:", nuevaReserva);
      try {
        // Traduce estado textual a numérico
        const estadoInt = parseInt(nuevaReserva.estado);
        const idUsuario = this.reservaSeleccionada.idUsuario;

        // Usa el campo `mesa` para el idMesa
        const idMesa = nuevaReserva.mesa;
        await axios.put(`/api/reservas/${nuevaReserva.idreserva}`, {
          ...nuevaReserva,
          estado: estadoInt,
          idUsuario,
          idMesa, // Envía estado numérico al backend
        });

        // Actualiza la lista de reservas localmente
        const index = this.reservas.findIndex(r => r.idreserva === nuevaReserva.idreserva);
        if (index !== -1) {
          this.reservas.splice(index, 1, {
            ...nuevaReserva,
            estado: estadoInt // Asegura que también se actualice localmente
          });
        }
        this.modalVisible = false; // Cierra el modal
      } catch (error) {
        console.error("Error al guardar la reserva editada:", error);
      }
    },

    async actualizarEstadoReserva(reserva, nuevoEstado) {
      try {
        const estadoInt = parseInt(nuevoEstado); // Aseguramos que sea un número
        // Enviar actualización al backend
        await axios.put(`/api/reservas/${reserva.idreserva}`, {
          idreserva: reserva.idreserva,
          idusuario: reserva.idusuario,
          idmesa: reserva.idmesa,
          fecha: reserva.fecha,
          hora: reserva.hora,
          estado: estadoInt, // Solo cambia el estado
        });

        // Actualiza el estado localmente
        reserva.estado = estadoInt;
      } catch (error) {
        console.error("Error al actualizar el estado de la reserva:", error);
      }
    },
  },
    mounted() {
      this.cargarReservas(); // Cargar reservas al montar el componente
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
  