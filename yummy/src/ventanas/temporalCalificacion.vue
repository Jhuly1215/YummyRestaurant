<template>
    <div>
      <button @click="openModal" class="open-modal-button">Abrir Modal</button>
      <StarRatingModal
        :show="isModalOpen"
        @close="closeModal"
        @submitted="handleSubmitted"
      />
    </div>
  </template>
  
  <script>
  import StarRatingModal from "../components/ExpCalificacion.vue";
  
  export default {
    name: "TemporalCalificacion",
    components: {
      StarRatingModal,
    },
    data() {
      return {
        isModalOpen: false,
      };
    },
    methods: {
      openModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      handleSubmitted(rating) {
        console.log("Calificación enviada:", rating);
       
      },
    },
  };
  </script>
  
  <style scoped>
  .open-modal-button {
    background-color: #ffab5e;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .open-modal-button:hover {
    background-color: #e69a4c;
  }
  </style>
  