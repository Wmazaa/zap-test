import { createApp } from 'vue'
import App from './App.vue'

import { store } from './store/store'            // vuex store

import 'bootstrap/dist/css/bootstrap.css'  // bootstrap styles

const app = createApp(App);                // declare app

app.use(store);                          // mount store

app.mount('#app');
