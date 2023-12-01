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
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;
nav {
  width: 100%;
  height: 80px;
  background-color: $secondary-color;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    margin-left: 3rem;
    max-height: 80px;

    img {
      width: 120px;
    }
  }

  .bar {
    margin-right: 3rem;
    display: flex;
    gap: 0.5rem;

    input {
      border-radius: 40px;
      border: 2px solid $primary-color;
    }

    button {
      background-color: lighten($secondary-color, 25%);
      color: lighten($primary-color, 10%);
      font-weight: bolder;
      border-radius: 40px;
      box-shadow: none;

      &:hover {
        background-color: lighten($secondary-color, 35%);
      }
    }
  }
}
</style>
