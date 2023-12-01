<script>
import { store } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      store,
      flag: ["en", "it"],
      showCast: false,
      curIndex: "",
    };
  },
  props: { movie: Object, movieIndex: Number },
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
    cast(movieIndex) {
      if (movieIndex !== this.curIndex) {
        this.curIndex = movieIndex;
        this.store.cast = [];

        axios
          .get(`${this.store.apiCast}${this.movie.id}/credits`, {
            params: {
              api_key: this.store.apiKey,
            },
          })
          .then((resp) => {
            console.log(resp);
            this.store.cast = resp.data.cast.slice(0, 5);
          });

        this.showCast = true;
      } else {
        this.showCast = !this.showCast;
      }
    },
    hideCast() {
      this.showCast = false;
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
      <p @click="cast(movieIndex)">Cast</p>
      <ul class="cast-list" v-show="showCast">
        <li v-for="actor in store.cast">{{ actor.name }}</li>
      </ul>
      <!-- RATINGS -->
    </div>
    <!-- /INFO -->
  </div>
</template>

<style scoped lang="scss">
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;
.card {
  position: relative;

  &:hover > .cover {
    filter: opacity(30%);
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
    transition: all 0.5s;
  }

  .info {
    position: absolute;
    top: 0;
    left: 0;

    background-color: lighten(#10101063, 10%);
    color: white;
    max-height: 100%;
    min-height: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;
    filter: opacity(0);
    overflow-y: auto;
    transition: all 0.5s;

    .cast-list {
      list-style: none;
      padding: 1rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}
.flag {
  img {
    width: 50px;
  }
}
</style>
