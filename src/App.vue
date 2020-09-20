<template>
  <div id="app">
    <!-- <HomePage msg="Welcome to Your Vue.js App" /> -->
    <HomePage
      v-bind:msg="msg"
      v-bind:hotNews="hotNews"
      v-bind:listNews="listNews"
      v-bind:onFetchData="onFetchData"
      v-bind:loading="loading"
      v-bind:weatherData="weatherData"
    />
  </div>
</template>

<script>
import HomePage from "./HomePage/HomePage";
import {
  CORS_API,
  API_URL,
  REFRESH_TIME,
  DARK_SKY_API,
  DARK_SKY_KEY,
} from "./const/index";
import axios from "axios";
const instanceAxios = axios.create();

export default {
  name: "App",
  components: {
    HomePage,
  },
  data() {
    return {
      msg: "NEWS TODAY",
      hotNews: [],
      listNews: [],
      weatherData: {},
      loading: false,
      refreshNewsInterval: undefined,
    };
  },
  created() {
    clearInterval(this.refreshNewsInterval);
    this.refreshNewsInterval = setInterval(() => {
      this.fetchDataApi();
    }, REFRESH_TIME);
  },
  mounted() {
    this.fetchWeatherDataApi();
    this.onFetchData();
  },
  methods: {
    fetchDataApi(params) {
      instanceAxios({
        method: "GET",
        baseURL: API_URL,
        url: "/news",
        params: {
          category: params ? params.category : null,
        },
        timeout: 120000,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          const { data } = response.data;
          this.hotNews = data.hotNews;
          this.listNews = data.news;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    fetchWeatherDataApi() {
      instanceAxios({
        method: "GET",
        baseURL: CORS_API + DARK_SKY_API,
        url: `${DARK_SKY_KEY}/10.8231,106.6297`,
      })
        .then((response) => {
          const { data } = response;
          this.weatherData = data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    onFetchData(value) {
      this.loading = true;
      // console.log(value);
      this.fetchDataApi({ category: value });
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
