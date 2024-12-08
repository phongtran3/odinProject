import { addDays, format } from "date-fns";
import { setWeatherIcon } from "./iconHandler";

export const displayHeaderInfo = (forecast) => {
  document.querySelector(".current-city").textContent = forecast.resolvedAddress;
  document.querySelector(".current-description").textContent = forecast.description;
  document.querySelector(".current-temp").textContent = forecast.currentConditions.temp + "°";
  setWeatherIcon(forecast.currentConditions.icon, "current-temp-icon");
};

const setBackgroundImg = (temp) => {};
