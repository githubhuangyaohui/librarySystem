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
  mode: 'history',
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
          component: Index,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
        },
        {
          path: '/borrow',
          name: 'borrow',
          component: Borrow,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
        },
        {
          path: '/return',
          name: 'return',
          component: Return,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
        },
        {
          path: '/history',
          name: 'history',
          component: History,
          meta: {
            // 设置登录拦截
            requireAuth: true
          }
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
