<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
      flag: ["en", "it"],
    };
  },
  props: { movie: Object },
  methods: {
    flagFinder(language) {
      if (this.flag.includes(language)) {
        return this.language;
      }
    },
    getImageUrl(language) {
      return new URL(`../assets/img/${language}.png`, import.meta.url).href;
    },
  },
};
</script>

<template>
  <div class="card">
    <h3>Titolo: {{ movie.title ? movie.title : movie.name }}</h3>
    <h4>Titolo originale: {{ movie.original_title }}</h4>

    <div class="flag">
      <img
        :src="getImageUrl(movie.original_language)"
        alt=""
        v-if="flag.includes(movie.original_language)"
      />
      <span v-else>{{ movie.original_language }}</span>
    </div>
    <small>Voto {{ movie.vote_average }}</small>
  </div>
</template>

<style scoped lang="scss"></style>
