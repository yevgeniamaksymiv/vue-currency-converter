<template>
  <div class="content p-3 text-center">
    <h1>Currency Converter</h1>
    <span id="header-rate" class="pe-3">{{ infoRateUSD }}</span>
    <select id="select-header" ref="select" @change="selectOnChange" v-model="selectValue">
      <option selected>Select</option>
    </select>
    <BtcRateHeader />
    <img :src="imageSrc" id="theme-icon" width="24" height="24" alt="theme svg" />
    <hr />
    <RunningLineHeader />
  </div>
</template>

<script>
import RunningLineHeader from '@/components/RunningLineHeader.vue';
import BtcRateHeader from '@/components/BtcRateHeader.vue';
import axiosInstance from '../axios-config';

function appendOptionsToSelectTag(arr2d, tag) {
  return arr2d.forEach((arr) => {
    const option = document.createElement('option');
    option.appendChild(document.createTextNode(arr[0]));
    option.value = arr[1];
    tag.appendChild(option);
  });
}

export default {
  name: 'HeaderComponent',
  components: {
    RunningLineHeader,
    BtcRateHeader
  },
  data() {
    return {
      bgColor: 'var(--bg-grey)',
      selectBgColor: 'var(--bg-dark)',
      txtColor: 'var(--text-light)',
      infoRateUSD: 'Choose rate to USD',
      selectValue: '',
      imageSrc: require('@/assets/dark-mode.svg')
    }
  },

  mounted() {
    return this.getUSDRate(this.$refs.select);
  },

  methods: {
    async getUSDRate(parentTag) {
      try {
        const response = await axiosInstance.get('/latest', {
          params: {
            base: 'USD',
            symbols: 'UAH,EUR,GBP',
            places: 4
          },
        });
        const rates = Object.entries(response.data.rates);
        appendOptionsToSelectTag(rates, parentTag);
      } catch (error) {
        console.error(error);
      }
    },
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