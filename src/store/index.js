import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    popup_registration: false,
    popup_signin: false,
    popup_change_pass: false,
  },
  getters: {
    getUser(state) {
      return state.user
    },
    statePopupReg(state) {
      return state.popup_registration
    },
    statePopupSignIn(state) {
      return state.popup_signin
    },
    statePopupChangePass(state) {
      return state.popup_change_pass
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    DELETE_USER(state) {
      state.user = null
    },
    POPUP_REG(state, payload) {
      state.popup_registration = payload
    },
    POPUP_SIGNIN(state, payload) {
      state.popup_signin = payload
    },
    POPUP_CHANGE_PASS(state, payload) {
      state.popup_change_pass = payload
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    deleteUser({ commit }) {
      commit('DELETE_USER')
    },
    popupReg({ commit }, payload) {
      commit('POPUP_REG', payload)
    },
    popupSignIn({ commit }, payload) {
      commit('POPUP_SIGNIN', payload)
    },
    popupChangePass({ commit }, payload) {
      commit('POPUP_CHANGE_PASS', payload)
    },

  }
})