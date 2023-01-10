//Select DOM Elements
let submitFormEl = document.querySelector("#searchBtn");
let inputEl = document.querySelector("#cityName");

//variables
let apiKey = "b6a9ee1026ace10f38b2457d21198081";
let storedCity = JSON.parse(localStorage.getItem("storedCity")) || [];
let city;

//get saved cities from local storage and display the as a list
function displaySearchedCity() {
  $("#storedCity").html("");
  for (let i = 0; i < storedCity.length; i++) {
    let li = document.createElement("button");
    $(li).attr("style", "width: 100%");
    li.textContent = storedCity[i];
    $("#storedCity").append(li);
    //add event listener to buttons to get and display weather
    $(li).on("click", function () {
      fetchWeather(li.textContent);
    });
  }
}
displaySearchedCity();

//fetch the current weather and forecast api's for the city the user inputs
function fetchWeather(city) {
    let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q= ${city}&appid=${apiKey}`;
    currentWeather(currentUrl);
    fiveDayWeather(forecastUrl);
    inputEl.value = "";
    $(".futureForecast").html("");
  }


function currentWeather() {

}


function fiveDayWeather() {

}


function displayCurrentWeather() {

}

function displayFiveDayForecast() {

    
}