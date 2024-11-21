<template>
  <div>
    <h2>Ofertas</h2>
    <div class="table-container">
      <table class="offers-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Requisito</th>
            <th>Descripcion</th>
            <th>Descuento</th>
            <th>Fecha Inicio</th>
            <th>Fecha Expiracion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(oferta, index) in ofertas" :key="index">
            <td>{{ oferta.idoferta }}</td>
            <td>{{ oferta.titulo }}</td>
            <td>{{ oferta.requerimiento }}</td>
            <td>{{ oferta.descripcion }}</td>
            <td>{{ oferta.descuento }}%</td>
            <td>{{ oferta.fecha_inicio }}</td>
            <td>{{ oferta.fecha_fin }}</td>
            <td>
              <button class="action-button edit-button"><i class="fas fa-edit"></i></button>
              <button class="action-button delete-button"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="form-container">
      <h2>Agregar Oferta</h2>
      <form @submit.prevent="crearOferta" class="modern-form">
        <div class="form-row">
          <!-- Título -->
          <div class="form-group">
            <label for="titulo">
              <i class="fas fa-heading"></i> Título
            </label>
            <input v-model="nuevaOferta.titulo" id="titulo" type="text" placeholder="Título de la oferta" required />
          </div>

          <!-- Requisito -->
          <div class="form-group">
            <label for="requerimiento">
              <i class="fas fa-tasks"></i> Requisito
            </label>
            <input v-model="nuevaOferta.requerimiento" id="requerimiento" type="text"
              placeholder="Requisito de la oferta" required />
          </div>
        </div>

        <div class="form-row">
          <!-- Descripción -->
          <div class="form-group">
            <label for="descripcion">
              <i class="fas fa-file-alt"></i> Descripción
            </label>
            <input v-model="nuevaOferta.descripcion" id="descripcion" type="text" placeholder="Descripción de la oferta"
              required />
          </div>

          <!-- Descuento -->
          <div class="form-group">
            <label for="descuento">
              <i class="fas fa-percent"></i> Descuento
            </label>
            <input v-model="nuevaOferta.descuento" id="descuento" type="number" min="0" max="100"
              placeholder="Descuento (%)" required />
          </div>
        </div>

        <div class="form-row">
          <!-- Fecha Inicio -->
          <div class="form-group">
            <label for="fecha_inicio">
              <i class="fas fa-calendar-alt"></i> Fecha de Inicio
            </label>
            <input v-model="nuevaOferta.fecha_inicio" id="fecha_inicio" type="date" required />
          </div>

          <!-- Fecha Fin -->
          <div class="form-group">
            <label for="fecha_fin">
              <i class="fas fa-calendar-check"></i> Fecha de Expiración
            </label>
            <input v-model="nuevaOferta.fecha_fin" id="fecha_fin" type="date" required />
          </div>
        </div>

        <div class="form-row">
          <!-- ID Plato -->
          <div class="form-group">
            <div class="form-group custom-combo-box">
              <label for="buscarPlatillo">
                <i class="fas fa-search"></i> Buscar Platillo
              </label>
              <!-- Barra de búsqueda -->
              <input type="text" v-model="filtroPlatillo" placeholder="Buscar platillo por nombre" class="search-box"
                @focus="abrirComboBox" @blur="cerrarComboBox" @input="abrirComboBox" />

              <!-- Lista desplegable -->
              <ul v-if="comboBoxAbierto" class="combo-box-list">
                <li v-for="platillo in platillosFiltrados" :key="platillo.idplato"
                  @click="seleccionarPlatillo(platillo.idplato, platillo.nombre)" class="combo-box-item">
                  {{ platillo.nombre }}
                </li>
                <li v-if="platillosFiltrados.length === 0" class="combo-box-no-results">
                  No se encontraron resultados
                </li>
              </ul>
            </div>
          </div>

          <SuccessModal
            v-if="mostrarModalExito"
            :mensaje="mensajeModal"
            @onClose="cerrarModal"
          />

          <div class="form-group image-upload">
            <label for="src">Imagen</label>
            <div class="upload-area" @drop.prevent="handleFileDrop" @dragover.prevent>
              <div v-if="nuevaOferta.srcPreview" class="image-preview">
                <img :src="nuevaOferta.srcPreview" alt="Previsualización de imagen" />
                <button type="button" class="remove-image" @click="removeImage">✖</button>
              </div>
              <div v-else>
                <i class="fas fa-image"></i>
                <p>Arrastra y suelta una imagen aquí o <span>haz clic para seleccionar</span></p>
                <input type="file" id="src" name="imagen" @change="handleFileChange" accept="image/jpeg, image/png" />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="submit-button">Crear Oferta</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SuccessModal from "@/components/SuccessModal.vue";

