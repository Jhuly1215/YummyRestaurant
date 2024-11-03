import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';



const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // Integrar Pinia
app.use(router); // Integrar router
app.mount('#app');

