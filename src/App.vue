<template>
  <div id="app">
    <!-- <HomePage msg="Welcome to Your Vue.js App" /> -->
    <HomePage
      v-bind:msg="msg"
      v-bind:hotNews="hotNews"
      v-bind:listNews="listNews"
      v-bind:onRefresh="onRefresh"
      v-bind:loading="loading"
    />
  </div>
</template>

<script>
import HomePage from "./HomePage/HomePage";
import { API_URL } from "./const/index";
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
      loading: false,
    };
  },
  mounted() {
    this.fetchData();
    setInterval(function() {
      this.fetchData();
    }, 30000);
  },
  methods: {
    fetchData(params) {
      this.loading = true;
      instanceAxios({
        method: "GET",
        baseURL: API_URL,
        url: "/news",
        params: {
          category: params ? params.category : null,
        },
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
        .catch((err) => console.log(err));
    },
    onRefresh(value) {
      console.log(value);
      this.listNews = [];
      this.fetchData({ category: value });
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
