<template>
  <div>
    <button class="floating-button" @click="toggleModal">
      <i class="fas fa-utensils"></i>
    </button>
    <transition name="fade">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="toggleModal">
        <div class="modal-content">
          
            <h2>Tu Pedido</h2>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Platillo</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="platillo in platillosSeleccionados" :key="platillo.idplato">
                    <td>{{ platillo.nombre }}</td>
                    <td>{{ platillo.precio }} Bs.</td>
                    <td>{{ platillo.cantidad }}</td>
                    <td>{{ platillo.subtotal }} Bs.</td>
                  </tr>
                </tbody>
              </table>
              <tfoot>
                <tr>
                  <td colspan="3" style="text-align: right;"><strong>Total</strong></td>
                  <td><strong>{{ total }} Bs.</strong></td>
                </tr>
              </tfoot>

            </div>
          <button class="close-button" @click="toggleModal">Cerrar</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ListaProductosPedidos",
  props: {
    cantidadesSeleccionadas: {
      type: Object,
      required: true,
    },
    platillos: {
      type: Array,
      required: true,
    },
  },
  computed: {
    platillosSeleccionados() {
      return this.platillos
        .filter(p => this.cantidadesSeleccionadas[p.idplato] > 0)
        .map(p => ({
          ...p,
          cantidad: this.cantidadesSeleccionadas[p.idplato],
          subtotal: this.cantidadesSeleccionadas[p.idplato] * p.precio,
        }));
    },
    total() {
      return this.platillosSeleccionados.reduce((sum, p) => sum + p.subtotal, 0);
    },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
      if (this.isModalOpen) {
        const seleccionados = this.platillosSeleccionados.map(platillo => ({
          id: platillo.idplato,
          nombre: platillo.nombre,
          precio: platillo.precio,
          cantidad: platillo.cantidad,
          subtotal: platillo.subtotal
        }));
        console.log("Productos seleccionados:", seleccionados);
      }
    },
  },

};
</script>

<style scoped>
.floating-button {
  position: fixed;
  top: 50px;
  right: 0px;
  background-color: #322209;
  color: white;
  border: none;
  border-radius: 50% 0 0 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  width: 70%;
  background-color: #FFFEDC;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  padding: 20px;
}

.table-container {
  overflow-x: auto;
  width: 100%;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 12px;
}

.table th {
  background-color: #FFFDA4;
  color: #322209;
  text-align: center;
}

.table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.table tfoot tr td {
  background-color: #FFFDA4;
  font-weight: bold;
  text-align: center;
}

h2 {
  color: #322209;

}

.close-button {
  background-color: #ccc;
  color: black;
  border: none;
  padding: 10px;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
}

.close-button:hover {
  background-color: #807f7f;
}

</style>
