import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Main from '../views/Main.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAdmin: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ path: '/' })
    } else if (localStorage.getItem('token') && localStorage.getItem('id') === `${process.env.VUE_APP_ADMIN}`) {
      next({ path: '/admin' })
    } else if (localStorage.getItem('token') && localStorage.getItem('id') !== `${process.env.VUE_APP_ADMIN}`) {
      next()
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (localStorage.getItem('token') && localStorage.getItem('id') !== `${process.env.VUE_APP_ADMIN}`) {
      next({ path: '/main' })
    } else if (localStorage.getItem('token') && localStorage.getItem('id') === `${process.env.VUE_APP_ADMIN}`) {
      next({ path: '/admin' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!localStorage.getItem('token')) {
      next({ path: '/' })
    } if (localStorage.getItem('token') && localStorage.getItem('id') !== `${process.env.VUE_APP_ADMIN}`) {
      next({ path: '/main' })
    } else if (localStorage.getItem('token') && localStorage.getItem('id') === `${process.env.VUE_APP_ADMIN}`) {
      next()
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
