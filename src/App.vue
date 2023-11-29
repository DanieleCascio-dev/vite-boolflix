<script>
import AppSearchbar from "./components/AppSearchbar.vue";
import { store } from "./store.js";
import axios from "axios";

export default {
  components: { AppSearchbar },
  data() {
    return {
      store,
    };
  },
  methods: {
    search() {
      console.log(this.store.searchText);

      axios.get().then();
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <AppSearchbar @search="search()" />
  </div>
</template>

<style lang="scss">
@import "@fortawesome/fontawesome-free/css/all.css";
</style>
