import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: { template: '<div>关于页面 Coming soon...</div>' } },
  { path: '/contact', component: { template: '<div>联系页面 Coming soon...</div>' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