export default {
  name: "OfertasAdminComponent",
  components: {
    SuccessModal, // Registra el componente aquí
  },
  data() {
    return {
      mostrarModalExito: false,
      mensajeModal:"Oferta creada con exito!",
      ofertas: [],
      nuevaOferta: {
        titulo: "",
        requerimiento: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        descuento: 0,
        idPlato: null,
        src: null, // Aquí se almacenará el archivo seleccionado
        srcPreview: null,
      },
      platillos: [], // Lista completa de platillos
      filtroPlatillo: "", // Filtro para buscar platillos por nombre
      comboBoxAbierto: false, // Estado del combo box
    };
  },
  mounted() {
    this.obtenerPlatillos();
    this.obtenerOfertas();
  },
  computed: {
    platillosFiltrados() {
      return this.platillos.filter((platillo) =>
        platillo.nombre.toLowerCase().includes(this.filtroPlatillo.toLowerCase())
      );
    },
  },
  methods: {
    async obtenerPlatillos() {
      try {
        const response = await axios.get('http://localhost:5000/api/platillos');
        this.platillos = response.data;
      } catch (error) {
        console.error("Error al obtener los platillos:", error);
      }
    },
    abrirComboBox() {
      this.comboBoxAbierto = true;
    },
    cerrarComboBox() {
      // Cierra el combo box después de un pequeño retraso para permitir seleccionar
      setTimeout(() => {
        this.comboBoxAbierto = false;
      }, 200);
    },
    seleccionarPlatillo(idPlato, nombre) {
      this.nuevaOferta.idPlato = idPlato; // Asigna el ID del platillo seleccionado
      this.filtroPlatillo = nombre; // Rellena la barra de búsqueda con el nombre
      this.comboBoxAbierto = false; // Cierra el combo box
    },
    async obtenerOfertas() {
      try {
        const response = await axios.get('http://localhost:5000/api/ofertas');
        const data = response.data;

        this.ofertas = Array.isArray(data) ? data : [data];
      } catch (error) {
        console.error("Error al obtener las ofertas:", error);
        if (error.response) {
          console.error("Error en la respuesta:", error.response);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
        } else {
          console.error("Error al configurar la solicitud:", error.message);
        }
      }
    },
    async crearOferta() {
      try {
        if (
          !this.nuevaOferta.titulo ||
          !this.nuevaOferta.requerimiento ||
          !this.nuevaOferta.descripcion ||
          !this.nuevaOferta.fecha_inicio ||
          !this.nuevaOferta.fecha_fin ||
          !this.nuevaOferta.descuento ||
          !this.nuevaOferta.idPlato ||
          !this.nuevaOferta.src
        ) {
          alert("Por favor, completa todos los campos antes de enviar.");
          return;
        }

        const formData = new FormData();

        // Agrega los campos al FormData+
        for (let key in this.nuevaOferta) {
          if (key === "src") {
            formData.append("imagen", this.nuevaOferta.src); // Asegúrate de que el archivo se envía con el nombre correcto
          } else if (key !== "srcPreview") {
            formData.append(key, this.nuevaOferta[key]);
          }
        }

        // Enviar datos al backend
        const response = await axios.post("http://localhost:5000/api/ofertas", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Reiniciar el formulario
        this.nuevaOferta = {
          titulo: "",
          requerimiento: "",
          descripcion: "",
          fecha_inicio: "",
          fecha_fin: "",
          descuento: 0,
          idPlato: null,
          src: null,
          srcPreview: null,
        };

        // Actualizar la tabla de ofertas
        this.obtenerOfertas();

        // Mostrar el modal de éxito
        this.mostrarModalExito = true;
      } catch (error) {
        console.error("Error al crear la oferta:", error);
        alert("Ocurrió un error al crear la oferta. Por favor, inténtalo de nuevo.");
      }
    },
    cerrarModal() {
      this.mostrarModalExito = false; // Oculta el modal
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.type === "image/jpeg" || file.type === "image/png") {
          this.nuevaOferta.src = file;
          this.nuevaOferta.srcPreview = URL.createObjectURL(file); // Generar enlace temporal
          console.log("Imagen cargada: ", this.nuevaOferta.srcPreview); // Debug
        } else {
          alert("Solo se permiten archivos JPEG y PNG.");
        }
      }
    },
    handleFileDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file) {
        if (file.type === "image/jpeg" || file.type === "image/png") {
          this.nuevaOferta.src = file;
          this.nuevaOferta.srcPreview = URL.createObjectURL(file); // Generar enlace temporal
          console.log("Imagen cargada (drag & drop): ", this.nuevaOferta.srcPreview); // Debug
        } else {
          alert("Solo se permiten archivos JPEG y PNG.");
        }
      }
    },

    removeImage() {
      this.nuevaOferta.src = null;
      this.nuevaOferta.srcPreview = null;
    },
  }
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  overflow-y: auto;
  max-width: 100%;
  /* Evita que exceda el ancho del contenedor */
  height: 20em;
  margin: 20px 20px;
  box-shadow: 0 0 40px -14px rgba(0, 0, 0, 0.25);
}

