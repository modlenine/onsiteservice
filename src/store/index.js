import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
        // Development: ใช้ relative path (proxy จะ forward ไป localhost:8080)
        // Production: ใช้ absolute URL (รวม port สำหรับทดสอบบน localhost:8080)
        const apiUrl = process.env.NODE_ENV === 'development'
          ? '/intsys/onsiteservice/onsite_backend/api/checksession'
          : (() => {
              const port = window.location.port ? ':' + window.location.port : '';
              return window.location.protocol + '//' + window.location.hostname + port + '/intsys/onsiteservice/onsite_backend/api/checksession';
            })();
        
        const response = await axios.post(apiUrl);
        
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
