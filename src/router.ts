import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './page/Home.vue';
import List from './page/List.vue';
import Favorites from './page/Favorites.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/list', name: 'List', component: List },
  { path: '/favorites', name: 'Favorites', component: Favorites },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;