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
        <p v-else>{{ movie.original_language }}</p>
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
    align-items: stretch;
    justify-content: center;
    filter: opacity(100%);
  }

  .info {
    position: absolute;
    top: 0;
    left: 0;

    background-color: lighten(#101010, 10%);
    color: white;
    max-height: 100%;
    min-height: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    filter: opacity(0);
    overflow-y: auto;
  }
}
.flag {
  img {
    width: 50px;
  }
}
</style>
