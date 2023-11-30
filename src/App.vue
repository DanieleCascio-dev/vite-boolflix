<script>
import { getTransitionRawChildren, resolveTransitionHooks } from "vue";
import AppSearchbar from "./components/AppSearchbar.vue";
import { store } from "./store.js";
import axios from "axios";
import AppFilmList from "./components/AppFilmList.vue";

export default {
  components: { AppSearchbar, AppFilmList },
  data() {
    return {
      store,
    };
  },
  methods: {
    search() {
      // console.log(this.store.searchText);

      axios
        .get(this.store.apiStartMovie, {
          params: {
            query: this.store.searchText,
            api_key: this.store.apiKey,
          },
        })
        .then((resp) => {
          // console.log(resp.data.results);
          this.store.films = resp.data.results;
          // console.log(this.store.films);
        });

      axios
        .get(this.store.apiStartTv, {
          params: {
            query: this.store.searchText,
            api_key: this.store.apiKey,
          },
        })
        .then((resp) => {
          // console.log(resp.data.results);
          this.store.series = resp.data.results;
          // console.log(this.store.series);
        });
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <AppSearchbar @find="search()" />
    <!-- Film -->
    <ul>
      <li v-for="film in store.films" :key="film.title">
        <AppFilmList :movie="film" />
      </li>
    </ul>
    <hr />
    <!-- Series -->
    <ul>
      <li v-for="serie in store.series" :key="serie.name">
        <AppFilmList :movie="serie" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import "@fortawesome/fontawesome-free/css/all.css";
</style>
