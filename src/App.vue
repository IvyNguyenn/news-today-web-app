<template>
  <div id="app">
    <!-- <HomePage msg="Welcome to Your Vue.js App" /> -->
    <HomePage
      v-bind:msg="msg"
      v-bind:hotNews="hotNews"
      v-bind:listNews="listNews"
      v-bind:onFetchData="onFetchData"
      v-bind:onSpeak="onSpeak"
      v-bind:loading="loading"
    />
  </div>
</template>

<script>
import HomePage from "./HomePage/HomePage";
import { API_URL ,REFRESH_TIME} from "./const/index";
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
      refreshNewsInterval: undefined,
      synth: window.speechSynthesis,
      voiceList: [],
      greetingSpeech: new window.SpeechSynthesisUtterance()
    };
  },
  created(){
    clearInterval(this.refreshNewsInterval);
    this.refreshNewsInterval = setInterval(() => {
        this.fetchDataApi();
      }, REFRESH_TIME);
  },
  mounted() {
    this.voiceList = this.synth.getVoices();
    this.onFetchData();
    this.onTextToSpeech();
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
    onFetchData(value) {
      this.loading = true;
      // console.log(value);
      this.fetchDataApi({ category: value });
    },
    onTextToSpeech(){
    },
    onSpeak (){
      // it should be 'craic', but it doesn't sound right
      let myText = "Welcome to News Today!";
      this.greetingSpeech.text = myText

      // this.greetingSpeech.voice = this.voiceList[this.selectedVoice]
      
      this.synth.speak(this.greetingSpeech)
    }
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
