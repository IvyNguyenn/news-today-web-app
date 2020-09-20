<template>
  <div
    :class="isDay ? 'weather-box-wrapper' : 'weather-box-wrapper weather-night'"
    :style="isSpeaking ? { borderColor: '#dc3546' } : {}"
    v-on:click="onTextToSpeech(datetime + weatherData.summary)"
  >
    <span>{{ datetime }}</span>
    <b-icon
      v-if="isSpeaking"
      class="speaking-icon"
      icon="bullseye"
      animation="throb"
      font-scale="1.5"
      variant="danger"
    ></b-icon>
    <img
      class="weather-img"
      v-if="weatherData.icon == 'rain'"
      src="../../assets/icons/weather/rain.svg"
    />
    <img
      class="weather-img"
      v-if="weatherData.icon == 'sunny'"
      src="../../assets/icons/weather/sunny.svg"
    />
    <img
      class="weather-img"
      v-if="weatherData.icon == 'cloudy'"
      src="../../assets/icons/weather/cloudy.svg"
    />
    <img
      class="weather-img"
      v-if="weatherData.icon == 'partly-cloudy-day'"
      src="../../assets/icons/weather/partly-cloudy-day.svg"
    />
    <h4 v-if="weatherData.temperature">
      {{ convertToCelsius(weatherData.temperature) }} &deg;C
    </h4>
    <small v-if="weatherData.temperatureLow">
      {{ convertToCelsius(weatherData.temperatureLow) }} -
      {{ convertToCelsius(weatherData.temperatureHigh) }} &deg;C
    </small>
    <div v-if="weatherData.humidity" class="humidity-wrapper">
      <small>{{ weatherData.humidity }}</small>
      <!-- <img
        class="humidity-icon"
        src="../../assets/icons/weather/humidity.svg"
      /> -->
    </div>
    <span v-if="weatherData.summary">{{ weatherData.summary }}</span>
  </div>
</template>

<script>
import moment from "moment";
import { DATE_TIME_FORMAT, TIME_TYPE } from "../../const/index";
export default {
  name: "WeatherBox",
  props: {
    weatherData: Object,
    type: String,
  },
  data() {
    return {
      isDay: true,
      datetime: "",
      synth: window.speechSynthesis,
      voiceList: [],
      greetingSpeech: new window.SpeechSynthesisUtterance(),
      isSpeaking: false,
    };
  },
  mounted() {
    this.detectIsDayTime();
    this.datetime = this.convertDayTime(this.weatherData.time, this.type);
  },
  methods: {
    convertToCelsius(cel) {
      return ((parseFloat(cel) - 32) / 1.8).toFixed(1);
    },
    detectIsDayTime() {
      var hr = new Date().getHours();
      if (hr > 3 && hr < 16) {
        this.isDay = true;
      } else {
        this.isDay = false;
      }
    },
    convertDayTime(time, type) {
      if (typeof time === "string") {
        return time;
      }
      switch (type) {
        case TIME_TYPE.DAILY:
          return moment.unix(time).format(DATE_TIME_FORMAT.DAILY);
        case TIME_TYPE.HOURLY:
          return moment.unix(time).calendar();
        default:
          return moment.unix(time).format(DATE_TIME_FORMAT.DATE_MONTH_YEAR);
      }
    },
    onTextToSpeech(text) {
      if (this.synth.speaking) {
        return;
      }
      // it should be 'craic', but it doesn't sound right
      this.greetingSpeech.text = text;
      this.greetingSpeech.rate = 1;
      // this.greetingSpeech.voice = this.voiceList[this.selectedVoice]
      // Start speak ===========================
      this.greetingSpeech.onstart = function() {
        this.isSpeaking = true;
      }.bind(this);
      // Speak ===========================
      this.synth.speak(this.greetingSpeech);
      // End speak ===========================
      this.greetingSpeech.onend = function() {
        this.isSpeaking = false;
      }.bind(this);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weather-box-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: #dee2e6 solid 1px;
  border-radius: 8px;
}
.weather-box-wrapper.weather-night {
  color: #ffffff;
  background: #2c3e50; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    #2c3e50,
    #2980b9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    #2c3e50,
    #2980b9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.weather-box-wrapper .weather-img {
  width: 80%;
  height: 100px;
  object-fit: contain;
}
.weather-box-wrapper .humidity-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.weather-box-wrapper .humidity-icon {
  width: 12px;
  object-fit: contain;
}
.weather-box-wrapper .speaking-icon {
  position: absolute;
  right: 5px;
  top: 5px;
}
@media screen and (max-width: 600px) {
  .weather-box-wrapper h4 {
    font-size: 1rem !important;
  }
}
</style>
