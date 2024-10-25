<template>
    <div>
      <NavbarComponent />
      <CarouselComponent />

      <div class="title-fade">
        <h1></h1>
      </div>
  
      <div class="main">
        <ul class="cards">
          <CardComponent
            imageSrc="https://media.citybeat.com/citybeat/imager/the-25-best-restaurants-in-greater-cincinnati-right-now-according-to-yelp/u/zoom/14734515/bakerstable_hb-4234.jpg?cb=1724366981"
            imageAlt="QuienesSomos"
            title="Quiénes somos"
            description="yummy es el restaurante ideal para ir en familia y pasar un buen rato."
            extraText="¡Te invitamos a explorar nuestras instalaciones y a disfrutar de nuestros delicioso menú!"
          />
          <CardComponent
            imageSrc="https://images.unsplash.com/photo-1547573854-74d2a71d0826?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVzYSUyMGRlJTIwY29taWRhfGVufDB8fDB8fHww"
            imageAlt="Menu"
            title="Acerca del Menú"
            description="Yummy tiene selccionado para ti el menú ideal, con diferenets variedades de comidas, postres y bebidas."
            extraText="¡Únete a esta deliciosa experiencia!"
          />
          <CardComponent
            imageSrc="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c1050b145653163.62a1f338f3bd5.jpg"
            imageAlt="Pedidos"
            title="Para realizar pedidos"
            description="Te ofrecemos la opción de pedir desde la comodidad de tu casa. Con tan solo revisar el menu y seleccionar tu mesa en nuestras instalaciones, puedes realizar un pedido y una reserva en Yummy."
            extraText="¡Tan sencillo como un click!"
          />
        </ul>
      </div>
  
      <!-- Importar y usar Footer -->
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import NavbarComponent from '@/components/Navbar.vue';
  import FooterComponent from '@/components/Footer.vue';
  import CardComponent from '@/components/CardComponent.vue';
  import CarouselComponent from '@/components/CarouselComponent.vue';
  
  export default {
    name: "HomePage",
    components: {
      NavbarComponent,
      FooterComponent,
      CardComponent,
      CarouselComponent,
    }
  };
  </script>
  
  <style scoped>

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
  
  .main {
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 75px;
    margin-bottom: 100px;
  }
  .title-fade h1{
    font-family: "EB Garamond";
    font-size: 7rem;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 40rem) {
    .cards_item {
      width: 50%;
    }
  }
  
  @media (min-width: 56rem) {
    .cards_item {
      width: 33.3333%;
    }
  }
  
  
  hr {
    margin: 24px auto;
    width: 50px;
    border-top: 2px solid #c89b3f;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  </style>
  