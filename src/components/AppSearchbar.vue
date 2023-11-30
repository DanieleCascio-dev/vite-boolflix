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
  <nav>
    <label for="searchbar">Cerca un film</label>
    <input
      @keyup.enter="$emit('find')"
      v-model="store.searchText"
      id="searchbar"
      type="text"
    />
    <button @click="$emit('find')">Cerca</button>
  </nav>
</template>

<style scoped lang="scss">
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(128, 128, 128, 0.11);
}
</style>
