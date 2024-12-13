<template>
  <div>
    <HeaderAdminTitle 
      icon="fa fa-cutlery" 
      title="Platillos" 
      subtitle="Visualiza los platillos que ofrese tu restaurante"
    />

    <!-- Modal para eliminar -->
    <ConfirmationModal
      v-if="modalVisible"
      :mensaje="`¿Seguro que desea eliminar el platillo ${platilloAEliminar.nombre}?`"
      @onCancel="cerrarModal"
      @onConfirm="eliminarPlatillo"
    />

    <!-- Modal para destacar -->
    <ConfirmationModal
      v-if="modalParaDestacarVisible"
      :mensaje="modalMensaje"
      @onCancel="cerrarModalDestacar"
      @onConfirm="toggleDestacadoConfirmado"
    />

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <!--<th>Imagen</th>-->
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(platillo, index) in platillos" :key="index">
            <td>{{ platillo.idplato }}</td>
            <td>{{ platillo.nombre }}</td>
            <td>{{ platillo.descripcion }}</td>
            <td>{{ platillo.precio }} Bs.</td>
            <td>{{ platillo.tipo }}</td>
            <!-- <td>{{ platillo.imagen }}</td> -->

            <td class="botones">
              <!-- Botón de edición -->
              <button class="action-button edit-button" @click="mostrarModalEditar(platillo)">
                <i class=" fas fa-edit"></i>
              </button>
              <!-- Botón de eliminación -->
              <button class="action-button delete-button" @click="mostrarModalEliminar(platillo)">
                <i class="fas fa-trash"></i>
              </button>

              <!-- Botón para destacar -->
              <button
                @click="mostrarModalDestacar(platillo)"
                class="action-button star-button"
              >
                <i :class="platillo.estado === 2 ? 'fas fa-star' : 'far fa-star'"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <FormNewPlatillo />
    </div>

    <FormEditPlatillo 
      v-if="ModalEditar" 
      :platillo="platilloAEditar" 
      @onCancel="cerrarModalEditar"
      @onPlatilloEditada="actualizarListaPlatillos" 
    />

    <SuccessModal
      v-if="successModalVisible"
      :mensaje="successMensaje"
      @onClose="closeSuccessModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal.vue';
import FormNewPlatillo from './FormNewPlatillo.vue';
import SuccessModal from './SuccessModal.vue';
import HeaderAdminTitle from './HeaderAdminTitle.vue';
import FormEditPlatillo from './FormEditPlatillo.vue';

