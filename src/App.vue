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
      showResult: false,
      moreView: true,
    };
  },

  created() {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/week`, {
        params: {
          api_key: this.store.apiKey,
        },
      })
      .then((resp) => {
        this.store.films = resp.data.results;
      });
    axios
      .get(`https://api.themoviedb.org/3/trending/tv/week`, {
        params: {
          api_key: this.store.apiKey,
        },
      })
      .then((resp) => {
        this.store.series = resp.data.results;
      });

    this.showResult = true;
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
          console.log(this.store.films);
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
          console.log(this.store.series);
        });

      this.showResult = true;
      this.moreView = false;
    },

    cast() {},
  },
};
</script>

<template>
  <!-- Wrapper -->
  <div class="wrapper">
    <AppSearchbar @find="search()" />

    <!-- Results -->
    <div class="results" v-show="showResult">
      <!-- Film -->
      <h2 class="title">
        Film <span v-show="moreView">più visti questa settimana</span>
      </h2>
      <ul class="films">
        <li v-for="(film, index) in store.films" :key="film.title">
          <AppFilmList :movie="film" :movieIndex="index" />
        </li>
      </ul>
      <!-- /Film -->

      <hr />

      <!-- Series -->
      <h2 class="title">
        Serie <span v-show="moreView">più viste questa settimana</span>
      </h2>
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
@use "./style/general.scss";
@use "./style/partials/variables" as *;
@use "./style/partials/mixin" as *;
@import "@fortawesome/fontawesome-free/css/all.css";
body {
  margin: 0;
}

.wrapper {
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: lighten($secondary-color, 15%);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .results {
    height: calc(100% - 80px);
    /* display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; */

    margin: 0 2rem;
    margin-right: 0;

    .title {
      margin: 2rem;
      color: lighten($primary-color, 10%);
      text-transform: uppercase;
    }

    .series,
    .films {
      display: flex;
      align-items: stretch;
      flex-wrap: wrap;
      list-style: none;
      gap: 1rem;

      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;

        li {
          width: calc(100% / 5);
        }
      }
    }
  }
}
</style>
