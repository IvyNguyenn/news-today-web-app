export const API_URL = "https://api-news-service.herokuapp.com";
// export const API_URL = "http://localhost:8081/news";
export const DARK_SKY_API = "https://api.darksky.net/forecast/";
export const REFRESH_TIME = 900000; // call api each 15 minute
export const DARK_SKY_KEY = "55708754cbc8ee85faf0439e6bd66a6d";

export const CORS_API = "https://cors-anywhere.herokuapp.com/";
export const WEATHER_LOCATION = {
  VIET_NAM: {
    latitude: 14.0583,
    longitude: 108.2772,
  },
  HO_CHI_MINH: {
    latitude: 10.8231,
    longitude: 106.6297,
  },
  HA_NOI: {
    latitude: 21.0278,
    longitude: 105.8342,
  },
  DA_NANG: {
    latitude: 16.0544,
    longitude: 108.2022,
  },
};
export const WEATHER_IMG = {
  rain: "../../assets/icons/weather/rain.svg",
};

export const DATE_TIME_FORMAT = {
  DATE_MONTH_YEAR: "DD/MM/YYYY",
  DATE_TIME: "DD/MM/YYYY - hh:mm:ss",
  DATE_SHORT_TIME: "DD/MM/YYYY - HH:mm",
  DATE_TIME_24H: "YYYY-MM-DD HH:mm:ss",
  YEAR_MONTH_DATE: "YYYY/MM/DD",
  MONTH_NAME: "MMMM",
  YEAR: "YYYY",
  DATE: "DD",
  DAILY: "dddd",
};

export const TIME_TYPE = {
  DAILY: "DAILY",
  HOURLY: "HOURLY",
};
