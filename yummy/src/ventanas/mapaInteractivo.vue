/* eslint-disable */

<template>
  <div>
      <h1>Mapa Interactivo de Mesas</h1>
      <button @click="mostrarFormulario('añadir')">Añadir Mesa</button>
      <svg ref="mapa" width="800" height="600"></svg>
      <div id="info-mesa">{{ infoMesa }}</div>

      <!-- Fondo semitransparente -->
      <div v-if="mostrarModal" class="overlay" @click="cerrarModal"></div>

      <!-- Modal para añadir/editar mesa -->
      <div v-if="mostrarModal" class="modal">
          <h2>{{ modoFormulario === 'añadir' ? 'Añadir Mesa' : 'Editar Mesa' }}</h2>
          <form @submit.prevent="modoFormulario === 'añadir' ? agregarMesa() : actualizarMesa()">
            <label for="nombre">Nombre:</label>
            <input type="text" v-model="mesaForm.nombre" required />

            <label for="capacidad">Capacidad:</label>
            <input type="number" v-model="mesaForm.capacidad" min="1" required />

            <label for="x">Posición X:</label>
            <input type="number" v-model="mesaForm.x" required />

            <label for="y">Posición Y:</label>
            <input type="number" v-model="mesaForm.y" required />

            <button type="submit" style="grid-column: span 2;">Aceptar</button>
            <button type="button" @click="cerrarModal" style="grid-column: span 2;">Cancelar</button>
        </form>

      </div>
  </div>
</template>


<script>

import * as d3 from 'd3';

export default {
    name: "ReservasPage",
    components: {
  
    },
    data() {
        return {
            mesas: [
                { id: 1, nombre: 'Mesa 1', capacidad: 4, x: 100, y: 100 },
                { id: 2, nombre: 'Mesa 2', capacidad: 2, x: 300, y: 150 },
                { id: 3, nombre: 'Mesa 3', capacidad: 6, x: 500, y: 200 },
            ],
            infoMesa: '',
            clickTimeout: null,
            mostrarModal: false,
            mostrarModalConfirmacion: false,
            modoFormulario: '', // Puede ser 'añadir' o 'editar'
            mesaSeleccionada: null,
            mesaForm: {
                id: null,
                nombre: '',
                capacidad: 1,
                x: 0,
                y: 0
            }
        };
    },
    mounted() {
        this.crearMapa();
    },
    methods: {
        crearMapa() {
            const svg = d3.select(this.$refs.mapa);
            const drag = d3.drag()
                .on("start", function (event, d) {
                    d3.select(this).raise().classed("active", true);
                })
                .on("drag", function (event, d) {
                    d.x = event.x;
                    d.y = event.y;
                    d3.select(this).attr("x", d.x).attr("y", d.y);
                })
                .on("end", function () {
                    d3.select(this).classed("active", false);
                });

            svg.selectAll(".mesa")
                .data(this.mesas)
                .enter()
                .append("rect")
                .attr("class", "mesa")
                .attr("width", 80)
                .attr("height", 40)
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .style("fill", "#c89b3f")
                .style("stroke", "#000")
                .style("cursor", "pointer")
                .call(drag)
                .on("click", (event, d) => {
                    clearTimeout(this.clickTimeout);
                    this.clickTimeout = setTimeout(() => {
                        this.mostrarInfo(d);
                        this.mostrarOpcionesEdicion(d);
                    }, 200);
                });
        },
        mostrarInfo(mesa) {
            this.infoMesa = `Mesa: ${mesa.nombre}, Capacidad: ${mesa.capacidad}`;
        },
        mostrarOpcionesEdicion(mesa) {
            this.mesaSeleccionada = mesa;
            // Mostrar botones de editar y borrar
        },
        mostrarFormulario(modo) {
          this.modoFormulario = modo;
          if (modo === 'editar' && this.mesaSeleccionada) {
              this.mesaForm = { ...this.mesaSeleccionada };
          } else {
              this.mesaForm = { id: null, nombre: '', capacidad: 1, x: 0, y: 0 };
          }
          this.mostrarModal = true;
          console.log('Modal visible:', this.mostrarModal); // Verifica si se cambia a true
      },

        cerrarModal() {
            this.mostrarModal = false;
            this.mostrarModalConfirmacion = false;
        },
        agregarMesa() {
            const nuevaMesa = { ...this.mesaForm, id: Date.now() };
            this.mesas.push(nuevaMesa);
            this.cerrarModal();
            this.actualizarMapa();
        },
        actualizarMesa() {
            const index = this.mesas.findIndex(m => m.id === this.mesaForm.id);
            if (index !== -1) {
                this.mesas.splice(index, 1, { ...this.mesaForm });
                this.cerrarModal();
                this.actualizarMapa();
            }
        },
        mostrarModalBorrar() {
            if (this.mesaSeleccionada) {
                this.mostrarModalConfirmacion = true;
            }
        },
        borrarMesaConfirmada() {
            this.mesas = this.mesas.filter(m => m.id !== this.mesaSeleccionada.id);
            this.mesaSeleccionada = null;
            this.cerrarModal();
            this.actualizarMapa();
        },
        actualizarMapa() {
            d3.select(this.$refs.mapa).selectAll(".mesa").remove();
            this.crearMapa();
        }
    }
};
</script>

<style scoped>
.mesa {
    transition: fill 0.2s;
}
.mesa.active {
    stroke: #f00;
    stroke-width: 2px;
}
.modal {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    height: auto; /* Ajusta la altura para que sea más corta */
    max-height: 400px; /* Establece una altura máxima */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    overflow-y: auto; /* Permite desplazarse si hay contenido extra */
}

.modal form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.modal form label {
    grid-column: span 2; /* Hace que las etiquetas ocupen ambas columnas */
}

.modal form input {
    grid-column: span 2; /* Hace que los campos de entrada ocupen ambas columnas */
}

.modal form button {
    grid-column: span 1;
}


/* Fondo semitransparente detrás del modal */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo negro semitransparente */
    z-index: 999;
}


button {
    margin: 5px;
}
</style>
