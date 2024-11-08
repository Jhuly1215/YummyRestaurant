<template>
  <div>
    <h2>Platillos</h2>
    <div class="table-container">
      <table class="platillos-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Id Categoria</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(platillo, index) in platillos" :key="index">
            <td>{{ platillo.idplato }}</td>
            <td>{{ platillo.nombre }}</td>
            <td>{{ platillo.descripcion }}</td>
            <td>${{ platillo.precio }}</td>
            <td>{{ platillo.idcategoria }}</td>
            <td>
              <button class="action-button edit-button"><i class="fas fa-edit"></i></button>
              <button class="action-button delete-button"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>Agregar Platillo</h2>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PlatillosAdminComponent",
  data() {
    return {
      platillos: [],
    };
  },
  mounted() {
    this.obtenerPlatillos();
  },
  methods: {
    async obtenerPlatillos() {
      try {
        const response = await axios.get('http://localhost:5000/api/platillos');
        const data = response.data;

        this.platillos = Array.isArray(data) ? data : [data];
      } catch (error) {
        console.error("Error al obtener los platillos:", error);
        if (error.response) {
          console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
        } else {
          console.error("Error al configurar la solicitud:", error.message);
        }
      }
    }
  }
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

.platillos-table {
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
}

.platillos-table th, .platillos-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.platillos-table th {
  background-color: #f2f2f2;
  color: #333;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
}

.edit-button {
  color: #4caf50;
}

.delete-button {
  color: #f44336;
}
</style>
