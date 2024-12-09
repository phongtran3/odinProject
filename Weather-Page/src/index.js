import "./styles/main.css";
import checkStorage from "./scripts/checkStorage.js";
import addEventListeners from "./scripts/screenHelper.js";
import axios from "axios";
import { displayHeaderInfo, displayCurrentInfo } from "./scripts/screenController.js";
import { changeWindSpeed } from "./scripts/unitConversion.js";

const loaderContainer = document.getElementById("loader-container");
const container = document.getElementById("container");

document.querySelectorAll('input[name="temperature"]').forEach((input) => {
  input.addEventListener("click", (event) => {
    if (localStorage.getItem("temperature") === event.target.id) return;
    localStorage.setItem("temperature", event.target.id);
    //update page
  });
});

document.querySelectorAll('input[name="wind"]').forEach((input) => {
  input.addEventListener("click", (event) => {
    if (localStorage.getItem("wind") === event.target.id) return;
    localStorage.setItem("wind", event.target.id);
    changeWindSpeed(event.target.id);
  });
});

//Load units from storage
const initialLoad = () => {
  loaderContainer.style.display = loaderContainer.style.display === "none" ? "flex" : "none";

  if (checkStorage("localStorage")) {
    let temperature = localStorage.getItem("temperature");
    let wind = localStorage.getItem("wind");
    let location = localStorage.getItem("location");

    if (temperature) {
      const currentTemp = document.getElementById(temperature);
      currentTemp.checked = true;
    } else {
      localStorage.setItem("temperature", "fahrenheit");
      document.getElementById("fahrenheit").checked = true;
    }

    if (wind) {
      const currentWind = document.getElementById(wind);
      currentWind.checked = true;
    } else {
      localStorage.setItem("wind", "miles");
      document.getElementById("miles").checked = true;
    }

    if (location) {
      getData(location);
    } else {
      localStorage.setItem("city", "Dallas");
      getData("Dallas");
    }
  }
};

const getData = async (location) => {
  try {
    const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=4X4VD83KBP5K2S4VAULDEVYS8`);
    displayData(response.data);
    loaderContainer.style.display = "none";
    container.style.display = "block";
  } catch (error) {
    console.log(error);
    loaderContainer.style.display = "none";
    alert("Location not found. Try adding a City/County/Zip Code");
  }
};

function displayData(forecast) {
  console.log(forecast);
  displayHeaderInfo(forecast);
  displayCurrentInfo(forecast.currentConditions);
}

initialLoad();
addEventListeners();
