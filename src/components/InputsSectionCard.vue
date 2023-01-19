<template>
  <div>
    <input id="input" class="mt-3 me-4 p-2" placeholder="Amount" />
    <input id="date" type="date" min="2000-01-01" class="mt-3 p-2" ref="date" v-model="inputDate"/>
    <small id="error-input"></small>
    <button type="button" class="btn btn-primary ps-3 pe-3 m-3" id="btn-convert">
      Convert
    </button>
    <button type="button" class="btn btn-secondary ps-3 pe-3 m-3" id="btn-history">
      History
    </button>
    <small id="error-history"></small>
    <ul id="result-list"></ul>
    <div id="btns-history"></div>
  </div>
</template>

<script>
export default {
  name: 'InputsSectionCard',
  data() {
    return {
      bgColor: 'var(--bg-dark)',
      borderColor: 'var(--text-light)',
      txtColor: 'var(--text-light)',
      liColor: 'var(--text-blue)',
      inputDate: ''
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
</style>