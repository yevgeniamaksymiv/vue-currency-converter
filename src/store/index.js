import { createStore } from 'vuex';
import { axiosInstanceGetUsers } from '@/axios-config';

const store = createStore({
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
    users: (state) => state.users,
    user: (state) => state.user,
    isLogin: (state) => state.isLogin,
  },

  mutations: {
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
    }
  },
});

export default store;
