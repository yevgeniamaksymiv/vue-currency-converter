<template>
  <div class="card text-center mt-3 p-4">
    <div class="card-body">
      <div class="select-section">
        <select id="select-1">
          <option selected>Select</option>
        </select>
        <img id="reverse-currency" src="../assets/arrows.svg" width="32" height="32" alt="arrows" class="m-4">
        <select id="select-2">
          <option selected>Select</option>
        </select>
      </div>
      <input id="input" class="mt-3 me-4 p-2" placeholder="Amount" />
      <input id="date" type="date" min="2000-01-01" class="mt-3 p-2" />
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
  </div>
</template>

<script>
export default {
  name: 'CardComponent'
}

</script>

<style>

</style>