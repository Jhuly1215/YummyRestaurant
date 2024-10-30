<template>
<div class="menu-card">
    <img src="" alt="plato" class="imagen">
    <div class="info">
    <h2>Nombre plato</h2>
    <p>Descripción plato</p>
    <router-link to="#">
        <button class="btn">Agregar</button>
    </router-link>
    </div>
</div>
</template>

<script>

</script>

<style scoped>

.menu-card {
  display: flex;
  flex-direction: row;
  width: 45%;
  max-width: 600px;
  padding: 20px;
  border-radius: 15px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
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

.carreras-container h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.carreras-container p {
  font-size: 1rem;
  margin-bottom: 20px;
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