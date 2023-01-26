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
    checkUser(state, { username, password }) {
      const checkData = state.users.find((user) => {
        return user.username === username && user.password === password;
      });
      if (checkData) {
        state.user = username;
        state.isLogin = true;
      } else state.isLogin = false;
    },

    setUsers(state, data) {
      state.users = data;
    }
  },

  actions: {
    async getUsers({commit}) {
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

    checkUser({commit}, user) {
      commit('checkUser', user);
    },
  },
});

export default store;
