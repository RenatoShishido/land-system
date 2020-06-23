import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/vendido',
    name: 'Vendido',
    component: () => import(/* webpackChunkName: "about" */ '../views/Vendido.vue')
  },
  {
    path: '/tabela',
    name: 'Tabela',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tabela.vue')
  },
  {
    path: '/simulacao',
    name: 'Simulador',
    component: () => import(/* webpackChunkName: "about" */ '../views/Simulador.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
