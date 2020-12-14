import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')),
    // user: {
    //   id: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).id,
    //   username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
    //   nickname: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).nickname,
    //   email: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).email,
    //   phone: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).phone,
    //   address: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).address,
    //   sex: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).sex,
    //   create_time: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).create_time,
    //   last_time: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).last_time,
    //   status: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).state
    // },
    authorization: window.localStorage.getItem('authorization' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('authorization' || '[]'))
    // Authorization: {
    //   Authorization: window.localStorage.getItem('Authorization' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('Authorization' || '[]')).Authorization
    // }
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user = []
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('authorization')
      window.localStorage.removeItem('Authorization')
    },
    saveAuthorization (state, Authorization) {
      state.Authorization = Authorization
      window.localStorage.setItem('authorization', JSON.stringify(Authorization))
    }
  }
})
