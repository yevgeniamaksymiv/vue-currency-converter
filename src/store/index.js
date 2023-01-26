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

  actions: {
    async getUsers() {
      try {
        const response = await axiosInstanceGetUsers.get('/users', {
          params: {
            limit: 20,
          },
        });
        this.state.users = response.data;
        console.log('users', this.state.users);
      } catch (error) {
        console.log(error);
      }
    },

    checkUser(state, { username, password }) {
      const checkData = this.state.users.find((user) => {
        return user.username === username && user.password === password;
      });
      if (checkData) {
        this.state.user = username;
        this.state.isLogin = true;
      } else this.state.isLogin = false;
    },
  },
});

export default store;
