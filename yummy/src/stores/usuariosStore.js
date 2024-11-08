import axios from 'axios';
import { RutaApi } from '@/api/localApi';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
      token: localStorage.getItem('token') || null,
      user: null, // Puedes almacenar más información del usuario si es necesario
      loading: false,
      error: null,
    }),
    actions: {
      async login(credentials) {
        this.loading = true;
        this.error = null;
        try {
          // Realizar la solicitud POST con datos en formato JSON
          const response = await axios.post(
            `${RutaApi.baseURL}auth/login`,
            credentials,
            {
              headers: {
                'Content-Type': 'application/json' // Asegura que se envíen los datos como JSON
              }
            }
          );
      
          if (response.status === 200) {
            // Extrae el token del response
            const { token } = response.data;
      
            // Almacenar el token en el estado y en localStorage
            this.token = token;
            // Almacenar el token en localStorage
            localStorage.setItem('token', token);
            console.log("Token almacenado:", localStorage.getItem('token'));
  
            console.log('Inicio de sesión exitoso');
            
            return true;
          } else {
            this.error = 'Error en el inicio de sesión';
            console.error('Error en el inicio de sesión, código de estado:', response.status);
            return false;
          }
        } catch (error) {
          // Maneja el error de la solicitud
          this.error = error.response?.data?.message || 'Error en la solicitud de inicio de sesión';
          console.error('Error en la solicitud de inicio de sesión:', error);
          return false;
        } finally {
          this.loading = false;
        }
      },
      
      logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        console.log('Sesión cerrada');
      },
      // Opcional: Método para verificar el token al iniciar la aplicación
      async verifyToken() {
        if (!this.token) return false;
        try {
          const response = await axios.get(`${RutaApi.baseURL}auth/verify`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,
            },
          });
          if (response.status === 200) {
            this.user = response.data.user;
            return true;
          } else {
            this.logout();
            return false;
          }
        } catch (error) {
          this.logout();
          return false;
        }
      },
    },
  });