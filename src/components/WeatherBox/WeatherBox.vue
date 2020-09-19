<template>
  <div
    :class="isDay ? 'weather-box-wrapper' : 'weather-box-wrapper weather-night'"
  >
    <span>{{ convertDayTime(weatherData.time) }}</span>
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
    <div
      v-if="weatherData.humidity"
      v-bind:style="{ display: 'flex', justifyContent: 'center' }"
    >
      <span>{{ weatherData.humidity }}</span>
      <img
        class="humidity-icon"
        src="../../assets/icons/weather/humidity.svg"
      />
    </div>
    <span v-if="weatherData.summary">{{ weatherData.summary }}</span>
  </div>
</template>

<script>
export default {
  name: "WeatherBox",
  props: {
    weatherData: Object,
  },
  data() {
    return {
      isDay: true,
    };
  },
  mounted() {
    this.detectIsDayTime();
  },
  methods: {
    convertToCelsius(cel) {
      return ((parseFloat(cel) - 32) / 1.8).toFixed(1);
    },
    detectIsDayTime() {
      var hr = new Date().getHours();
      console.log(hr);
      if (hr > 3 && hr < 16) {
        this.isDay = true;
      } else {
        this.isDay = false;
      }
    },
    convertDayTime(time) {
      if (typeof time === "string") {
        return time;
      }
      let daytime = new Date(time);
      return (
        daytime.getDate() +
        "/" +
        daytime.getMonth() +
        1 +
        "/" +
        daytime.getFullYear()
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weather-box-wrapper {
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
  width: 70%;
  height: 100px;
  object-fit: contain;
  margin: 10px;
}
.weather-box-wrapper .humidity-icon {
  width: 15%;
  object-fit: contain;
}
</style>
