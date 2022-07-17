import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { onlyGuestUser: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { onlyAuthUser: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  const isAuth = !!getAuth().currentUser
  if ( to.meta.onlyGuestUser && isAuth ) {
    next({name: "home"}) 
  } else 
  if ( to.meta.onlyAuthUser && !isAuth ) {
    next({name: "login"})
  } else {
    next()
  }
})

export default router
