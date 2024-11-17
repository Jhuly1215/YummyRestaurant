/* eslint-disable */

<template>
    <NavbarComponent />
    <div>
    <h1>Mapa Interactivo de Mesas</h1>
        <svg ref="mapa" width="800" height="600"></svg>
        <div id="info-mesa">{{ infoMesa }}</div>
    </div>
    <FooterComponent />
  </template>
  
  <script>
  import NavbarComponent from '@/components/Navbar.vue';
  import FooterComponent from '@/components/Footer.vue';
  import * as d3 from 'd3';

  export default {
    name: "ReservasPage",
    components: {
      NavbarComponent,
      FooterComponent,
      
    },
    data() {
    return {
      mesas: [
        { id: 1, nombre: 'Mesa 1', capacidad: 4, x: 100, y: 100 },
        { id: 2, nombre: 'Mesa 2', capacidad: 2, x: 300, y: 150 },
        { id: 3, nombre: 'Mesa 3', capacidad: 6, x: 500, y: 200 },
      ],
      infoMesa: ''
    };
  },
  mounted() {
    this.crearMapa();
  },
  methods: {
    crearMapa() {
      const svg = d3.select(this.$refs.mapa);
      // Definir el comportamiento de arrastre
    const drag = d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

      svg.selectAll(".mesa")
        .data(this.mesas)
        .enter()
        .append("rect")
        .attr("class", "mesa")
        .attr("width", 80)
        .attr("height", 40)
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .on("click", d => this.mostrarInfo(d))
        .style("fill", "#c89b3f")
        .style("stroke", "#000")
        .style("cursor", "pointer");
        // Funciones para manejar el arrastre
  function dragstarted(event, d) {
    d3.select(this).raise().classed("active", true);
  }

  function dragged(event, d) {
    // Actualiza las coordenadas x e y de la mesa
    d.x = event.x; // Coordenada x del cursor
    d.y = event.y; // Coordenada y del cursor

    // Actualiza la posición del rectángulo
    d3.select(this)
      .attr("x", d.x)
      .attr("y", d.y);
  }

  function dragended(event, d) {
    d3.select(this).classed("active", false);
  }
      
    },
    mostrarInfo(mesa) {
      this.infoMesa = `Mesa: ${mesa.nombre}, Capacidad: ${mesa.capacidad}`;
    }
  }
  };
  </script>
  
  <style scoped>
  .container {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
  }
  .mesa {
  transition: fill 0.2s;
}
  .table {
    margin-top: 20px;
  }
  .table th, .table td {
    text-align: center;
  }
  .btn-back {
    background-color: #c89b3f; 
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    display: block;
    margin: 20px auto;
  }
  .btn-back:hover {
    background-color: #8c6f25; 
  }
  </style>
  