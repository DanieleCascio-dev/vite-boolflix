<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
      flag: ["en", "it"],
      stars: ["x", "x", "x", "x", "x"],
      ratingStar: [],
      voidStar: [],
    };
  },
  props: { movie: Object },
  methods: {
    flagFinder(language) {
      if (this.flag.includes(language)) {
        return this.language;
      }
    },
    getImageUrl(imageNAme) {
      return new URL(`../assets/img/${imageNAme}.png`, import.meta.url).href;
    },

    cover(path) {
      return path
        ? `https://image.tmdb.org/t/p/w342${path}`
        : this.getImageUrl("no_image_2");
    },
  },
  computed: {
    vote() {
      return Math.ceil(this.movie.vote_average / 2);
    },
  },
};
</script>

<template>
  <div class="card">
    <!-- COVER -->
    <div class="cover">
      <img :src="cover(movie.poster_path)" alt="" />
    </div>
    <!-- /COVER -->

    <!-- INFO -->
    <h3>Titolo: {{ movie.title ? movie.title : movie.name }}</h3>
    <h4>Titolo originale: {{ movie.original_title }}</h4>
    <p class="plot">Overview: {{ movie.overview }}</p>
    <!-- /INFO -->

    <!-- FLAG -->
    <div class="flag">
      <img
        :src="getImageUrl(movie.original_language)"
        alt=""
        v-if="flag.includes(movie.original_language)"
      />
      <span v-else>{{ movie.original_language }}</span>
    </div>
    <!-- /FLAG -->

    <!-- RATINGS -->
    <small
      >Voto
      <span v-for="num in vote"><i class="fa-solid fa-star"></i></span>
      <span v-for="num in 5 - vote"><i class="fa-regular fa-star"></i></span>
    </small>
    <!-- RATINGS -->
  </div>
</template>

<style scoped lang="scss">
.card {
  .cover {
    min-height: 513px;
  }
}

.flag {
  img {
    width: 50px;
  }
}
</style>
