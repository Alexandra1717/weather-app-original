let currentHours = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let actualHours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${actualHours}:${minutes}`;
}

let realHours = document.querySelector("#time");
realHours.innerHTML = formatDate(currentHours);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//Show city & temperature

function showTemp(response) {
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  celsiusTemp = response.data.main.temp;
}

function showFahrenheit(event) {
  event.preventDefault();
  let tempEl = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempEl.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsius(event) {
  event.preventDefault();
  let tempEl = document.querySelector("#temperature");
  tempEl.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function displayForecast(response) {
  console.log(response);
  let forecastEl = document.querySelector("#forecast");
  forecast = response.data.list[0];
  forecastEL.innerHTML = `<div class="container" id="forecast">
        <div class="row">
        <div class="col-2">${forecast.dt} 
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png">Max ${Math.round(
    forecast.main.temp_max
  )}&deg Min ${Math.round(forecast.main.temp_min)}&deg
        </div>
        </div>`;

  forecast = response.data.list[1];
  forecastEL.innerHTML = `<div class="container" id="forecast">
        <div class="row">
        <div class="col-2">${forecast.dt} 
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png">Max ${Math.round(
    forecast.main.temp_max
  )}&deg Min ${Math.round(forecast.main.temp_min)}&deg
        </div>
        </div>`;

  forecast = response.data.list[2];
  forecastEL.innerHTML = `<div class="container" id="forecast">
        <div class="row">
        <div class="col-2">${forecast.dt} 
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png">Max ${Math.round(
    forecast.main.temp_max
  )}&deg Min ${Math.round(forecast.main.temp_min)}&deg
        </div>
        </div>`;
}

function showCity() {
  let city = document.querySelector("#input-city");
  let display = document.querySelector("#display-city");
  let apiKey = `39ba6876bb8a1587562befd26765e6ab`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  display.innerHTML = `${city.value}`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

let show = document.querySelector("#enter-city");
show.addEventListener("submit", showCity);

//Get location
function showLocation(response) {
  console.log(response);
  document.querySelector("#display-city").innerHTML = `${response.data.name}`;
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `39ba6876bb8a1587562befd26765e6ab`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".location-button");
locationButton.addEventListener("click", getCurrentLocation);
