import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Register from '../components/register'
import Index from '../components/home/index'
import Home from '../components/home'
import Borrow from '../components/home/borrow'
import Return from '../components/home/return'
import Admin from '../components/home/admin'
import History from '../components/home/history'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: Home,
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/borrow',
          name: 'borrow',
          component: Borrow
        },
        {
          path: '/return',
          name: 'return',
          component: Return
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin
        },
        {
          path: '/history',
          name: 'history',
          component: History
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'index',
      redirect: '/index'
    }
  ]
})
