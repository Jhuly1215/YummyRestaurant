<template>
  <div>
    <h1>Dashboard</h1>
    <div class="first-data-container">
      <div class="cantidad-container"></div>
      <div class="ingresos-container"></div>
      <div class="resenia-container"></div>
    </div>

    <!-- Contenedor para los gráficos -->
    <div class="charts-container">
      <LineChartDia :data="dataG1" chart-title="Ingresos Totales por Día" />
      <BarChartMes :data="dataG2" chart-title="Ingresos Totales por Mes" />
      <RadarChartConsumo :data="dataG3" chart-title="Consumo por Horas" />
      <PieChartProductos :data="dataG4" chart-title="Productos mas vendidos" />
      <BarChartResenia :data="dataG5" chart-title="Reseñas por Platillos" />
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import LineChartDia from '../components/graficos/LineChartVentas.vue';
import BarChartMes from '../components/graficos/BarChartVentasMes.vue';
import RadarChartConsumo from '../components/graficos/RadarChartConsumo.vue';
import PieChartProductos from '../components/graficos/PieChartProductos.vue';
import BarChartResenia from '../components/graficos/BarChartResenia.vue';

export default {
  components: {
    LineChartDia,
    BarChartMes,
    RadarChartConsumo,
    PieChartProductos,
    BarChartResenia,
  },
  data() {
    return {
      dataG0: [],
      dataG1: [],
      dataG2: [],
      dataG3: [],
      dataG4: [],
      dataG5: [],
    };
  },
  mounted() {
    this.fetchIngresosPorDia(); // Vuelve a cargar los datos al entrar
    this.fetchIngresosPorMes();
    this.fetchConsumoPorHoras();
    this.fetchProductosMasVendidos();
    this.fetchReseniaPorPlatos();
  },
  methods: {
    async fetchIngresosPorDia() {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/ingresos-dia');
        const apiData = response.data;

        // Formatea los datos en el formato {x, y}
        this.dataG1 = apiData.map((item) => ({
          x: item.fecha,
          y: item.ingresos
        }));

        console.log('Data (ingresos formateados):', this.data);
      } catch (error) {
        console.error('Error al obtener los ingresos por día:', error);
      }
    },

    async fetchIngresosPorMes() {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/ingresos-mes');
        const apiData = response.data;

        // Formatea los datos en el formato {x, y}
        this.dataG2 = apiData.map((item) => ({
          x: item.mes,
          y: item.total_ventas
        }));
      } catch (error) {
        console.error('Error al obtener los ingresos por día:', error);
      }
    },

    async fetchConsumoPorHoras() {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/consumo-hora');
        const apiData = response.data;

        // Formatea los datos en el formato {x, y}
        this.dataG3 = apiData.map((item) => ({
          x: item.hora,
          y: item.total_pedidos
        }));
        console.log('Data (ingresos formateados) RADAR:', this.dataG3);
      } catch (error) {
        console.error('Error al obtener los ingresos por día:', error);
      }
    },

    async fetchProductosMasVendidos() {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/productos-mas-vendidos');
        const apiData = response.data;

        // Formatea los datos en el formato {x, y}
        this.dataG4 = apiData.map((item) => ({
          x: item.nombre,
          y: item.total_vendidos
        }));
        console.log('Data (ingresos formateados) RADAR:', this.dataG3);
      } catch (error) {
        console.error('Error al obtener los ingresos por día:', error);
      }
    },

    async fetchReseniaPorPlatos() {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/resenias-plato');
        const apiData = response.data;

        this.dataG5 = apiData.map((item) => ({
          nombre_plato: item.nombre_plato,
          promedio_resenia: item.promedio_resenia,
          total_resenias: item.total_resenias,
        }));
      } catch (error) {
        console.error('Error al obtener reseñas por platos:', error);
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  /* Elimina scroll lateral de toda la página */
  width: 100vw;
  /* Limita el ancho de la página */
  box-sizing: border-box;
}

.first-data-container {
  padding: 1.5em 1.5em;
  display: flex;
  gap: 10em;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.cantidad-container {
  width: 15em;
  height: 10em;
  background-color: #FE9900;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgb(0, 0, 0, 0.25);
}

.ingresos-container {
  width: 15em;
  height: 10em;
  background-color: #FE9900;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgb(0, 0, 0, 0.25);
}

.resenia-container {
  width: 15em;
  height: 10em;
  background-color: #FE9900;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgb(0, 0, 0, 0.25);
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* Dos columnas */
  grid-gap: 1.5em;
  /* Espacio entre gráficos */
  padding: 1em;
  /* Espaciado interno */
  max-width: 100%;
  /* Evita que el contenedor exceda la pantalla */
  margin: 0 auto;
  /* Centra el contenedor */
  overflow-x: hidden;
  /* Elimina scroll lateral */
  box-sizing: border-box;
  /* Incluye padding en el ancho total */
}

/* El último gráfico ocupa todo el ancho */
.charts-container>*:nth-child(5) {
  grid-column: span 2;
  /* Ocupa las dos columnas */
}

/* Configuración general para los gráficos */
.charts-container>* {
  background-color: #ffffff;
  /* Fondo blanco */
  border: 1px solid #ddd;
  /* Borde ligero */
  border-radius: 10px;
  /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Sombra ligera */
  padding: 1em;
  max-width: calc(100% - 2em);
  /* Asegura que los gráficos no excedan el ancho */
  box-sizing: border-box;
  /* Padding no afecta el ancho */
}
</style>