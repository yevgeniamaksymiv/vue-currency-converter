<template>
  <div class="content p-3 text-center">
    <h1>Currency Converter</h1>
    <span id="header-rate" class="pe-3">{{ infoRateUSD }}</span>
    <select id="select-header" ref="select" @change="selectOnChange" v-model="selectValue">
      <option selected>Select</option>
    </select>
    <BtcRate />
    <img :src="imgSrc" id="theme-icon" width="24" height="24" alt="theme svg" @click="switchTheme" />
    <router-link to="/">Home</router-link>
    <router-link to="/diagram">Diagram</router-link>
    <button class="btn btn-outline-primary ms-3" @click="login">LOGIN</button>
    <button class="btn btn-outline-secondary ms-3" @click="logout">LOGOUT</button>
    <div v-if="this.isLogin" class="img-login">
      <img src="../../../assets/face-login.svg" width="32" height="32" alt="login svg"/><br />
      <small>{{ this.user }}</small>
    </div>
    <p>{{ logoutMsg }}</p>
    <hr />
    <RunningLine />
  </div>
</template>

<script>
import RunningLine from './RunningLine.vue';
import BtcRate from './BtcRate.vue';
import { getUSDRate } from '@/helpers/index';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HeaderComponent',
  components: {
    RunningLine,
    BtcRate
  },

  data() {
    return {
      bgColor: 'var(--bg-grey)',
      selectBgColor: 'var(--bg-dark)',
      txtColor: 'var(--text-light)',
      linkColor: 'var(--text-blue)',
      infoRateUSD: 'Choose rate to USD',
      selectValue: '',
      imgSrc: require('@/assets/dark-mode.svg'),
      currentTheme: localStorage.getItem('theme'),
      logoutMsg: '',
    }
  },

  mounted() {
    this.checkTheme();
    getUSDRate(this.$refs.select);
    this.checkUserLogin();
  },

  methods: {
    ...mapActions(['setUser', 'setIsLogin']),
    selectOnChange(e) {
      this.infoRateUSD =
        `1 USD = ${this.selectValue} ${e.target.options[e.target.options.selectedIndex].text}`;
    },

    checkTheme() {
      if (this.currentTheme === 'light') {
        document.body.classList.add('light');
        this.imgSrc = require('@/assets/light-mode.svg');
      }
    },

    switchTheme() {
      document.body.classList.toggle('dark');
      if (this.currentTheme === 'light') {
        localStorage.setItem('theme', 'dark');
      } else localStorage.setItem('theme', 'light');
      location.reload();
    },

    checkUserLogin() {
      if (this.user.length !== 0) {
        this.imgLogin = 'img-login-block';
      }
    },

    login() {
      this.$router.push({
        name: 'login'
      })
    },

    logout() {
      window.sessionStorage.clear();
      this.setUser('');
      this.setIsLogin(false);
      this.logoutMsg = 'You left your account';
      setTimeout(() => (this.logoutMsg = ''), 3000);
    }
  },

  computed: {
    ...mapGetters(['user', 'isLogin'])
  }
}
</script>

<style scoped>
.content {
  background-color: v-bind(bgColor);
  border-radius: 5px;
}

#select-header {
  width: 100px;
  height: 50px;
  padding: 5px 10px;
}

select {
  padding: 10px 30px;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  background-color: v-bind(selectBgColor);
  color: v-bind(txtColor);
}

a {
  margin: 10px;
  color: v-bind(txtColor);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  color: v-bind(linkColor);
}

.active {
  color: v-bind(linkColor);
}

.img-login {
  display: inline-block;
  margin: 0 15px;
}
</style>