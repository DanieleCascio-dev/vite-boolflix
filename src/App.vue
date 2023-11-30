<script>
import { getTransitionRawChildren, resolveTransitionHooks } from "vue";
import AppSearchbar from "./components/AppSearchbar.vue";
import { store } from "./store.js";
import axios from "axios";

export default {
  components: { AppSearchbar },
  data() {
    return {
      store,
      flag: {
        uk: "https://www.countryflags.com/wp-content/uploads/united-kingdom-flag-png-large.png",
        spain:
          "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
        italy:
          "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
        japan:
          "https://www.countryflags.com/wp-content/uploads/japan-flag-png-large.png",
        portugal:
          "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
        france:
          "https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png",
        korea: "https://cdn.countryflags.com/thumbs/south-korea/flag-800.png",
      },
    };
  },
  methods: {
    find() {
      console.log(this.store.searchText);

      axios
        .get(this.store.apiStartMovie, {
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

      axios
        .get(this.store.apiStartTv, {
          params: {
            query: this.store.searchText,
            api_key: this.store.apiKey,
          },
        })
        .then((resp) => {
          console.log(resp.data.results);
          this.store.series = resp.data.results;
          console.log(this.store.series);
        });
    },
    flagFinder(language) {
      let flag = "";
      console.log(language);
      if (language == "es") {
        return (flag = this.flag.spain);
      } else if (language == "it") {
        return (flag = this.flag.italy);
      } else if (language == "en") {
        return (flag = this.flag.uk);
      } else if (language == "ja") {
        return (flag = this.flag.japan);
      } else if (language == "fr") {
        return (flag = this.flag.france);
      } else if (language == "ko") {
        return (flag = this.flag.korea);
      } else if (language == "pt") {
        return (flag = this.flag.portugal);
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <AppSearchbar @find="find()" />
    <div class="film-list">
      <ul>
        <li v-for="film in store.films" :key="film.title">
          <h3>Titolo: {{ film.title }}</h3>
          <h4>Titolo originale: {{ film.original_title }}</h4>

          <div class="flag">
            <img :src="flagFinder(film.original_language)" alt="" />
            <span>{{ film.original_language }}</span>
          </div>
          <small>Voto {{ film.vote_average }}</small>
        </li>
      </ul>
    </div>
    <hr />
    <div class="series">
      <ul>
        <li v-for="serie in store.series">
          <h2>{{ serie.name }}</h2>
          <div class="flag">
            <img :src="flagFinder(serie.original_language)" alt="" />
            <span>{{ serie.original_language }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import "@fortawesome/fontawesome-free/css/all.css";

img {
  width: 50px;
}
</style>
