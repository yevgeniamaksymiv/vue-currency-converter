<template>
  <span id="BTC-rate" class="p-3">{{ btcRate }}</span>
</template>

<script>
import { axiosInstance } from '@/axios-config';

export default {
  name: 'BtcRate',
  data() {
    return {
      btcRate: ''
    }
  },
  mounted() {
    return this.getBTCtoUSD();
  },

  methods: {
    async getBTCtoUSD() {
      try {
        const response = await axiosInstance.get('/latest', {
          params: {
            base: 'BTC',
            symbols: 'USD',
            source: 'crypto',
          },
        });
        const rates = Object.entries(response.data.rates);
        this.btcRate = ` 1 BTC = ${Number(rates[0][1]).toFixed(2)} USD`;
      } catch (error) {
        console.error(error);
      }
    }
  }
}


</script>

<style scoped>
#BTC-rate {
    color: #0d6efd;
  }
</style>