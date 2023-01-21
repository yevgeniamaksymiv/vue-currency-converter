import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import store from '@/store/index';

createApp(App).use(store).mount('#app');
