import './assets/main.css'
import 'vuetify/styles'; // Estilos do Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Importando ícones do Material Design

import { createApp } from 'vue'
import { createPinia } from 'pinia' // Gerenciador de estado
import { createVuetify } from 'vuetify' // Importando o método de criação do Vuetify

import App from './App.vue'
import router from './router'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App)


app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')