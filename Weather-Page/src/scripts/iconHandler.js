import clearDay from "../assets/svgs/weather-types/clear-day.svg";
import clearNight from "../assets/svgs/weather-types/clear-night.svg";
import cloudy from "../assets/svgs/weather-types/cloudy.svg";
import fog from "../assets/svgs/weather-types/fog.svg";
import partlyCloudyDay from "../assets/svgs/weather-types/partly-cloudy-day.svg";
import partlyCloudyNight from "../assets/svgs/weather-types/partly-cloudy-night.svg";
import rain from "../assets/svgs/weather-types/rain.svg";
import showersDay from "../assets/svgs/weather-types/showers-day.svg";
import showersNight from "../assets/svgs/weather-types/showers-night.svg";
import snow from "../assets/svgs/weather-types/snow.svg";
import snowShowersDay from "../assets/svgs/weather-types/snow-showers-day.svg";
import snowShowersNight from "../assets/svgs/weather-types/snow-showers-night.svg";
import thunderRain from "../assets/svgs/weather-types/thunder-rain.svg";
import thunderShowersDay from "../assets/svgs/weather-types/thunder-showers-day.svg";
import thunderShowersNight from "../assets/svgs/weather-types/thunder-showers-night.svg";
import wind from "../assets/svgs/weather-types/wind.svg";

export const getWeatherIcon = (iconName) => {
  switch (iconName) {
    case "clear-day":
      return clearDay;
    case "clear-night":
      return clearNight;
    case "cloudy":
      return cloudy;
    case "fog":
      return fog;
    case "partly-cloudy-day":
      return partlyCloudyDay;
    case "partly-cloudy-night":
      return partlyCloudyNight;
    case "rain":
      return rain;
    case "showers-day":
      return showersDay;
    case "showers-night":
      return showersNight;
    case "snow":
      return snow;
    case "snow-showers-day":
      return snowShowersDay;
    case "snow-showers-night":
      return snowShowersNight;
    case "thunder-rain":
      return thunderRain;
    case "thunder-showers-day":
      return thunderShowersDay;
    case "thunder-showers-night":
      return thunderShowersNight;
    case "wind":
      return wind;
  }
};
