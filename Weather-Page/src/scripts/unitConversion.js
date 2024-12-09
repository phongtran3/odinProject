export const changeWindSpeed = (windSpeed) => {
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
