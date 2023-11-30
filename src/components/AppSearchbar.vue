<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
    };
  },
  emits: ["find"],
};
</script>

<template>
  <label for="searchbar">Cerca un film</label>
  <input
    @keyup.enter="$emit('find')"
    v-model="store.searchText"
    id="searchbar"
    type="text"
  />
  <button @click="$emit('find')">Cerca</button>
</template>
