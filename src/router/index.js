import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Register from '../components/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
