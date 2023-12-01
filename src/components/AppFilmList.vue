<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
      flag: ["en", "it"],
      hover: false,
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
    mockUp() {
      this.hover = !this.hover;
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
    <div
      class="cover"
      @click="mockUp"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <img :src="cover(movie.poster_path)" alt="" />
    </div>
    <!-- /COVER -->

    <!-- INFO -->
    <div class="info">
      <h3>Titolo: {{ movie.title ? movie.title : movie.name }}</h3>
      <h4>Titolo originale: {{ movie.original_title }}</h4>
      <p class="plot">Overview: {{ movie.overview }}</p>
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
    <!-- /INFO -->
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;

  &:hover > .cover {
    filter: opacity(0);
  }

  &:hover > .info {
    filter: opacity(100%);
  }

  .cover {
    min-height: 513px;
    min-width: 342px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: opacity(100%);
  }

  .info {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    background-color: lighten(#101010, 40%);
    color: white;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    filter: opacity(0);
  }
}
.flag {
  img {
    width: 50px;
  }
}
</style>
