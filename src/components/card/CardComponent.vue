<template>
  <div class="card text-center mt-3 p-4">
    <div class="card-body">
      <SelectsSection ref="selects"/>
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