<template>
  <div class="col-md-6 col-lg-7 d-flex align-items-center">
    <div class="card-body p-4 p-lg-5 text-light">

      <form @submit.prevent="submitForm">
        <h5 class="fw-normal mb-3 pb-3 text-primary" style="letter-spacing: 1px;">Sign into your account</h5>

        <div class="form-outline mb-4">
          <input type="text" class="form-control form-control-lg" placeholder="Username" v-model="username"/>
        </div>

        <div class="form-outline mb-4">
          <input :type="inputType" class="form-control form-control-lg" placeholder="Password" v-model="password"/>
          <img class="visibility-icon" :src="imgSrc" width="16" height="16" @click="showPassword"/>
        </div>

        <div class="pt-1 mb-4">
          <button class="btn btn-primary btn-lg btn-block" type="button">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import { axiosInstanceGetUsers } from '@/axios-config';

export default {
  name: 'LoginForm',
  data() {
    return {
      bgColor: 'var(--bg-dark)',
      bgColorDel: 'var(--bg-grey)',
      borderColor: 'var(--text-light)',
      imgSrc: require('@/assets/visibility.svg'),
      inputType: 'password',
      username: '',
      password: ''
    }
  },

  computed: {
    ...mapState(['users', 'user'])
  }, 

  methods: {
    ...mapActions(['getUsers']),
    // ...mapMutations(usersStore, ['setUsers', 'setUser']),

    showPassword() {
      if (this.inputType === 'password') {
        this.inputType = 'text';
        this.imgSrc = require('@/assets/visibility-off.svg');
      } else {
        this.inputType = 'password';
        this.imgSrc = require('@/assets/visibility.svg');
      }
    },

    submitForm() {
      const userData = {
        'username': this.username,
        'password': this.password
      }
      console.log(userData)

    }
  },

  mounted() {
    this.getUsers();
    // console.log(this.users)
//     try {
//       const response = await axiosInstanceGetUsers.get('/users', {
//         params: {
//           limit: 20,
//         },
//       });
//       console.log(response.data[0].username);
//     } catch (error) {
//       console.log(error);
//   }
  }
}
</script>

<style scoped>
input {
  background-color: v-bind(bgColor);
  border: .5px solid v-bind(borderColor);
  color: v-bind(txtColor);
  border-radius: 5px;
}

input::placeholder {
  color: v-bind(borderColor);
  font-size: 16px;
}

.visibility-icon {
  margin: 0 10px;
  float: right;
  margin-top: -30px;
  position: relative;
  z-index: 2;
}
</style>