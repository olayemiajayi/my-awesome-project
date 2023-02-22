let city = document.querySelector("#city-date");
let date = new Date();
console.log(date);
console.log(date.getDay());
console.log(date.getDate());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(city);

let days = [
  "sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let week = date.getDate();
let time = date.getMinutes();
let seconds = date.getSeconds();
city.innerHTML = `${day}, ${week} ${time}:${seconds}`;

function search(event) {
  event.preventDefault();
  let country = document.querySelector("#search-input");
  console.log(country.value);
  let heading = document.querySelector("#country");
  heading.innerHTML = `${country.value}`;
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.value}&appid=ac209dae1f283fb332a5bb7f50b0f468&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let town = document.querySelector("#search-form");
town.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  console.log(response.data.weather.description);
  console.log(response.data.name);
  console.log(response.data.main.humidity);
  console.log(response.data.wind.speed);
  let temperature = Math.round(response.data.main.temp);
  let city = document.querySelector("#country");
  let state = document.querySelector("#weather");
  let cloud = document.querySelector("#current-weather");
  let id = document.querySelector("#temperature-city");
  id.innerHTML = `${temperature}°C`;
  state.innerHTML = `${response.data.weather[0].description}`;
  city.innerHTML = `${response.data.name}`;
  cloud.innerHTML = `Humidity:${response.data.main.humidity}%|Wind:${response.data.wind.speed}Km/h`;
}

function showCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ac209dae1f283fb332a5bb7f50b0f468&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCity);
}
let button = document.querySelector("#button-button");
button.addEventListener("click", getCurrentPosition);
