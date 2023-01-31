import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { axiosInstanceGetUsers } from '@/axios-config';

const store = createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state() {
    return {
      rateFrom: '',
      rateTo: '',
      currencyFrom: '',
      currencyTo: '',
      users: [],
      user: '',
      isLogin: false,
    };
  },

  getters: {
    rateFrom: (state) => state.rateFrom,
    rateTo: (state) => state.rateTo,
    currencyFrom: (state) => state.currencyFrom,
    currencyTo: (state) => state.currencyTo,
    users: (state) => state.users,
    user: (state) => state.user,
    isLogin: (state) => state.isLogin,
  },

  mutations: {
    setRateFrom(state, value) {
      state.rateFrom = value;
    },

    setRateTo(state, value) {
      state.rateTo = value;
    },

    setCurrFrom(state, value) {
      state.currencyFrom = value;
    },

    setCurrTo(state, value) {
      state.currencyTo = value;
    },

    setUsers(state, data) {
      state.users = data;
    },

    setUser(state, name) {
      state.user = name;
    },

    setIsLogin(state, bool) {
      state.isLogin = bool;
    },
  },

  actions: {
    async getUsers({ commit }) {
      try {
        const response = await axiosInstanceGetUsers.get('/users', {
          params: {
            limit: 20,
          },
        });

        commit('setUsers', response.data);
        console.log('users', this.state.users);
      } catch (error) {
        console.log(error);
      }
    },

    setUser({ commit }, name) {
      commit('setUser', name);
    },

    setIsLogin({ commit }, bool) {
      commit('setIsLogin', bool);
    },

    setRateFrom({ commit }, value) {
      commit('setRateFrom', value);
    },

    setRateTo({ commit }, value) {
      commit('setRateTo', value);
    },

    setCurrFrom({ commit }, value) {
      commit('setCurrFrom', value);
    },

    setCurrTo({ commit }, value) {
      commit('setCurrTo', value);
    },
  },
});

export default store;
