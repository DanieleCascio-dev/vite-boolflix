<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
      emit: ["find"],
    };
  },
};
</script>

<template>
  <label for="searchbar">Cerca un film</label>
  <input v-model="store.searchText" id="searchbar" type="text" />
  <button @click="$emit('find')">Cerca</button>
</template>
