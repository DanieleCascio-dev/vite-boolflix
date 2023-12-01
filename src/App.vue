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
  <!-- Wrapper -->
  <div class="wrapper">
    <AppSearchbar @find="search()" />

    <!-- Results -->
    <div class="results">
      <!-- Film -->
      <ul class="films">
        <li v-for="film in store.films" :key="film.title">
          <AppFilmList :movie="film" />
        </li>
      </ul>
      <!-- /Film -->

      <hr />

      <!-- Series -->
      <ul class="series">
        <li v-for="serie in store.series" :key="serie.name">
          <AppFilmList :movie="serie" />
        </li>
      </ul>
      <!-- /Series -->
    </div>
    <!-- Results -->
  </div>
  <!-- /Wrapper -->
</template>

<style lang="scss">
@import "@fortawesome/fontawesome-free/css/all.css";
body {
  margin: 0;
}

.wrapper {
  height: 100vh;
  width: 100%;
  position: relative;

  .results {
    /* margin-top: 80px; */
    height: calc(100% - 80px);
    /* display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; */
    /* overflow-y: auto; */
    overflow-x: auto;
    margin: 0 2rem;

    .series,
    .films {
      display: flex;
      align-items: stretch;

      overflow-x: scroll;
      list-style: none;
      gap: 1rem;
    }
  }
}
</style>
