<template>
  <div class="card text-center mt-3 p-4">
    <div class="card-body">
        <SelectsSectionCard />
        <InputsSectionCard />
    </div>
  </div>
</template>

<script>
import SelectsSectionCard from './SelectsSectionCard.vue';
import InputsSectionCard from './InputsSectionCard.vue';

export default {
  name: 'CardComponent',
  components: {
    SelectsSectionCard,
    InputsSectionCard
  },
  data() {
    return {
      bgColor: 'var(--bg-grey)'
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