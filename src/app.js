//day and time
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hour}:${minutes}`;
}
function getforecast(cordinates) {
  let apiKey = "04dd91307ec56c5bdc7c8b53d6799c73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
//weather
function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celsiusTemperature;
  let placeElement = document.querySelector("#place");
  placeElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity + "%";
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatTime(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  getforecast(response.data.coord);
  /*let fahElement = document.querySelector("#fah");
  fahElement.addEventListener("click", celsiusToFahrenheit);
  let celElement = document.querySelector("#cel");
  celElement.addEventListener("click", fahrenheitToCelsius);*/
}

//unit conversion
/*function celsiusToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  cel.classList.remove("active");
  fah.classList.add("active");
  let celtofah = Math.round((celsiusTemperature * 9) / 5 + 32);
  console.log(celtofah);
  tempElement.innerHTML = celtofah;
}
function fahrenheitToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  fah.classList.remove("active");
  cel.classList.add("active");
  tempElement.innerHTML = celsiusTemperature;
}*/

//type a city
function search(city) {
  let apiKey = "04dd91307ec56c5bdc7c8b53d6799c73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  //console.log(cityInputElement.value);
  search(cityInputElement.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  day = days[date.getDay()];
  return day;
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastday.dt)}</div>
            <div class="weather-forecast-icon">
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastday.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="48px"
                  />
            </div>
            <div class="weather-forecast-temperature">
                  <span class="weather-forecast-maxtemp">${Math.round(
                    forecastday.temp.max
                  )}°</span>
                  <span class="weather-forecast-mintemp">${Math.round(
                    forecastday.temp.min
                  )}°</span>
            </div>
        </div>
         `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
