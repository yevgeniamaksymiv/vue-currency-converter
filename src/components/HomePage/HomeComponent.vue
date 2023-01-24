<template>
  <div>
    <HeaderComponent />
    <CardComponent />
  </div>
</template>

<script>
import CardComponent from './Card/CardComponent.vue';
import HeaderComponent from './Header/HeaderComponent.vue';

export default {
  name: 'HomeComponent', 
  components: {
    HeaderComponent, 
    CardComponent
  }
}
</script>