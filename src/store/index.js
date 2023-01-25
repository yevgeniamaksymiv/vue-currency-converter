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
      user: {
        username: '',
        password: '',
      },
    };
  },

  mutations: {
    setUsers(state, users) {
      state.users = users;
    },

    setUser(state, { username, password }) {
      state.user.username = username;
      state.user.password = password;
    },
  },

  actions: {
    async getUsers() {
      try {
        const response = await axiosInstanceGetUsers.get('/users', {
          params: {
            limit: 20,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default store;
