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

    cover(path) {
      return `https://image.tmdb.org/t/p/w342${path}`
        ? `https://image.tmdb.org/t/p/w342${path}`
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIEvVMBuJZmvpp5GKIwABcfZw9YF_969WdwJS-cPWuV4hyJcz1l1P1sLufyE9GyRjLC4s&usqp=CAU";
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="cover">
      <img :src="cover(movie.poster_path)" alt="" />
    </div>
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

<style scoped lang="scss">
.flag {
  img {
    width: 50px;
  }
}
</style>
