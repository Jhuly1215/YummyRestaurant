<template>
  <div class="menu-card">
    <!-- Cara frontal -->
    <div class="card-front">
      <div class="info">
        <img :src="imagen" alt="plato" class="imagen" />
      </div>
      <div class="info">
        <div>
          <h3>{{ nombre }}</h3>
          <p>{{ precio }} Bs.</p>
        </div>
        <div>
          <button class="button-add">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardMenuPedido',
  props: {
    imagen: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    precio: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.menu-card {
  perspective: 1000px;
  width: 45%;
  height: 210px;
}

.card-front {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0 4px 10px #322209;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  background-color: #fff;
}

.imagen {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
}

.info {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.button-add {
  color: #FFFEDC;
  border: 0;
  background-color: #322209;
  padding: 10px 15px 10px 15px;
  border-radius: 100px;
}

@media (max-width: 768px) {
  .menu-card {
    width: 100%;
  }
}
</style>
