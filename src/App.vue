<template>
  <div class="container p-3 mb-2 text-white">
    <HeaderComponent />
    <CardComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import CardComponent from '@/components/card/CardComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    CardComponent
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* body {
  --text-light: #c6c9d2;
  --text-blue: #0d6efd;
  --text-red: #dc3545;
  --bg-dark: #121212;
  --bg-grey: #212529;

  background-color: var(--bg-dark);
} */

#app {
  --text-light: #c6c9d2;
  --text-blue: #0d6efd;
  --text-red: #dc3545;
  --bg-dark: #121212;
  --bg-grey: #212529;

  background-color: var(--bg-dark);
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0;
  padding: 0;
  min-height: 100vh;
  box-sizing: border-box;
  /* text-align: center; */
}
</style>
