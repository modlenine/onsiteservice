import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { apiUrl } from '@/utils/backend'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userDataState: null
  },
  mutations: {
    setUserData(state, payload) {
      state.userDataState = payload;
    }
  },
  actions: {
    getSessionStorage({ commit }) {
      const getUserData = localStorage.getItem('userData');
      if (getUserData) {
        commit('setUserData', JSON.parse(getUserData));
      } else {
        commit('setUserData', null);
      }
    },
    async checkSessionFromBackend({ commit }) {
      try {
        const response = await axios.post(apiUrl('checksession'));
        
        if (response.data.hasSession && response.data.status === "Session Found") {
          const userData = response.data.userData;
          localStorage.setItem('userData', JSON.stringify(userData));
          commit('setUserData', userData);
          return { success: true, userData };
        } else {
          localStorage.removeItem('userData');
          commit('setUserData', null);
          return { success: false, message: response.data.msg };
        }
      } catch (error) {
        console.error('Error checking session:', error);
        localStorage.removeItem('userData');
        commit('setUserData', null);
        return { success: false, message: 'Error checking session' };
      }
    }
  },
  getters: {
    get_userdata: state => state.userDataState,
    isLoggedIn: state => state.userDataState !== null,
    canAccessOnsite: state => {
      if (!state.userDataState) return false;
      return state.userDataState.DeptCode == 1002;
    }
  },
  modules: {
  }
})
