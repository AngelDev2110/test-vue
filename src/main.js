import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Oruga from '@oruga-ui/oruga-next';
import './styles/main.css';

createApp(App).use(router).use(Oruga).mount('#app');