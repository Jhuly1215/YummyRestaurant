<template>
    <div class="login-container">
      <div class="login-card">
        <h2 class="title">Bienvenido</h2>
        <form @submit.prevent="handleSubmit">
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" v-model="email" required placeholder="Ingresa tu correo" />
  
          <label for="password">Contraseña:</label>
        <div class="password-container">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            required
            placeholder="Ingresa tu contraseña"
          />
          <span @click="togglePasswordVisibility" class="toggle-password">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
  
          <p class="signup-text"> ¿No tienes una cuenta? <router-link to="/registro">Regístrate aquí</router-link></p>

  
          <button type="submit" class="login-button">Listo</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>


  export default {
    name: "LogIn",
    data() {
      return {
        showPassword: false, 
      };
      
    },
  methods: {
      togglePasswordVisibility(){
        this.showPassword = !this.showPassword;
      }
    }
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
    width: 320px;
    padding: 2rem;
    background: white;
    border-radius: 8px;
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
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .login-button:hover {
    background-color: #A16F23; /* Color marrón más oscuro */
  }

  .password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
}
  </style>
  