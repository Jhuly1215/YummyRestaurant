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
          <div class="col-md-4">
          <h5>Nuestras redes sociales</h5>
          <div class="social-links">
            <a href="https://www.facebook.com/Yummy" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook--v1.png" alt="Facebook" class="social-icon">
              Facebook
            </a>
            <a href="https://www.instagram.com/Yummy" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" class="social-icon">
              Instagram
            </a>
          </div>
        </div>
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
  