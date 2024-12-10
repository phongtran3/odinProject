export const updateWindSpeed = (windSpeed) => {
  console.log(windSpeed);
  const windSpeedStringArr = document.getElementById("wind-speed").textContent.split(" ");
  const currWindSpeedValue = windSpeedStringArr[0];

  if (windSpeed === "kilometers") {
    const kmh = (currWindSpeedValue * 1.60934).toFixed(2);
    document.getElementById("wind-speed").textContent = kmh + " kmh";
  } else {
    const mph = (currWindSpeedValue / 1.60934).toFixed(2);
    document.getElementById("wind-speed").textContent = mph + " mph";
  }
};

export const updateTemperature = (temp) => {
  const hourlyForecasts = document.querySelectorAll(".hour-forecast");

  let currHeaderTemp = document.querySelector(".current-temp").getAttribute("data-temp");

  let newHeaderTemp = updateTempDisplay(currHeaderTemp, temp === "celsius");
  document.querySelector(".current-temp").textContent = newHeaderTemp + "°";
  document.querySelector(".current-temp").setAttribute("data-temp", newHeaderTemp);

  hourlyForecasts.forEach((forecast) => {
    const forecastTemp = parseFloat(forecast.getAttribute("data-temp"));
    let newTemp = updateTempDisplay(forecastTemp, temp === "celsius");
    forecast.textContent = newTemp + "°";
    forecast.setAttribute("data-temp", newTemp);
  });
};

const updateTempDisplay = (temp, isCelsius) => {
  const newTemp = isCelsius ? fahrenheitToCelsius(temp) : celsiusToFahrenheit(temp);
  return newTemp;
};

const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) / 1.8).toFixed(1);
};

const celsiusToFahrenheit = (celsius) => {
  return (celsius * 1.8 + 32).toFixed(1);
};
