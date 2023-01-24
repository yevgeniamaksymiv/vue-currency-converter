import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import store from '@/store/index';
import router from '@/router';

createApp(App).use(router).use(store).mount('#app');
