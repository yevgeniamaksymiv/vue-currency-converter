<template>
  <div class="card text-center mt-3 p-4">
    <div class="card-body">
      <SelectsSection v-on:changeRateFrom="changeRateFrom" v-model:rateFrom="rateFrom"/>
      <InputsSection />
    </div>
  </div>
</template>

<script>
import SelectsSection from './SelectsSection.vue';
import InputsSection from './InputsSection.vue';

export default {
  name: 'CardComponent',
  components: {
    SelectsSection,
    InputsSection
  },
  data() {
    return {
      bgColor: 'var(--bg-grey)',
      rateFrom: 'rF',
      rateTo: '',
      currencyFrom: '',
      currencyTo: ''
    }
  },
  methods: {
    changeRateFrom(val) {
      this.rateFrom = val;
      console.log('rateFrom', this.rateFrom)
    }  
  }

}

</script>

<style scoped>
.card {
      min-height: 60vh;
      background-color: v-bind(bgColor);
    }

</style>