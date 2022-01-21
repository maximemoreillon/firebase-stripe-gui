import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue'),
    alias: '/',
  },
  {
    path: '/products/:product_id',
    name: 'product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('../views/PaymentSuccess.vue')
  },
  {
    path: '/cancel',
    name: 'cancel',
    component: () => import('../views/PaymentCancel.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
