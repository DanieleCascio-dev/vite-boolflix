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
    find() {
      console.log(this.store.searchText);
      console.log(this.store.apiStart);

      axios
        .get(this.store.apiStart, {
          params: {
            query: this.store.searchText,
            api_key: this.store.apiKey,
          },
        })
        .then((resp) => {
          console.log(resp.data.results);
          this.store.films = resp.data.results;
          console.log(this.store.films);
        });
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <AppSearchbar @find="find()" />
    <div class="film-list">
      <ul>
        <li v-for="film in store.films">
          <h3>Titolo: {{ film.title }}</h3>
          <h4>Titolo originale: {{ film.original_title }}</h4>
          <p>Lingua: {{ film.original_language }}</p>
          <small>Voto {{ film.vote_average }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import "@fortawesome/fontawesome-free/css/all.css";
</style>
