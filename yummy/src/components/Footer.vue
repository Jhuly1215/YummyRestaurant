<template>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>Sobre Nosotros</h5>
            <p>Yummy, para saborear y compartir</p>
          </div>
          <div class="col-md-4">
            <h5>Contacto</h5>
            <p>Teléfono: +123 456 789</p>
            <p>Email: info@Yummy.com</p>
          </div>
        </div>
        <div class="text-center py-3">
          <p>&copy; 2024 Yummy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterComponent",
  };
  </script>
  
  <style scoped>
      .footer {
      background-color: #A16F23; 
      color: #fff; 
      padding: 40px 0; 
      margin-top: 25px;
    }

    .footer h5 {
      color: #fff; 
      margin-bottom: 20px;
    }

    .footer p {
      color: #fff; 
    }

    .footer a {
      color: #fff; 
      text-decoration: none; 
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .footer .text-center {
      border-top: 1px solid #fff; 
      padding-top: 20px;
    }
  </style>
  