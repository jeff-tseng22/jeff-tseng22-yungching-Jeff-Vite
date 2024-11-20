import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import List from '../components/List.vue'
import Favorite from '../components/Favorite.vue'

const routes = [
  { path: '/', name: 'Home', component: App }, // 首頁
  { path: '/list', name: 'List', component: List }, // 資料列表
  { path: '/favorite', name: 'Favorite', component: Favorite }, // 我的最愛
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
