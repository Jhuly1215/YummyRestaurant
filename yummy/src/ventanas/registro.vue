<template>

      <div class="login-container">
        <div class="login-card">
          <h2 class="title">Bienvenido</h2>
          <form @submit.prevent="handleSubmit">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="nombre" required placeholder="Ingresa tu nombre"/>

            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" v-model="apellidos" required placeholder="Ingresa tus apellidos"/>

            <label for="email">Correo electrónico:</label>
            <input type="email" id="email" v-model="email" required placeholder="Ingresa tu correo" />

            <label for="password">Contrasena:</label>
            <input type="password" id="password" v-model="password" required placeholder="Ingresa tu contraseña"/>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" v-model="password" required placeholder="Ingresa tu contraseña"/>
    
            <p class="signup-text"> ¿Ya tienes una cuenta? <router-link to="/iniciarsesion">Inicia sesión aquí</router-link></p>
    
            <button type="submit" class="login-button">Listo</button>
          </form>
        </div>
      </div>
    </template>
    
    <script>

    export default {
      name: "LogIn",
      
    };
    </script>
    
    <style scoped>
    
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #FFFEDC; /* Color de fondo */
    }
    
    .login-card {
      width: 65%;
      padding: 2rem;
      background: white;
      border-radius: 3vh;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    .title {
      color: #FE9900; /* Color naranja */
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      text-align: left;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #444;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .signup-text {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 1rem;
    }
    
    .signup-text a {
      color: #FE9900; /* Color naranja */
      text-decoration: none;
    }
    
    .signup-text a:hover {
      text-decoration: underline;
    }
    
    .login-button {
      width: 100%;
      padding: 0.75rem;
      background-color: #A16F23; /* Color marrón */
      color: white;
      font-size: 1rem;
      border: none;
      border-radius: 1.5vh;
      cursor: pointer;
      font-weight: bold;
    }
    
    .login-button:hover {
      background-color: #A16F23; /* Color marrón más oscuro */
    }
    </style>
    