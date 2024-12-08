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

export const setWeatherIcon = (iconName, id) => {
  switch (iconName) {
    case "clear-day":
      addIcon(clearDay, id);
      break;
    case "clear-night":
      addIcon(clearNight, id);
      break;
    case "cloudy":
      addIcon(cloudy, id);
      break;
    case "fog":
      addIcon(fog, id);
      break;
    case "partly-cloudy-day":
      addIcon(partlyCloudyDay, id);
      break;
    case "partly-cloudy-night":
      addIcon(partlyCloudyNight, id);
      break;
    case "rain":
      addIcon(rain, id);
      break;
    case "showers-day":
      addIcon(showersDay, id);
      break;
    case "showers-night":
      addIcon(showersNight, id);
      break;
    case "snow":
      addIcon(snow, id);
      break;
    case "snow-showers-day":
      addIcon(snowShowersDay, id);
      break;
    case "snow-showers-night":
      addIcon(snowShowersNight, id);
      break;
    case "thunder-rain":
      addIcon(thunderRain, id);
      break;
    case "thunder-showers-day":
      addIcon(thunderShowersDay, id);
      break;
    case "thunder-showers-night":
      addIcon(thunderShowersNight, id);
      break;
    case "wind":
      addIcon(wind, id);
      break;
  }
};

const addIcon = (icon, id) => {
  document.getElementById(id).src = icon;
};
