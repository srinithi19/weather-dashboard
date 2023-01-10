//Select DOM Elements
let submitFormEl = document.querySelector("#searchBtn");
let inputEl = document.querySelector("#cityName");

//variables
let apiKey = "b6a9ee1026ace10f38b2457d21198081";
let storedCity = JSON.parse(localStorage.getItem("storedCity")) || [];
let city;
let units='imperial';

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

//function to make api call to retrieve lat & lon of respective city and make current weather and fivedayweather ap call
 function fetchWeather(city) {
    let coords = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    fetch(coords)
    .then(function(response){return response.json()})
    .then(function(data){ 
        console.log(data);
        let lat = data[0].lat;
        let lon = data[0].lon;
        console.log(lat,lon,apiKey,units);
        currentWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`);
        //forecastWeather(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        inputEl.value = "";
        $(".futureForecast").html("");
    
    });
}

// function to make server side api call and display current weather
function currentWeather(currentUrl) {
    fetch(currentUrl)
    .then(function(response){return response.json()})
    .then(function(data){ 
        console.log(data);
        let currentDate = new Date(data.dt * 1000);
        let text = "Current Weather";
        $(".currentWeather").attr("style", "border: 1px solid black");
        $(".currentWeather").html(
            `<h2>${text}</h2><br>
            <h3>${data.name} (${currentDate.toLocaleDateString("en-US")})</h3> 
            <figure>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"  alt="icon showing the weather">
            </figure>
            <ul>  <li>Temp: ${data.main.temp} \u2109</li>
            <li>Wind: ${data.wind.speed} MPH</li>
            <li>Humidity: ${data.main.humidity} %</li></ul>`
            );
    });        
}

    
    //clear local storage
    $("#clear").on("click", function () {
        localStorage.clear();
        $("#storedCity").html("");
        location.reload();
        return false;
    });
    
    //event listener and get city from user input or saved cities
    submitFormEl.addEventListener("click", function () {
        city = inputEl.value.trim();
        if (city === "") {
            return;
        }
        //store the searched city in an array in localStorage
        if (storedCity.indexOf(city) === -1) {
            storedCity.push(city);
            localStorage.setItem("storedCity", JSON.stringify(storedCity));
            displaySearchedCity();
        }
        fetchWeather(city);
    });