<template>
    <div class="menu-card">
      <!-- Muestra la imagen estática en lugar de recibirla como prop -->
      <img src="https://cdn0.bodas.com.mx/article-vendor/0940/3_2/960/jpg/-mg-0925_5_140940-1552761878.jpeg" alt="plato" class="imagen">
      
      <div class="info">
        <h2>{{ nombre }}</h2>
        <p>{{ descripcion }}</p>
        <p>{{ precio }}</p>
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
    }
  }
  </script>
  
  <style scoped>
  .menu-card {
    display: flex;
    flex-direction: row;
    width: 45%;
    max-width: 600px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
    background-color: #fff;
    align-items: center;
    gap: 20px;
  }
  
  .menu-card:hover {
    transform: scale(1.02);
  }
  
  .imagen {
    width: 250px;
    height: auto;
    border-radius: 10px;
  }
  
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-grow: 1;
  }
  
  .btn {
    background-color: #003366;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease-in-out;
    align-self: center;
  }
  
  .btn:hover {
    background-color: #0055aa;
  }
  </style>
  