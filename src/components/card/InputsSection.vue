<template>
  <div>
    <input id="input" class="mt-3 me-4 p-2" placeholder="Amount" v-model="inputValue" />
    <input id="date" type="date" min="2000-01-01" class="mt-3 p-2" @change="dateOnChange" ref="date"
      v-model="inputDate" />
    <small id="error-input">{{ errorMsgInput }}</small>
    <button type="button" class="btn btn-primary ps-3 pe-3 m-3" id="btn-convert" ref="btnConvert"
      @click="convertOnClick">
      Convert
    </button>
    <button type="button" class="btn btn-secondary ps-3 pe-3 m-3" id="btn-history" ref="btnHistory"
      @click="historyOnClick">
      History
    </button>
    <small id="error-history">{{ errorMsgHistory }}</small>
    <ul id="result-list" ref="list"></ul>
    <div id="btns-history"></div>
  </div>
</template>

<script>
import { getAllCurrencies, addItemToList } from '@/helpers';

export default {
  name: 'InputsSection',

  data() {
    return {
      bgColor: 'var(--bg-dark)',
      borderColor: 'var(--text-light)',
      txtColor: 'var(--text-light)',
      liColor: 'var(--text-blue)',
      errColor: 'var(--text-red)',
      inputValue: '',
      inputDate: '',
      errorMsgInput: '',
      errorMsgHistory: ''
    }
  },

  mounted() {
    this.setCurrentDate();
  },

  methods: {
    setCurrentDate() {
      const date = new Date().toLocaleDateString();
      this.inputDate = date.split('.').reverse().join('-');
      this.$refs.date.max = this.inputDate;
    },

    dateOnChange() {
      const date = new Date().toLocaleDateString();
      if (date.split('.').reverse().join('-') !== this.inputDate) {
        const selectFrom = document.getElementById('select-from');
        selectFrom.length = 1;
        const selectTo = document.getElementById('select-to');
        selectTo.length = 1;

        getAllCurrencies(selectFrom, this.inputDate);
        getAllCurrencies(selectTo, this.inputDate);
      }
    },

    convertOnClick() {
      console.log('convert')
      console.log('rate', this.rateFrom, this.rateTo, this.currencyFrom, this.currencyTo)
      const regex = /^\d+$/;
      if (!regex.test(this.inputValue) || this.inputValue.length > 12) {
        this.errorMsg =
          'That is not a valid input, enter a number greater than zero and 12 symbols max';
        setTimeout(() => (this.errorMsg = ''), 4000);
        return;
      }
      // if (this.rateFrom && this.rateTo) {
      //   const convertResult = ((this.rateTo / this.rateFrom) * this.inputValue).toFixed(4);

      //   addItemToList(this.$refs.list, this.inputDate, this.inputValue, this.currencyFrom, this.currencyTo, convertResult);
      //   this.inputValue = '';
      // }
    }
  }
}

</script>

<style>
#input,
#date {
  background-color: v-bind(bgColor);
  border: .5px solid v-bind(borderColor);
  color: v-bind(txtColor);
  border-radius: 5px;
}

ul {
  list-style: none;
  color: v-bind(liColor);
  padding: 20px;
  font-size: 14px;
  text-align: end;
}

ul li {
  margin-right: 35%;
}

#date {
  color-scheme: dark;
}

#error-history,
#error-input {
  display: block;
  color: v-bind(errColor);
}
</style>