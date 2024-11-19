import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 引入全局 SCSS 样式
import './assets/styles/global.scss'; 

const app = createApp(App);
app.use(router);
app.mount('#app');
