import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      rateFrom: '',
      rateTo: '',
      currencyFrom: '',
      currencyTo: '',
    };
  },
  // mutations: {
  //   changeRateFrom(state, value) {
  //     state.rateFrom = value;
  //     console.log('rf', state.rateFrom)
  //   },
  //   changeRateTo(state, value) {
  //     state.rateTo = value;
  //   },
  //   changeCurrFrom(state, value) {
  //     state.currencyFrom = value;
  //   },
  //   changeCurrTo(state, value) {
  //     state.currencyTo = value;
  //   },
  // },
});

export default store;
