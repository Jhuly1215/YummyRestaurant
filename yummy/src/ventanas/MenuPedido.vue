<template>
    <div>
      <NavbarComponent />
      <div class="main">
        <div class="cards">
          <!-- Varias tarjetas CardMenu -->
          <CardMenuPedido
            :imagen="'https://cdn0.bodas.com.mx/article-vendor/0940/3_2/960/jpg/-mg-0925_5_140940-1552761878.jpeg'"
            nombre="Nombre del plato 1"
            descripcion="Descripción del plato 1"
            precio="###"
          />
          <CardMenuPedido
            :imagen="'https://cdn0.bodas.com.mx/article-vendor/0940/3_2/960/jpg/-mg-0925_5_140940-1552761878.jpeg'"
            nombre="Nombre del plato 1"
            descripcion="Descripción del plato 1"
            precio="###"
          />
          <CardMenuPedido
            :imagen="'https://cdn0.bodas.com.mx/article-vendor/0940/3_2/960/jpg/-mg-0925_5_140940-1552761878.jpeg'"
            nombre="Nombre del plato 1"
            descripcion="Descripción del plato 1"
            precio="###"
          />
          <CardMenuPedido
            :imagen="'https://cdn0.bodas.com.mx/article-vendor/0940/3_2/960/jpg/-mg-0925_5_140940-1552761878.jpeg'"
            nombre="Nombre del plato 1"
            descripcion="Descripción del plato 1"
            precio="###"
          />

        </div>
      </div>
      <FooterComponent />
    </div>
</template>
  
<script>
import NavbarComponent from '@/components/Navbar.vue';
import FooterComponent from '@/components/Footer.vue';
import CardMenuPedido from '@/components/CardMenuPedido.vue';


export default {
name: 'MenuCliente',
components: {
    NavbarComponent,
    FooterComponent,
    CardMenuPedido,
}
};
</script>

<style scoped>
.main {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 75px;
  margin-bottom: 100px;
}

.content {
padding: 50px 20px;
text-align: center;
background-color: white;
}

body {
  font-family: "Oxygen", sans-serif;
  color: #050505;
  background-image: url('https://b2090723.smushcdn.com/2090723/wp-content/uploads/2019/03/DSC_0614.jpg?lossy=0&strip=0&webp=1');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.title-fade {
position: absolute;
top: 30%;
left: 50%;
transform: translate(-50%, -50%);
text-align: center;
width: 100%;
color: white;
opacity: 0; 
animation: fadeIn 3s ease-in-out forwards;
z-index: 10; 
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Espacio entre tarjetas */
  justify-content: center; /* Centra las tarjetas */
}

@media (max-width: 768px) {
  /* Cuando la pantalla es pequeña, cada tarjeta ocupa el 100% */
  .cards > * {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

</style>
  