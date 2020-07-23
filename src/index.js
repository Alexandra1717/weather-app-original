let currentHours = new Date();

function formatDate(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
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
}

function showCity(event) {
    event.preventDefault();
    let city = document.querySelector("#input-city");
    let display = document.querySelector("#display-city");
    let apiKey = `39ba6876bb8a1587562befd26765e6ab`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
        city.value
        }&appid=${apiKey}&units=metric`;
    display.innerHTML = `${city.value}`;
    axios.get(apiUrl).then(showTemp);
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