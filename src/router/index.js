import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue'
import About from '../pages/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: { template: '<div>联系页面 Coming soon...</div>' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
