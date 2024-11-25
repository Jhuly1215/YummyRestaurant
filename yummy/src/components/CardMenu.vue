<template>
  <div class="menu-card" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="card-inner" :class="{ rotated: hover }">
      <!-- Cara frontal -->
      <div class="card-front">
        <div class="info">
          <img :src="imagen" alt="plato" class="imagen" />
        </div>
        <div class="info">
          <h3>{{ nombre }}</h3>
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
  box-shadow: 0  4px 8px #322209;
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
  background-color: #FE9900;
  color: white;
  transform: rotateY(180deg);
  justify-content: center;
  text-align: center;
}

.imagen {
  width: 100%; 
  aspect-ratio: 1 / 1; 
  object-fit: cover; /* Recorta la imagen para llenar el contenedor */
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

@media (max-width: 768px) {
  .card-inner.rotated {
  transform: rotateY(180deg);
  }
  .menu-card {
    perspective: 1000px;
    width: 45%;

  }
  
}
</style>
