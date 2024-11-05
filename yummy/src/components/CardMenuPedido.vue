<template>
<div class="menu-card">
    <img :src="imagen" alt="plato" class="imagen">
    <div class="info">
    <h2>{{ nombre }}</h2>
    <p>{{ descripcion }}</p>
    <p>{{ precio }}</p>
    <router-link to="#">
        <button class="btn">Agregar</button> <!--Esto luego lo cambio por el ícono-->
    </router-link>
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
background-color: #FFAB5E;
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
