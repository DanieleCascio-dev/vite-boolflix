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
    <div class="logo">
      <img src="../assets/img/netflix.png" alt="" />
    </div>
    <div class="bar">
      <label for="searchbar">Cerca un film</label>
      <input
        @keyup.enter="$emit('find')"
        v-model="store.searchText"
        id="searchbar"
        type="text"
      />
      <button @click="$emit('find')">Cerca</button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
nav {
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 99; */

  width: 100%;
  height: 80px;
  background-color: #141414;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    margin-left: 3rem;
    max-height: 80px;
  }

  .bar {
    margin-right: 3rem;
    display: flex;
    gap: 0.5rem;
  }
}
</style>
