<template>
    <div class="overlay" v-if="mostrar">
      <div class="modal">
        <p>¿Seguro de que quiere eliminar {{ nombrePlatillo }}?</p>
        <div class="botones">
          <button @click="confirmarEliminacion" class="button-delete">Eliminar</button>
          <button @click="cancelar" class="button-cancel">Cancelar</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
name: "ConfirmacionEliminar",
props: {
    mostrar: Boolean,             // Controla si se muestra la ventana
    nombrePlatillo: String,       // Nombre del platillo a eliminar
    idPlatillo: Number            // ID del platillo a eliminar
},
methods: {
    confirmarEliminacion() {
    this.$emit('confirmarEliminacion', this.idPlatillo);
    },
    cancelar() {
    this.$emit('cancelar');  // cerrar la ventana
    }
}
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1003; /* Asegura que esté en la parte superior */
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  max-width: 90%; /* Asegura que el modal sea visible en pantallas pequeñas */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1001; /* Superior al overlay para que sea visible */
}

.botones {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.button-delete {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.button-cancel {
  background-color: #ccc;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
