// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './base.css'

Vue.config.productionTip = false
var axios = require('axios')
axios.defaults.headers['Authorization'] = store.state.authorization
// axios.defaults.headers.common['Authorization'] =
// axios.defaults.headers.common['Authorization'] = store.state.Authorization
axios.defaults.baseURL = 'http://39.100.119.221:8084'
Vue.prototype.$axios = axios
// Vue.config.productionTip = false

/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // eslint-disable-next-line eqeqeq
    if (store.state.user.username) {
      console.log('用户存在')
      next({
        query: {redirect: to.fullPath}
      })
    } else {
      console.log('用户不存在，页面跳转')
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
