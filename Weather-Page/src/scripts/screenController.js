import { getHours, format, parse } from "date-fns";
import { getWeatherIcon } from "./iconHandler";

import coolWeather from "../assets/images/cool-weather.jpg";
import warmWeather from "../assets/images/warm-weather.jpg";

export const displayHeaderInfo = (forecast) => {
  document.querySelector(".current-city").textContent = forecast.resolvedAddress;
  document.querySelector(".current-description").textContent = forecast.description;

  if (localStorage.getItem("temperature") === "fahrenheit") {
    document.querySelector(".current-temp").textContent = forecast.currentConditions.temp + "°";
    document.querySelector(".current-temp").setAttribute("data-temp", forecast.currentConditions.temp);
  } else {
    let celsius = ((forecast.currentConditions.temp - 32) / 1.8).toFixed(1);
    document.querySelector(".current-temp").setAttribute("data-temp", celsius);
    document.querySelector(".current-temp").textContent = celsius + "°";
  }

  let weatherIcon = getWeatherIcon(forecast.currentConditions.icon);
  document.getElementById("current-temp-icon").src = weatherIcon;

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

export const displayHourlyInfo = (forecast) => {
  let currentHr = getHours(new Date());
  let currentDay = 0;

  const hourlyForecasts = document.querySelectorAll(".hourly-forecast");

  hourlyForecasts.forEach((forecastDiv) => {
    if (currentHr === 24) {
      currentHr = 1;
      currentDay = 1;
    }

    let formattedTime = formatTime(forecast.days[currentDay].hours[currentHr].datetime);
    forecastDiv.querySelector(".hour-time").textContent = formattedTime;

    forecastDiv.querySelector(".hour-icon").src = getWeatherIcon(forecast.days[currentDay].hours[currentHr].icon);

    let foreCastTemp = forecast.days[currentDay].hours[currentHr].temp;
    if (localStorage.getItem("temperature") === "fahrenheit") {
      forecastDiv.querySelector(".hour-forecast").textContent = foreCastTemp + "°";
      forecastDiv.querySelector(".hour-forecast").setAttribute("data-temp", foreCastTemp);
    } else {
      let celsius = ((foreCastTemp - 32) / 1.8).toFixed(1);
      forecastDiv.querySelector(".hour-forecast").setAttribute("data-temp", celsius);
      forecastDiv.querySelector(".hour-forecast").textContent = celsius + "°";
    }

    currentHr++;
  });
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

const formatTime = (time) => {
  let parseTime = parse(time, "HH:mm:ss", new Date());
  return format(parseTime, "h:mm a");
};
