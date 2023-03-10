<template>
  <div class="content p-3">
    <div class="d-flex justify-content-between align-items-baseline">
      <button class="btn btn-outline-primary" @click="backHome">
        <img src="../../assets/arrow-back.svg" width="20" height="20" />
        Home
      </button>
      <h3 class="text-center">Diagram</h3>
      <p class="pe-3">Welcome,  <span>{{ this.user }}</span></p>
    </div>
    <hr />
    <div class="section">
      <span class="pe-4">From</span>
      <select id="select-from" ref="selectFrom" @change="selectFromOnChange" v-model="selectFromValue" class="me-4">
        <option selected>Select</option>
      </select>
      <input id="date-from" type="date" min="2000-01-01" class="mt-3 p-2" @change="dateOnChange" ref="fromDate"
        v-model="inputFromDate" />
    </div>
    <div class="section">
      <span class="pe-4">To</span>
      <select id="select-to" ref="selectTo" @change="selectToOnChange" v-model="selectToValue" class="me-4">
        <option selected>Select</option>
      </select>
      <input id="date-to" type="date" min="2000-01-01" class="mt-3 p-2" @change="dateOnChange" ref="toDate"
        v-model="inputToDate" />
      <button class="btn btn-outline-primary ms-4" @click="getDiagram">Show diagram</button>
    </div>
    <div class="text-start p-2">
      <small id="diagram-err">{{ errorMsg }}</small>
    </div>
    <div class="chart-container">
      <canvas ref="chart" id="chart"></canvas>
    </div>
  </div>
</template>  

<script>
import { getAllCurrencies, getRatesInPeriod, createChart } from '@/helpers/index';
import { mapGetters } from 'vuex';

export default {
  name: 'DiagramComponent',
  data() {
    return {
      bgColor: 'var(--bg-grey)',
      txtColor: 'var(--txt-light)',
      selectBgColor: 'var(--bg-dark)',
      secondaryColor: 'var(--text-blue)',
      borderColor: 'var(--text-light)',
      errColor: 'var(--text-red)',
      inputFromDate: '',
      inputToDate: '',
      rateFrom: '',
      rateTo: '',
      currencyFrom: '',
      currencyTo: '',
      selectFromValue: '',
      selectToValue: '',
      errorMsg: '',
    }
  },

  mounted() {
    this.setCurrentDate();
    getAllCurrencies(this.$refs.selectFrom);
    getAllCurrencies(this.$refs.selectTo);
    createChart(this.$refs.chart);
  },

  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    backHome() {
      this.$router.push({name: 'home'});
    },

    setCurrentDate() {
      const date = new Date().toLocaleDateString().split('.').reverse().join('-');
      this.inputFromDate = date;
      this.inputToDate = date;
      this.$refs.fromDate.max = this.inputFromDate;
      this.$refs.toDate.max = this.inputToDate;
    },

    selectFromOnChange() {
      this.rateFrom = this.selectFromValue;
      this.currencyFrom = this.$refs.selectFrom.options[this.$refs.selectFrom.selectedIndex].text;
    },

    selectToOnChange() {
      this.rateTo = this.selectToValue;
      this.currencyTo = this.$refs.selectTo.options[this.$refs.selectTo.selectedIndex].text;
    },

    getDiagram() {
      if (this.inputFromDate > this.inputToDate) {
        this.errorMsg = 'Please, enter correct dates';
        setTimeout(() => (this.errorMsg = ''), 4000);
        return;
      }
      getRatesInPeriod(this.inputFromDate, this.inputToDate, this.currencyFrom, this.currencyTo);
    }
  }
}

</script>

<style scoped>
.content {
  background-color: v-bind(bgColor);
  border-radius: 5px;
  min-height: 95vh;
}

h3, p {
  display: inline-block;
}


select {
  width: 100px;
  height: 50px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: v-bind(selectBgColor);
  color: v-bind(txtColor);
}

span {
  color: v-bind(secondaryColor);
  display: inline-block;
  width: 50px;
  text-align: right;
}

input {
  background-color: v-bind(bgColor);
  border: .5px solid v-bind(borderColor);
  color: v-bind(txtColor);
  border-radius: 5px;
  color-scheme: dark;
}

.section {
  text-align: left;
}

.chart-container {
  width: 60vw;
  height: 30vw;
  position: relative;
}

small {
  color: v-bind(errColor);
}
</style>