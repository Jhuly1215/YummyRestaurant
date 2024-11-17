<template>
  <div>
    <h2>Platillos</h2>
    <div class="table-container">
      <table class="table">
        <thead>
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
            
            <!-- Si la fila está en edición, muestra campos de entrada -->
            <td v-if="index === filaEnEdicion">
              <input v-model="platilloEditado.nombre" />
            </td>
            <td v-else>{{ platillo.nombre }}</td>
            
            <td v-if="index === filaEnEdicion">
              <input v-model="platilloEditado.descripcion" />
            </td>
            <td v-else>{{ platillo.descripcion }}</td>
            
            <td v-if="index === filaEnEdicion">
              <input type="number" v-model="platilloEditado.precio" />
            </td>
            <td v-else>{{ platillo.precio }} Bs.</td>
            
            <td v-if="index === filaEnEdicion">
              <input type="number" v-model="platilloEditado.idcategoria" />
            </td>
            <td v-else>{{ platillo.idcategoria }}</td>
            
            <td class="botones">
              <!-- Botones de acción -->
              <button v-if="index !== filaEnEdicion" class="action-button edit-button" @click="seleccionarPlatilloParaEditar(index, platillo)">
                <i class="fas fa-edit"></i>
              </button>
              <button v-if="index !== filaEnEdicion" class="action-button delete-button" @click="mostrarConfirmacion(platillo)">
                <i class="fas fa-trash"></i>
              </button>
              <!-- Botones de Guardar y Cancelar solo en la fila en edición -->
              <button v-if="index === filaEnEdicion" class="action-button button-save" @click="guardarCambios">
                <i class="fa-solid fa-floppy-disk"></i>
              </button>
              <button v-if="index === filaEnEdicion" class="action-button button-cancel" @click="cancelarCambios">
                <i class="fa-solid fa-xmark"></i>
              </button>
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
      platilloEditado: {}, // Nuevo objeto para los datos de edición
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
    seleccionarPlatilloParaEditar(index, platillo) {
      this.filaEnEdicion = index;
      this.platilloEditado = { ...platillo }; // Copia los datos del platillo para editarlos
    },
    
    async guardarCambios() {
      console.log(this.platilloEditado); // Verificar valores
      try {
        await axios.put(`http://localhost:5000/api/platillos/${this.platilloEditado.idplato}`, this.platilloEditado);
        this.platillos.splice(this.filaEnEdicion, 1, this.platilloEditado);
        this.filaEnEdicion = null;
        this.platilloEditado = {};
      } catch (error) {
        console.error("Error al guardar los cambios del platillo:", error)
      }
    },

    cancelarCambios() {
      this.filaEnEdicion = null;
      this.platilloEditado = {}; // Limpia los cambios sin guardarlos
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
  width: 20px;
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
  color: #2f0cf5;
}

.button-cancel {
  color: #f44336;
}
</style>
