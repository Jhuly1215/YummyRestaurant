<template>
    <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">Regístrate</h2>
            <form action="login.php" method="POST">
              <div class="mb-3">
                <label for="usuario" class="form-label">Correo electrónico:</label>
                <input type="text" class="form-control" id="usuario" name="usuario" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña:</label>
                <input type="password" class="form-control" id="password" name="password" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Repite denuevo tu contraseña:</label>
                <input type="password" class="form-control" id="password" name="password" required>
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Listo</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

    export default{
        name: "HomePage",
    }
</script>
<style>
    body {
    position: relative;
    margin: 0;
    height: 100vh;
    overflow: hidden;
}

body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://img.lovepik.com/background/20211021/large/lovepik-black-gold-sand-gravel-background-image_400081603.jpg') no-repeat center center fixed;
    background-size: cover;
    filter: grayscale(30%) blur(5px); /* Escala de grises y desenfoque */
    z-index: -1;
}

.form-label {
    text-align: left;
    display: block;
}

.card {
      background-color: rgb(255, 254, 254);
      color: rgb(7, 7, 7);
    }

    .card-body {
      padding: 2rem;
    }

    .btn-primary {
      background-color: #c89b3f;
      border-color: #c89b3f;
      padding: 5px 10px; /* Ajusta el tamaño del botón */
      font-size: 12px; /* Ajusta el tamaño del texto */
    }

    .btn-primary:hover {
      background-color: #8c6f25;
      border-color: #8c6f25;
    }

    .btn-secondary {
      background-color: #444444;
      border-color: #444444;
    }

    .btn-secondary:hover {
      background-color: #333333;
      border-color: #333333;
    }

    .btn-link {
      color: #c89b3f;
    }

    .btn-link:hover {
      color: #8c6f25;
    }
    h2 {
      color: #FE9900;
      font-size: 2rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }

    /* Mejoras de input */
    .form-control {
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid #c89b3f;
      color: white;
    }

    .form-control:focus {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: #c89b3f;
      box-shadow: none;
    }
</style>