/* eslint-disable */

<template>
  <div>
      <h1>Mapa Interactivo de Mesas</h1>
      <button v-if="rol == 1" @click="mostrarFormulario('añadir')">Añadir Mesa</button>
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

            <label for="capacidad">PosX:</label>
            <input type="number" v-model="mesaForm.posx" />

            <label for="capacidad">PosY:</label>
            <input type="number" v-model="mesaForm.posy"/>

            <button type="submit" style="grid-column: span 2;">Aceptar</button>
            <button type="button" @click="borrarMesaConfirmada" style="grid-column: span 2;">Eliminar</button>
            <button type="button" @click="cerrarModal" style="grid-column: span 2;">Cancelar</button>
            
        </form>

        

      </div>
      <NuevaReserva
            v-if="modalNuevaReservaVisible"
            :titulo="'Nueva Reserva'"
            :idmesa="mesaSeleccionada.idmesa"
            @onClose="cerrarModalNuevaReserva"
        />
  </div>
</template>


<script>
import * as d3 from 'd3';
import { useMesaStore } from '@/stores/mesasStore'; // Importa tu store
import NuevaReserva from "@/ventanas/reservas/reservaMapa.vue";

export default {
    name: "ReservasPage",
    components: {
        NuevaReserva
    },
    data() {
        return {
            mesas: [],
            infoMesa: '',
            rol: null,
            clickTimeout: null,
            mostrarModal: false,
            mostrarModalConfirmacion: false,
            modalNuevaReservaVisible: false,
            modoFormulario: '', // Puede ser 'añadir' o 'editar'
            mesaSeleccionada: {},
            mesaForm: {
                nombre: '',
                capacidad: 1,
                posx: '',
                posy: ''
            }
        };
    },
    created() {
        this.rol = parseInt(localStorage.getItem("rol"), 10); // Asegúrate de convertir a número
    },
    async mounted() {
        const mesaStore = useMesaStore(); // Usa el store de Pinia
        await mesaStore.obtenerMesas(); // Llama a la acción para obtener las mesas
        this.mesas = mesaStore.mesas; // Asigna las mesas del store al array local
        this.crearMapa();
    },
    methods: {
        cerrarModalNuevaReserva() {
        this.modalNuevaReservaVisible = false;
        },
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

                    // Mover el texto con el rectángulo
                    d3.select(this.parentNode).select(".mesa-label")
                        .attr("x", d.x + 40)  // Ajuste para mantener el texto centrado
                        .attr("y", d.y + 25); // Ajuste para mantener el texto centrado verticalmente
                    console.log(`Posición X: ${d.x}, Posición Y: ${d.y}`);
                    
                })
                .on("end", function () {
                    d3.select(this).classed("active", false);
                });

            // Crear los rectángulos de las mesas
            svg.selectAll(".mesa")
            .data(this.mesas)
            .enter()
            .append("rect")
            .attr("class", "mesa")
            .attr("width", 80)
            .attr("height", 40)
            .attr("x", d => d.posx)
            .attr("y", d => d.posy)
            .style("fill", "#c89b3f")
            .style("stroke", "#000")
            .style("cursor", this.rol !== 1 ? "pointer" : "default")
            .call(this.rol == 1 ? drag : () => {}) // Solo aplica el arrastre si rol no es 1
            .on("click", (event, d) => {
                clearTimeout(this.clickTimeout);
                this.clickTimeout = setTimeout(() => {
                    this.rol === 1 ? this.abrirModalNuevaReserva(d) : this.mostrarOpcionesEdicion(d), this.mostrarFormulario('editar');
                }, 200);
            });


            // Crear las etiquetas (nombres) de las mesas
            svg.selectAll(".mesa-label")
                .data(this.mesas)
                .enter()
                .append("text")
                .attr("class", "mesa-label")
                .attr("x", d => d.posx + 40)  // Centrado horizontalmente sobre la mesa
                .attr("y", d => d.posy + 25)  // Ajuste vertical
                .attr("text-anchor", "middle")  // Centrado del texto
                .attr("font-size", "12px")
                .attr("fill", "#000")  // Color del texto
                .text(d => d.nombre);  // Muestra el nombre de la mesa
        },
        abrirModalNuevaReserva(mesa) {
            this.modalNuevaReservaVisible = true;
            this.mesaSeleccionada = mesa;
            // Puedes pasar información de la mesa seleccionada al modal, si es necesario
            console.log(`Abriendo modal de reserva para la mesa: ${mesa.nombre}`);
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
                this.mesaForm = { nombre: '', capacidad: 1};

            }
            this.mostrarModal = true;
            console.log('Modal visible:', this.mostrarModal); // Verifica si se cambia a true
        },
        cerrarModal() {
            this.mostrarModal = false;
            this.mostrarModalConfirmacion = false;
        },
        agregarMesa() {
            const nuevaMesa = { 
                nombre: this.mesaForm.nombre,
                capacidad: this.mesaForm.capacidad,
                posx: 250,  // Las posiciones x e y predeterminadas
                posy: 250
            };
            
            // Usamos el store para crear la nueva mesa
            const mesaStore = useMesaStore();
            mesaStore.crearMesa(nuevaMesa) // Llamamos al store para crear la mesa
                .then(() => {
                    this.cerrarModal();
                    this.actualizarMapa();
                })
                .catch((error) => {
                    console.error('Error al agregar la mesa:', error);
                });
        },
        actualizarMesa() {
            const mesaActualizada = {
                nombre: this.mesaForm.nombre,
                capacidad: this.mesaForm.capacidad,
                posx: this.mesaForm.posx,  // Asegúrate de mantener las posiciones
                posy: this.mesaForm.posy
            };

            // Usamos el store para actualizar la mesa
            const mesaStore = useMesaStore();
            mesaStore.actualizarMesa(this.mesaSeleccionada.idmesa, mesaActualizada) // Llamamos al store para actualizar la mesa
                .then(() => {
                    this.cerrarModal();
                    this.actualizarMapa();
                    // Vuelve a obtener las mesas actualizadas desde el backend
                    mesaStore.obtenerMesas(); // Recarga los datos
                })
                .catch((error) => {
                    console.error('Error al actualizar la mesa:', error);
                });
        },

        mostrarModalBorrar() {
            if (this.mesaSeleccionada) {
                this.mostrarModalConfirmacion = true;
            }
        },
        borrarMesaConfirmada() {
            // Verificar si hay una mesa seleccionada
            if (this.mesaSeleccionada && this.mesaSeleccionada.idmesa) {
                // Confirmar eliminación
                const confirmar = confirm("¿Estás seguro de que deseas eliminar esta mesa?");
                if (confirmar) {
                    // Usamos el store para borrar la mesa
                    const mesaStore = useMesaStore();
                    mesaStore.borrarMesa(this.mesaSeleccionada.idmesa) // Llamamos al store para eliminar la mesa
                        .then(() => {
                            this.cerrarModal();  // Cierra el modal después de eliminar
                            this.actualizarMapa();  // Vuelve a actualizar el mapa
                            mesaStore.obtenerMesas(); // Recarga los datos
                        })
                        .catch((error) => {
                            console.error('Error al borrar la mesa desde el store:', error);
                        });
                }
            } else {
                console.error("No hay mesa seleccionada para eliminar.");
            }
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
