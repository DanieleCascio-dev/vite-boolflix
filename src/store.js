import { reactive } from "vue";

export const store = reactive({
  films: [],
  series: [],
  searchText: "",
  apiKey: "cb25bcdd927925fc72eeeb993ce375da",
  apiStartMovie: "https://api.themoviedb.org/3/search/movie",
  apiStartTv: "https://api.themoviedb.org/3/search/tv",
});