export default {
  name: "PlatillosAdminComponent",
  components: { 
    ConfirmationModal,
    FormNewPlatillo,
    SuccessModal,
    HeaderAdminTitle, 
    FormEditPlatillo,
  },
  data() {
    return {
      platillos: [],
      filaEnEdicion: null,
      platilloAEditar: {},
      platilloAEliminar: {}, // Platillo que se desea eliminar
      platilloADestacar: {}, // Platillo que se desea destacar
      modalVisible: false, // Modal para eliminar
      modalParaDestacarVisible: false, // Modal para destacar
      successModalVisible: false,
      modalMensaje: '', // Mensaje del modal para destacar/desdestacar
      successMensaje: '',
      ModalEditar: false,
      platilloSeleccionado: null,
    };
  },
  mounted() {
    this.obtenerPlatillos();
  },
  methods: {
    async obtenerPlatillos() {
      try {
        const response = await axios.get('http://localhost:5000/api/platillos');
        this.platillos = response.data.map(platillo => ({
          ...platillo,
          estado: platillo.estado || 0, // Asegúrate de que el estado esté definido
        }));
      } catch (error) {
        console.error("Error al obtener los platillos:", error);
      }
    },

    mostrarModalEditar(platillo) {
      console.log("Platillo enviado: ", platillo)
      this.ModalEditar = true;
      this.platilloAEditar = platillo;
    },
    async actualizarListaPlatillos() {
      try {
        await this.obtenerPlatillos(); // Refresca la lista de platillos
        this.mostrarSuccessModal("Platillo editado correctamente");
        this.cerrarModalEditar();
      } catch (error) {
        console.error("Error al actualizar la lista de platillos:", error);
        this.mostrarSuccessModal("Error al actualizar la lista de platillos.");
      }
    },
    cerrarModalEditar() {
      this.ModalEditar = false;
      this.platilloAEditar = {}; // Limpia los datos del platillo seleccionado
    },
    async eliminarPlatillo() {
      try {
        await axios.put(`http://localhost:5000/api/platillos/desactivar/${this.platilloAEliminar.idplato}`);
        this.platillos = this.platillos.filter(p => p.idplato !== this.platilloAEliminar.idplato);
        this.cerrarModal();
        this.mostrarSuccessModal('Platillo eliminado correctamente');
      } catch (error) {
        console.error("Error al eliminar el platillo:", error);
        this.mostrarSuccessModal('Error al eliminar el platillo');
      }
    },
    mostrarModalDestacar(platillo) {
      this.platilloADestacar = platillo;
      this.modalMensaje = `¿Quieres ${platillo.estado === 2 ? 'quitar el destaque' : 'destacar'} el platillo "${platillo.nombre}"?`;
      this.modalParaDestacarVisible = true;
    },
    cerrarModalDestacar() {
      this.modalParaDestacarVisible = false;
    },
    async toggleDestacadoConfirmado() {
      try {
        // Realiza la solicitud para cambiar el estado
        const response = await axios.put(
          `http://localhost:5000/api/platillos/toggle-destacado/${this.platilloADestacar.idplato}`
        );

        // Verifica si la respuesta tiene un nuevo estado válido
        if (response.data && typeof response.data.nuevoEstado === 'number') {
          // Encuentra el índice del platillo en el array local
          const index = this.platillos.findIndex(
            (p) => p.idplato === this.platilloADestacar.idplato
          );

          if (index !== -1) {
            // Actualiza el estado del platillo en el array local
            this.platillos[index].estado = response.data.nuevoEstado;
            this.$forceUpdate(); 
            // Opcional: Muestra un mensaje de éxito
            this.mostrarSuccessModal(`El platillo "${this.platilloADestacar.nombre}" ahora está ${response.data.nuevoEstado === 2 ? 'destacado' : 'no destacado'}.`);
          }
        } else {
          this.mostrarSuccessModal('Error en la respuesta del servidor.');
        }
      } catch (error) {
        console.error('Error al cambiar el estado del platillo:', error);
        this.mostrarSuccessModal('Error al cambiar el estado del platillo.');
      } finally {
        // Cierra el modal para destacar
        this.cerrarModalDestacar();
      }
    },
    mostrarModalEliminar(platillo) {
      this.platilloAEliminar = platillo;
      this.modalVisible = true;
    },
    mostrarSuccessModal(mensaje) {
      this.successMensaje = mensaje;
      this.successModalVisible = true;
    },
    closeSuccessModal() {
      this.successModalVisible = false;
    },
    cerrarModal() {
      this.modalVisible = false;
    },
  },
};
</script>

<style scoped>
/* Encabezado principal */
.offers-header {
  text-align: center;
  background: linear-gradient(180deg, #ff9900, #ffcc00);
  color: white;
  padding: 20px 10px;
  border-radius: 0 0 15px 15px;
  /* Redondeo en las esquinas inferiores */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  /* Sombra para dar profundidad */
  margin-bottom: 20px;
}

/* Título principal */
.offers-header h2 {
  font-size: 2.5em;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* Espacio entre el texto y el icono */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* Sombra del texto */
}

/* Icono decorativo */
.offers-header h2 i {
  font-size: 0.8em;
  color: #ffd700;
  /* Color dorado para el icono */
  animation: bounce 1s infinite;
  /* Animación de rebote */
}

/* Subtítulo */
.offers-header p {
  font-size: 1.2em;
  margin-top: 10px;
  color: #fff8e7;
  /* Color claro para contraste */
  font-style: italic;
}

/* Contenedor de la tabla */
.table-container {
  overflow-x: auto;
  margin: 20px 0;
}

/* Estilos generales de la tabla */
.table {
  margin-left: 10px;
  width: 90%;
  table-layout: fixed; /* Asegura que las columnas tengan el mismo ancho */
}

/* Encabezado de la tabla */
.table th {
  background-color: #FFFDA4;
  color: #322209;
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  white-space: nowrap; /* Evita el salto de línea en las celdas */
}

/* Celdas del cuerpo de la tabla */
.table td {
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

.star-button {
  color: #FE9900;
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


