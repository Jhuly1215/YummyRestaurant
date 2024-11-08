<template>
  <div class="menu-card" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="card-inner" :class="{ rotated: hover }">
      <!-- Cara frontal -->
      <div class="card-front">
        <img src="https://i.pinimg.com/564x/9b/ec/a7/9beca7153757bbc850c276f0601c794f.jpg" alt="plato" class="imagen" />
        <div class="info">
          <h2>{{ nombre }}</h2>
          <p>{{ precio }} Bs.</p>
        </div>
      </div>
      <!-- Cara trasera -->
      <div class="card-back">
        <p>{{ descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardMenu',
  props: {
    // Comentado para que no se requiera pasar la imagen como prop por ahora
    // imagen: {
    //   type: String,
    //   required: true
    // },
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
  },
  data() {
    return {
      hover: false
    };
  }
};
</script>

<style scoped>
.menu-card {
  perspective: 1000px;
  width: 45%;
  height: 210px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card-inner.rotated {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 10px #7c5b27;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
}

.card-front {
  background-color: #fff;
}

.card-back {
  background-color: #ffd275;
  color: white;
  transform: rotateY(180deg);
  justify-content: center;
  text-align: center;
}

.imagen {
  width: 180px;
  height: auto;
  border-radius: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
