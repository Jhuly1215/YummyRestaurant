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

        <p class="signup-text">
          ¿No tienes una cuenta? <router-link to="/registro">Regístrate aquí</router-link>
        </p>

        <button type="submit" class="login-button">Iniciar Sesión</button>

        <!-- Mensaje de error -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <p class="forgot-password" @click="openForgotPasswordModal">¿Olvidaste tu contraseña?</p>
      </form>

      <!-- Modal de recuperación de contraseña -->
      <div v-if="showForgotPasswordModal" class="modal">
        <div class="modal-content">
          <h3>Recuperar Contraseña</h3>
          <!-- Paso 1: Enviar código de recuperación -->
          <div v-if="recoveryStep === 1">
            <p>Ingresa tu correo electrónico para enviar el código de recuperación.</p>
            <input type="email" v-model="recoveryEmail" placeholder="Ingresa tu correo" />
            <button @click="sendRecoveryEmail" class="login-button">Enviar Código</button>
            <button @click="closeForgotPasswordModal" class="cancel-button">Cancelar</button>
          </div>

          <!-- Paso 2: Verificar el código de recuperación -->
          <div v-else-if="recoveryStep === 2">
            <p>Ingresa el código de verificación enviado a tu correo.</p>
            <input type="text" v-model="recoveryCode" placeholder="Código de verificación" />
            <button @click="verifyRecoveryCode" class="login-button">Verificar Código</button>
          </div>

          <!-- Paso 3: Cambiar la contraseña -->
          <div v-else-if="recoveryStep === 3">
            <label>Nueva Contraseña:</label>
            <input type="password" v-model="newPassword" placeholder="Ingresa tu nueva contraseña" />
            <label>Confirmar Nueva Contraseña:</label>
            <input type="password" v-model="confirmPassword" placeholder="Confirma tu nueva contraseña" />
            <button @click="verifyAndUpdatePassword" class="login-button">Actualizar Contraseña</button>
          </div>

          <p v-if="recoveryError" class="error-message">{{ recoveryError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LogIn",
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      showForgotPasswordModal: false,
      recoveryEmail: '',
      recoveryCode: '',
      newPassword: '',
      confirmPassword: '',
      recoveryError: null,
      errorMessage: null,
      recoveryStep: 1,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    openForgotPasswordModal() {
      this.showForgotPasswordModal = true;
      this.recoveryStep = 1;
    },
    closeForgotPasswordModal() {
      this.showForgotPasswordModal = false;
      this.recoveryEmail = '';
      this.recoveryCode = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.recoveryError = null;
      this.recoveryStep = 1;
    },

    async sendRecoveryEmail() {
      try {
        const response = await axios.post('/api/usuario/enviar-recuperacion', {
          email: this.recoveryEmail,
        });
        if (response.data.success) {
          this.recoveryStep = 2;
        } else {
          this.recoveryError = 'No se pudo enviar el código de recuperación.';
        }
      } catch (error) {
        this.recoveryError = 'Error al enviar el código de recuperación.';
      }
    },

    async verifyRecoveryCode() {
      try {
        const response = await axios.post('/api/usuario/verificar-codigo-recuperacion', {
          email: this.recoveryEmail,
          code: this.recoveryCode,
        });
        if (response.data.success) {
          this.recoveryStep = 3;
        } else {
          this.recoveryError = 'Código de verificación incorrecto.';
        }
      } catch (error) {
        this.recoveryError = 'Error al verificar el código.';
      }
    },

    async verifyAndUpdatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.recoveryError = 'Las contraseñas no coinciden.';
        return;
      }
      try {
        const response = await axios.post('/api/usuario/actualizar-contrasena', {
          email: this.recoveryEmail,
          newPassword: this.newPassword,
        });
        if (response.data.success) {
          alert('Contraseña actualizada exitosamente');
          this.closeForgotPasswordModal();
        } else {
          this.recoveryError = 'Error al actualizar la contraseña.';
        }
      } catch (error) {
        this.recoveryError = 'Error al actualizar la contraseña.';
      }
    },
  

    async handleSubmit() {
      this.errorMessage = null; // Resetear el mensaje de error
      console.log('Enviando datos de inicio de sesión:', { email: this.email, password: this.password });  // Depuración
      try {
        const response = await axios.post('/api/usuario/iniciar', {
          email: this.email,
          password: this.password,
        });

        if (response.data.success) {
          console.log('Inicio de sesión exitoso:', response.data); // Verificar respuesta
          // Redirige a la página de inicio
          this.$router.push('/');
        }
      } catch (error) {
        if (error.response) {
          // Mostrar el mensaje de error adecuado
          if (error.response.status === 404) {
            this.errorMessage = 'Usuario no encontrado';
          } else if (error.response.status === 401) {
            this.errorMessage = 'Contraseña incorrecta';
          } else {
            this.errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo.';
          }
        } else {
          this.errorMessage = 'Error de conexión. Inténtalo de nuevo más tarde.';
        }
      }
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

  /* Modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }

  .cancel-button {
    background-color: #ccc;
    color: #333;
    padding: 0.75rem;
    margin-top: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .cancel-button:hover {
    background-color: #aaa;
  }

  .error-message {
    color: red;
    font-size: 0.9rem;
    margin-top: 1rem;
  }


</style>
  