import { addDays, format, parse } from "date-fns";
import { setWeatherIcon } from "./iconHandler";
import coolWeather from "../assets/images/cool-weather.jpg";
import warmWeather from "../assets/images/warm-weather.jpg";

export const displayHeaderInfo = (forecast) => {
  document.querySelector(".current-city").textContent = forecast.resolvedAddress;
  document.querySelector(".current-description").textContent = forecast.description;
  document.querySelector(".current-temp").textContent = forecast.currentConditions.temp + "°";
  setWeatherIcon(forecast.currentConditions.icon, "current-temp-icon");
  document.getElementById("current-temp-icon").alt = `${forecast.currentConditions.icon} icon`;
  //setBackgroundImg(forecast.currentConditions.temp);
};

export const displayCurrentInfo = (forecast) => {
  document.getElementById("humidity").textContent = forecast.humidity + "%";
  document.getElementById("rain-chance").textContent = forecast.precip + "%";
  document.getElementById("snow-chance").textContent = forecast.snow + "%";

  const formatSunrise = format(parse(forecast.sunrise, "HH:mm:ss", new Date()), "h:mm a");
  document.getElementById("sunrise").textContent = formatSunrise;

  const formatSunset = format(parse(forecast.sunset, "HH:mm:ss", new Date()), "h:mm a");
  document.getElementById("sunset").textContent = formatSunset;

  let mphWindSpeed = forecast.windspeed;
  if (localStorage.getItem("wind") === "miles") {
    document.getElementById("wind-speed").textContent = mphWindSpeed + " mph";
  } else {
    const kmhWindSpeed = (mphWindSpeed * 1.60934).toFixed(2);
    document.getElementById("wind-speed").textContent = kmhWindSpeed + " kmh";
  }
};

const setBackgroundImg = (temp) => {
  console.log(temp);
  const container = document.getElementById("container");
  if (temp <= 60) {
    container.style.backgroundImage = `url(${coolWeather})`;
  } else {
    container.style.backgroundImage = `url(${warmWeather})`;
  }
};
