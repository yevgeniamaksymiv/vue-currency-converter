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

  data() {
    return {
      selectBgColor: 'var(--bg-dark)',
      txtColor: 'var(--text-light)',
      imgSrc: require('@/assets/arrows.svg'),
      selectFromValue: '',
      selectToValue: '',
    }
  },

  mounted() {
    getAllCurrencies(this.$refs.selectFrom);
    getAllCurrencies(this.$refs.selectTo);
  },

  methods: {
    selectFromOnChange() {
      this.$store.state.rateFrom = this.selectFromValue;
      this.$store.state.currencyFrom = this.$refs.selectFrom.options[this.$refs.selectFrom.selectedIndex].text;
    },

    selectToOnChange() {
      this.$store.state.rateTo = this.selectToValue;
      this.$store.state.currencyTo = this.$refs.selectTo.options[this.$refs.selectTo.selectedIndex].text;
    },

    reverseCurrenciesOnClick() {
      if (this.$store.state.rateTo && this.$store.state.rateFrom) {
        [
          this.$store.state.rateTo, this.$store.state.rateFrom
        ] = [
            this.$store.state.rateFrom, this.$store.state.rateTo
          ];
        [
          this.$refs.selectFrom.options[this.$refs.selectFrom.selectedIndex].text,
          this.$refs.selectTo.options[this.$refs.selectTo.selectedIndex].text,
        ] = [
            this.$refs.selectTo.options[this.$refs.selectTo.selectedIndex].text,
            this.$refs.selectFrom.options[this.$refs.selectFrom.selectedIndex].text,
          ];
        [
          this.$store.state.currencyFrom, this.$store.state.currencyTo
        ] = [
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