.offers-table {
  width: 100%;
  /* Ajusta la tabla al ancho del contenedor */
  min-width: 800px;
  /* Evita que las columnas sean demasiado pequeñas */
  border-collapse: collapse;
  margin: 0 auto;
  /* Centra la tabla dentro del contenedor */
}

.offers-table th,
.offers-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}


.offers-table th {
  position: sticky;
  top: 0;
  /* Mantiene las cabeceras fijas en la parte superior */
  z-index: 1;
  /* Asegura que las cabeceras estén sobre las filas de datos */
  background-color: #f2f2f2;
  /* Fondo fijo para las cabeceras */
  color: #333;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
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

.form-container {
  max-width: 90%;
  /* Ahora ocupa casi todo el ancho de la pantalla */
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modern-form {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  /* Espacio entre columnas */
}

.form-group {
  flex: 1;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="text"],
input[type="date"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #fe9900;
}

.image-upload .upload-area {
  border: 2px dashed #ddd;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.image-upload .upload-area:hover {
  border-color: #fe9900;
}

.image-upload .upload-area i {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #888;
}

.image-upload .upload-area p {
  margin: 0;
  font-size: 1rem;
  color: #555;
}

.image-upload .upload-area span {
  color: #fe9900;
  font-weight: bold;
  cursor: pointer;
}

.image-preview {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 300px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.remove-image {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.remove-image:hover {
  background-color: #d32f2f;
}


.submit-button {
  background-color: #fe9900;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
  /* Alinea el botón a la izquierda */
}

.submit-button:hover {
  background-color: #e08b00;
}

.custom-combo-box {
  position: relative;
}

.search-box {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.combo-box-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 1000;
  list-style: none;
  margin: 5px 0 0;
  padding: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.combo-box-item {
  padding: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.combo-box-item:hover {
  background: #f2f2f2;
}

.combo-box-no-results {
  padding: 10px;
  color: #888;
  font-style: italic;
}
</style>
