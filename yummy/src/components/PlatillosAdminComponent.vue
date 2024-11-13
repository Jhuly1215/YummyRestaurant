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
          <!-- Muestra el mensaje de confirmación -->
          <tr v-if="idPlatilloSeleccionado === platilloAEliminar.idplato">
            <td colspan="6">
              <ConfirmacionEliminar
                :nombrePlatillo="platilloAEliminar.nombre"
                @confirmarEliminacion="eliminarPlatillo"
                @cancelar="cancelarConfirmacion"
              />
            </td>
          </tr>
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
              <button v-if="index !== filaEnEdicion" class="action-button delete-button" @click="mostrarConfirmacion(platillo)">
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
import ConfirmacionEliminar from './ConfirmacionEliminar.vue';

export default {
  name: "PlatillosAdminComponent",
  components: { ConfirmacionEliminar },
  data() {
    return {
      platillos: [],
      filaEnEdicion: null,
      idPlatilloSeleccionado: null,
      platilloAEliminar: {}
    };
  },
  mounted() {
    this.obtenerPlatillos();
  },
  methods: {
    async obtenerPlatillos() {
      try {
        const response = await axios.get('http://localhost:5000/api/platillos');
        this.platillos = Array.isArray(response.data) ? response.data : [response.data];
      } catch (error) {
        console.error("Error al obtener los platillos:", error);
      }
    },
    seleccionarPlatilloParaEditar(index) {
      this.filaEnEdicion = index;
    },
    mostrarConfirmacion(platillo) {
      this.platilloAEliminar = platillo;
      this.idPlatilloSeleccionado = platillo.idplato;
    },
    cancelarConfirmacion() {
      this.idPlatilloSeleccionado = null;
      this.platilloAEliminar = {};
    },
    async eliminarPlatillo() {
      try {
        await axios.delete(`http://localhost:5000/api/platillos/${this.platilloAEliminar.idplato}`);
        this.platillos = this.platillos.filter(p => p.idplato !== this.platilloAEliminar.idplato);
        this.cancelarConfirmacion();
      } catch (error) {
        console.error("Error al eliminar el platillo:", error);
      }
    },
    guardarCambios() {
      alert("Cambios guardados exitosamente.");
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
  align-items: center;
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
  padding: 6px;
  border-radius: 50px;
}
</style>
