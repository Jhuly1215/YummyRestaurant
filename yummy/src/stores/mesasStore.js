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
        const response = await axios.get(`${RutaApi.baseURL}mesas/`);
        this.mesas = response.data;
        console.log("mesas obtenidas del backend: ", this.mesas)
      } catch (error) {
        console.error('Error al obtener las mesas:', error);
        this.error = 'Error al obtener las mesas';
      }
    },

    // Función para crear una nueva mesa
    async crearMesa(nuevaMesa) {
        console.log("mesa que está llegando ", nuevaMesa)
      try {
        const response = await axios.post(`${RutaApi.baseURL}mesas/`, nuevaMesa);
        this.mesas.push(response.data); // Añade la mesa recién creada a la lista
      } catch (error) {
        console.error('Error al crear la mesa:', error);
        this.error = 'Error al crear la mesa';
      }
    },

    // Función para actualizar una mesa
    async actualizarMesa(id, mesaActualizada) {

        console.log("llega a actualizar la mesa en el store, id que llega", id)
        console.log("llega a actualizar la mesa en el store, mesa que llega", mesaActualizada)
      try {
        const response = await axios.put(`${RutaApi.baseURL}mesas/${id}`, mesaActualizada);
        const index = this.mesas.findIndex(mesa => mesa.id === id);
        if (index !== -1) {
          this.mesas[index] = response.data; // Actualiza la mesa en la lista
          console.log("mesa actualizada")
        }
      } catch (error) {
        console.error('Error al actualizar la mesa:', error);
        this.error = 'Error al actualizar la mesa';
      }
    },

    // Función para borrar una mesa
    async borrarMesa(id) {
      try {
        await axios.delete(`${RutaApi.baseURL}mesas/${id}`);
        this.mesas = this.mesas.filter(mesa => mesa.id !== id); // Elimina la mesa de la lista
      } catch (error) {
        console.error('Error al borrar la mesa:', error);
        this.error = 'Error al borrar la mesa';
      }
    }
  }
});
