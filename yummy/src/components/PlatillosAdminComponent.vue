<template>
  <div>
    <h2>Platillos</h2>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(platillo, index) in platillos" :key="index">
            <td>{{ platillo.idplato }}</td>
            <td>{{ platillo.nombre }}</td>
            <td>{{ platillo.descripcion }}</td>
            <td>{{ platillo.precio }} Bs.</td>
            <td>{{ platillo.idcategoria }}</td>
            <td class="botones">
              <button v-if="index !== filaEnEdicion" class="action-button edit-button" @click="seleccionarPlatilloParaEditar(index)">
                <i class="fas fa-edit"></i>
              </button>
              <button v-if="index !== filaEnEdicion" class="action-button delete-button" @click="confirmarEliminacion(platillo.nombre)">
                <i class="fas fa-trash"></i>
              </button>
              <!-- Muestra el botón Guardar solo en la fila en edición -->
              <button v-if="index === filaEnEdicion" class="button-save" @click="guardarCambios">Guardar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="button-new">Nuevo platillo</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PlatillosAdminComponent",
  data() {
    return {
      platillos: [],
      filaEnEdicion: null, // Almacena el índice de la fila en edición
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
    },
    seleccionarPlatilloParaEditar(index) {
      // Establece el índice de la fila en edición
      this.filaEnEdicion = index;
    },
    confirmarEliminacion(nombrePlatillo) {
      // Muestra un mensaje de confirmación para la eliminación
      alert(`¿Está seguro que quiere eliminar ${nombrePlatillo}?`);
    },
    guardarCambios() {
      // Aquí se pueden realizar las acciones de guardado necesarias
      alert("Cambios guardados exitosamente.");
      // Resetea el índice de la fila en edición
      this.filaEnEdicion = null;
    }
  }
};
</script>

<style scoped>
h2 {
  color: #322209;
}
.table-container {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 2;
  padding: 10px;
}

.table th {
  background-color: #FFFDA4;
  color: #322209;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 5px;
}

.edit-button {
  color: #4caf50;
}

.delete-button {
  color: #f44336;
}

.button-new {
  background-color: #FE9900;
  color: #FFFEDC;
  border: 0;
  padding: 10px 20px;
  border-radius: 50px;
}

.button-save {
  background-color: #4caf50;
  color: #FFFEDC;
  border: 0;
  padding: 5px;
  border-radius: 50px;
}
</style>
