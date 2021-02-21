import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    SET_USER (state, payload) {
      state.id = payload.id
      state.username = payload.username
    }
  },
  actions: {
    interceptorRequest () {
      axios.interceptors.request.use(function (config) {
        if (localStorage.getItem('token')) {
          config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
          return config
        } else {
          config.headers.Authorization = `Bearer ${localStorage.getItem('temporaryToken')}`
          return config
        }
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        if (error.response.status === 401) {
          if (error.response.data.err === 'Invalid Token') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('profile/REMOVE_PROFILE')
            this.$router.push('/auth/login')
          } else if (error.response.data.err === 'Token Expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('profile/REMOVE_PROFILE')
            this.$router.push('/auth/login')
          }
        }
        return Promise.reject(error)
      })
    }
  },
  modules: {
  }
})
