import axios from 'axios';
import { RutaApi } from '@/api/localApi'; // Asegúrate de que `RutaApi` sea la URL base de tu API
import { defineStore } from 'pinia';

export const useMesaStore = defineStore('mesaStore', {
  state: () => ({
    mesas: [],
    mesa: null,
    error: null,
  }),
  actions: {
    // Función para obtener todas las mesas
    async obtenerMesas() {
      try {
        const response = await axios.get(`${RutaApi}/mesas`);
        this.mesas = response.data;
      } catch (error) {
        console.error('Error al obtener las mesas:', error);
        this.error = 'Error al obtener las mesas';
      }
    },

    // Función para crear una nueva mesa
    async crearMesa(nuevaMesa) {
      try {
        const response = await axios.post(`${RutaApi}/mesas`, nuevaMesa);
        this.mesas.push(response.data); // Añade la mesa recién creada a la lista
      } catch (error) {
        console.error('Error al crear la mesa:', error);
        this.error = 'Error al crear la mesa';
      }
    },

    // Función para actualizar una mesa
    async actualizarMesa(id, mesaActualizada) {
      try {
        const response = await axios.put(`${RutaApi}/mesas/${id}`, mesaActualizada);
        const index = this.mesas.findIndex(mesa => mesa.id === id);
        if (index !== -1) {
          this.mesas[index] = response.data; // Actualiza la mesa en la lista
        }
      } catch (error) {
        console.error('Error al actualizar la mesa:', error);
        this.error = 'Error al actualizar la mesa';
      }
    },

    // Función para borrar una mesa
    async borrarMesa(id) {
      try {
        await axios.delete(`${RutaApi}/mesas/${id}`);
        this.mesas = this.mesas.filter(mesa => mesa.id !== id); // Elimina la mesa de la lista
      } catch (error) {
        console.error('Error al borrar la mesa:', error);
        this.error = 'Error al borrar la mesa';
      }
    }
  }
});
