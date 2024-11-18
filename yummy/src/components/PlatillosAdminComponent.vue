<template>
  <div>
    <h2>Platillos</h2>
    <div class="table-container">
      <table class="table">
        <thead>
          <!-- Fila de confirmación de eliminación -->
          <tr 
            v-if="idPlatilloSeleccionado === platilloAEliminar.idplato" 
            class="confirm-row"
          >
            <td colspan="7">
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
            <th>Imagen</th>
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

            <td v-if="index === filaEnEdicion">
              <input v-model="platilloEditado.imagen" />
            </td>
            <td v-else>{{ platillo.imagen }}</td>
            
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
      try {
          // Ajustar los datos enviados al backend
          const payload = {
              idplato: this.platilloEditado.idplato,
              nombre: this.platilloEditado.nombre,
              descripcion: this.platilloEditado.descripcion,
              precio: this.platilloEditado.precio,
              idcategoria: this.platilloEditado.idCategoria, // Mapea correctamente idCategoria
              imagen: this.platilloEditado.imagen || null, // Permitir null en caso de que esté vacío
          };

          // Realizar la petición PUT
          const response = await axios.put(`http://localhost:5000/api/platillos/${this.platilloEditado.idplato}`, payload);
          console.log('Respuesta del servidor:', response.data);

          alert('Platillo actualizado correctamente');
      } catch (error) {
          console.error('Error al guardar los cambios del platillo:', error);
          alert('Ocurrió un error al intentar guardar los cambios.');
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
/* Encabezado principal */
h2 {
  color: #322209;
  text-align: center;
  margin-bottom: 20px;
}

/* Contenedor de la tabla */
.table-container {
  overflow-x: auto;
  margin: 20px 0;
}

/* Estilos generales de la tabla */
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Asegura que las columnas tengan el mismo ancho */
}

/* Encabezado de la tabla */
.table th {
  width: 40px; /* Ancho fijo para las columnas */
  background-color: #FFFDA4;
  color: #322209;
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  white-space: nowrap; /* Evita el salto de línea en las celdas */
}

/* Celdas del cuerpo de la tabla */
.table td {
  width: 40px; /* Ancho fijo para las columnas */
  text-align: center;
  padding: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  overflow: hidden; /* Oculta el contenido si excede el ancho */
  text-overflow: ellipsis; /* Agrega puntos suspensivos si el texto es largo */
  white-space: nowrap; /* Mantiene el contenido en una sola línea */
}

/* Fila del mensaje de confirmación */
.table .confirm-row td {
  background-color: #f9f9f9; /* Fondo diferenciado */
  padding: 15px;
  text-align: center;
  border: none; /* Sin bordes */
  font-weight: bold;
  color: #444;
}

/* Botones de acción */
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

.button-save {
  color: #2f0cf5;
}

.button-cancel {
  color: #f44336;
}

/* Botón para agregar nuevo platillo */
.button-new {
  background-color: #FE9900;
  color: #FFFEDC;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  text-align: center;
}

.button-new:hover {
  background-color: #FFA500;
}

/* Estilo para ocultar scrollbar horizontal */
.table-container::-webkit-scrollbar {
  height: 8px;
}

.table-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}
</style>


