import "./styles/main.css";
import checkStorage from "./scripts/checkStorage.js";
import addEventListeners from "./scripts/screenHelper.js";
import axios from "axios";

const loaderContainer = document.getElementById("loader-container");

document.querySelectorAll('input[name="temperature"]').forEach((input) => {
  input.addEventListener("click", (event) => {
    localStorage.setItem("temperature", JSON.stringify(event.target.id));
  });
});

document.querySelectorAll('input[name="wind"]').forEach((input) => {
  input.addEventListener("click", (event) => {
    localStorage.setItem("wind", JSON.stringify(event.target.id));
  });
});

//Load units from storage
const initialLoad = () => {
  console.log("Weather Page");
  loaderContainer.style.display = loaderContainer.style.display === "none" ? "flex" : "none";

  if (checkStorage("localStorage")) {
    let temperature = localStorage.getItem("temperature");
    let wind = localStorage.getItem("wind");

    if (temperature) {
      const currentTemp = document.getElementById(JSON.parse(temperature));
      currentTemp.checked = true;
    }

    if (wind) {
      const currentWind = document.getElementById(JSON.parse(wind));
      currentWind.checked = true;
    }

    getData("Dallas");
  }
};

const getData = async (location) => {
  try {
    const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=4X4VD83KBP5K2S4VAULDEVYS8`);
    displayData(response.data);
    loaderContainer.style.display = loaderContainer.style.display === "none" ? "flex" : "none";
  } catch (error) {
    console.log(error);
    loaderContainer.style.display = loaderContainer.style.display === "none" ? "flex" : "none";
    alert("Location not found. Try adding a City/County/Zip Code");
  }
};

function displayData(forecast) {
  console.log(forecast);
}

initialLoad();
addEventListeners();
