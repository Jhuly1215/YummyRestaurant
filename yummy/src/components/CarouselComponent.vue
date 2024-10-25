<template>
  <div id="perfumeCarousel" class="carousel slide" data-bs-ride="carousel">
    <!-- Indicadores -->
    <div class="carousel-indicators">
      <button
        v-for="(image, index) in images"
        :key="index"
        type="button"
        :data-bs-target="'#perfumeCarousel'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        :aria-current="index === 0 ? 'true' : null"
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>

    <!-- Carrusel de Imágenes -->
    <div class="carousel-inner">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <img :src="image.src" :alt="image.alt" class="d-block w-100">
      </div>
    </div>

    <!-- Controles Anterior y Siguiente -->
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#perfumeCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#perfumeCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "CarouselComponent",
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [
        {
          src: "https://medias.carolinaherrera.com/cdn-cgi/image/width=2400,quality=90/medias/sys_master/images/hb0/h05/10087351975966/HEROBANNER-MAKEUP-EYELINER/HEROBANNER-MAKEUP-EYELINER.jpg",
          alt: "Imagen 1"
        },
        {
          src: "https://medias.carolinaherrera.com/cdn-cgi/image/width=2400,quality=90/medias/sys_master/images/h74/h66/10076795306014/HEROBANNER-HOME-GGBE/HEROBANNER-HOME-GGBE.jpg",
          alt: "Imagen 2"
        },
        {
          src: "https://medias.carolinaherrera.com/cdn-cgi/image/width=2400,quality=90/medias/sys_master/images/hfb/h8e/10109589291038/HEROBANNER-HOME-FS-S25-2/HEROBANNER-HOME-FS-S25-2.jpg",
          alt: "Imagen 3"
        }
      ]
    }
  }
};
</script>

<style scoped>
.carousel-item img {
  height: 60vh;
  object-fit: cover;
}
</style>
