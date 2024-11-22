<template>
    <div class="filtro-categorias">
      <!-- Opción de 'Todos' siempre disponible y activa al inicio -->
      <button
        @click="seleccionarCategoria(null)"
        :class="{ active: categoriaSeleccionada === null }"
      >
        Todos
      </button>
      
      <!-- Itera sobre cada categoría obtenida y muestra el tipo -->
      <button
        v-for="(categoria, index) in categorias"
        :key="index"
        @click="seleccionarCategoria(categoria.idcategoria)"
        :class="{ active: categoriaSeleccionada === categoria.idcategoria }"
      >
        {{ categoria.tipo }}
      </button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'FiltroCategorias',
    data() {
      return {
        categorias: [], // Almacena las categorías obtenidas
        categoriaSeleccionada: null, // Marca "Todos" como activo al inicio
      };
    },
    mounted() {
      this.obtenerCategorias();
    },
    methods: {
      async obtenerCategorias() {
        try {
          const response = await axios.get('http://localhost:5000/api/categorias');
          this.categorias = response.data;
        } catch (error) {
          console.error("Error al obtener las categorías:", error);
        }
      },
      seleccionarCategoria(idCategoria) {
        this.categoriaSeleccionada = idCategoria; // Actualiza la categoría seleccionada
        this.$emit('categoriaSeleccionada', idCategoria);
      },
    },
  };
  </script>
  
  <style scoped>
  .filtro-categorias {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 10px;
    white-space: nowrap;
    width: 100%;
    justify-content: center;
  }
  
  .filtro-categorias button {
    background-color: #FFFEDC; /* Color de fondo para categorías no seleccionadas */
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    transition: background-color 0.3s;
  }
  
  .filtro-categorias button.active {
    background-color: #FE9900; /* Color de fondo para categoría seleccionada */
    color: white;
  }
  </style>
  