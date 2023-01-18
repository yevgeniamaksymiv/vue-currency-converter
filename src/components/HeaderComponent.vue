<template>
  <div class="content p-3 text-center">
    <h1>Currency Converter</h1>
    <span id="header-rate" class="pe-3">{{ infoRateUSD }}</span>
    <select id="select-header" @change="selectOnChange()" v-model="selectValue">
      <option selected>Select</option>
    </select>
    <BtcRateHeader />
    <img id="theme-icon" width="24" height="24" alt="theme svg" />
    <hr />
    <RunningLineHeader />
  </div>
</template>

<script>
import RunningLineHeader from '@/components/RunningLineHeader.vue';
import BtcRateHeader from '@/components/BtcRateHeader.vue';
import axiosInstance from '../axios-config';

export default {
  components: {
    RunningLineHeader,
    BtcRateHeader
  },
  name: 'HeaderComponent',
  data() {
    return {
      infoRateUSD: 'Choose rate to USD',
      selectValue: ''
    }
  },

  async mounted() {
    try {
      const response = await axiosInstance.get('/latest', {
        params: {
          base: 'USD',
          symbols: 'UAH,EUR,GBP',
        },
      });
      const rates = Object.entries(response.data.rates);
      rates.forEach((rate) => {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(rate[0]));
        option.value = rate[1];
        const select = document.getElementById('select-header');
        select.appendChild(option);
      });
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    selectOnChange() {
      this.infoRateUSD = `1 USD = ${Number(this.selectValue).toFixed(4)}`;
    }
  }
}
</script>

<style scoped>
.content {
  /* background-color: var(--bg-grey); */
  background-color: #212529;
  color: #c6c9d2;
}

.content-header {
  /* color: var(--text-light); */
  color: #c6c9d2;
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
  /* background-color: var(--bg-dark);
  color: var(--text-light); */
  background-color: #212529;
  color: #c6c9d2;
}
</style>