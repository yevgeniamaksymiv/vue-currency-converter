<template>
  <div class="content p-3 text-center">
    <h1>Currency Converter</h1>
    <span id="header-rate" class="pe-3">{{ infoRateUSD }}</span>
    <select id="select-header" ref="select" @change="selectOnChange" v-model="selectValue">
      <option selected>Select</option>
    </select>
    <BtcRate />
    <img :src="imgSrc" id="theme-icon" width="24" height="24" alt="theme svg" />
    <hr />
    <RunningLine />
  </div>
</template>

<script>
import RunningLine from './RunningLine.vue';
import BtcRate from './BtcRate.vue';
import { getUSDRate } from '@/helpers/index';

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
      infoRateUSD: 'Choose rate to USD',
      selectValue: '',
      imgSrc: require('@/assets/dark-mode.svg')
    }
  },

  mounted() {
    return getUSDRate(this.$refs.select);
  },

  methods: {
    selectOnChange(e) {
      this.infoRateUSD = `1 USD = ${this.selectValue} ${e.target.options[e.target.options.selectedIndex].text}`;
    }
  }
}
</script>

<style scoped>
.content {
  background-color: v-bind(bgColor);
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
</style>