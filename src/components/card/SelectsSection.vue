<template>
  <div class="select-section">
    <select id="select-from" ref="selectFrom" @change="selectFromOnChange" v-model="selectFromValue">
      <option selected>Select</option>
    </select>
    <img id="reverse-currency" :src="imgSrc" width="32" height="32" alt="arrows" class="m-4"
      @click="reverseCurrenciesOnClick" />
    <select id="select-to" ref="selectTo" @change="selectToOnChange" v-model="selectToValue">
      <option selected>Select</option>
    </select>
  </div>
</template>

<script>
import { getAllCurrencies } from '@/helpers/index';

export default {
  name: 'SelectsSection',
  props: [
    'rateFrom', 'rateTo', 'CurrencyFrom', 'CurrencyTo'
  ],
  
  data() {
    return {
      selectBgColor: 'var(--bg-dark)',
      txtColor: 'var(--text-light)',
      imgSrc: require('@/assets/arrows.svg'),
      selectFromValue: '',
      selectToValue: '',
      // rateFrom: '',
      // rateTo: '',
      // currencyFrom: '',
      // currencyTo: ''
    }
  },

  mounted() {
    getAllCurrencies(this.$refs.selectFrom);
    getAllCurrencies(this.$refs.selectTo);
  },

  methods: {
    change() {
      this.$emit('changeRateFrom', this.selectFromValue);
    },

    selectFromOnChange() {
      this.change()
      // this.rateFrom = this.selectFromValue;
      this.currencyFrom = this.$refs.selectFrom.options[this.$refs.selectFrom.selectedIndex].text;
      console.log('1 ', this.rateFrom, this.currencyFrom)
    },

    selectToOnChange() {
      this.rateTo = this.selectToValue;
      this.currencyTo = this.$refs.selectTo.options[this.$refs.selectTo.selectedIndex].text;
      console.log('2 ', this.rateTo, this.currencyTo)
    },

    reverseCurrenciesOnClick() {
      if (this.rateTo && this.rateFrom) {
        [this.rateTo, this.rateFrom] = [this.rateFrom, this.rateTo];
        [
          this.$refs.selectFrom.options[this.$refs.selectFrom.selectedIndex].text,
          this.$refs.selectTo.options[this.$refs.selectTo.selectedIndex].text,
        ] = [
            this.$refs.selectTo.options[this.$refs.selectTo.selectedIndex].text,
            this.$refs.selectFrom.options[this.$refs.selectFrom.selectedIndex].text,
          ];
        [this.currencyFrom, this.currencyTo] = [
          this.$refs.selectFrom.options[this.$refs.selectFrom.selectedIndex].text,
          this.$refs.selectTo.options[this.$refs.selectTo.selectedIndex].text,
        ];
      } else return;
    }
  }
}
</script>

<style scoped>
.select-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

select {
  padding: 10px 30px;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  background-color: v-bind(selectBgColor);
  color: v-bind(txtColor);
}

#reverse-currency:hover {
  cursor: pointer;
  opacity: .5;
}
</style>