<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
      emit: ["search"],
    };
  },
};
</script>

<template>
  <label for="search">Cerca un film</label>
  <input v-model="store.searchText" id="search" type="text" />
  <button @click="$emit('search')">Cerca</button>
</template>
