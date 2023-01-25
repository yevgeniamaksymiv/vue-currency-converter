<template>
  <div class="running-line">
    <div class="text-center running-line-wrapper-first">
      <span id="current-date" class="content-header pe-3">Current rate for {{ getDate }}:
      </span>
      <span id="USD-rate" class="content-header pe-3">1 USD = {{ usd }} UAH</span>
      <span id="EUR-rate" class="content-header pe-3">1 EUR = {{ eur }} UAH</span>
      <span id="GBP-rate" class="content-header pe-3">1 GBR = {{ gbr }} UAH</span>
      <span id="CNY-rate" class="content-header pe-3">1 CNY = {{ cny }} UAH</span>
      <span id="AUD-rate" class="content-header pe-3">1 AUD = {{ aud }} UAH</span>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from '@/axios-config';

export default {
  name: 'RunningLine',
  data() {
    return {
      usd: '',
      eur: '',
      gbr: '',
      cny: '',
      aud: '',
      txtColor: 'var(--text-light)'
    }
  },

  mounted() {
    return this.getDailyRate();
  },

  methods: {
    async getDailyRate() {
      try {
        const response = await axiosInstance.get('/latest', {
          params: {
            base: 'UAH',
            symbols: 'USD,EUR,GBP,CNY,AUD',
          },
        });
        const rates = Object.values(response.data.rates).map((rate) =>
          (1 / Number(rate)).toFixed(2)
        );
        this.eur = rates[2];
        this.usd = rates[4];
        this.gbr = rates[3];
        this.cny = rates[1];
        this.aud = rates[0];
      } catch (error) {
        console.error(error);
      }
    }
  },

  computed: {
    getDate() {
      return new Date().toLocaleDateString();
    }
  }

}
</script>

<style scoped>
.running-line {
  position: relative;
  min-height: 20px;
  overflow: hidden;
  color: v-bind(txtColor);
}

.running-line-wrapper-first {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(100%, 0);
  animation: ticker 30s infinite linear forwards;
}

@keyframes ticker {
  0% {
    transform: translate(100%, 0);
  }

  50% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-100%, 0);
  }
}
</style>