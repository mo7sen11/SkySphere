const searchCityInput = document.getElementById("searchCityInput");
const btnSearch = document.getElementById("btnSearch");
let locationInfo; // location information
let forecastDay = []; //include 3 days
let currentDayInfo;
let secondDayInfo;
let thirdDayInfo;
let searchValue;
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let latitude;
let longitude;
document.querySelector('.spinner').classList.replace('d-none','d-flex');
  if (localStorage.getItem("cityName") == null) {
    searchValue = "london";
    callData();
  
  }
  else if (localStorage.getItem("cityName") != null) {
    searchValue = JSON.parse(localStorage.getItem("cityName"));
    callData();    
  }


//! Function to fetch weather data
async function fetchWeatherData() {
    document.querySelector('.spinner').classList.replace('d-none','d-flex');
  document.querySelector(".error").classList.replace("d-block", "d-none");
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a1526ebacae94e32824213914240107&q=${searchValue}&days=3`
    );
    let data = await response.json();
    if (response.status == 400) {
      throw new Error(`error`);
    }
    if (response.ok == true) {
      locationInfo = data.location;
      forecastDay = data.forecast;
      currentDayInfo = forecastDay.forecastday[0];
      secondDayInfo = forecastDay.forecastday[1];
      thirdDayInfo = forecastDay.forecastday[2];
      document.querySelector(".error").classList.replace("d-block", "d-none");
      document.querySelector('.spinner').classList.replace('d-flex','d-none');
      display();
    }
  } catch (error) {
    document.querySelector('.spinner').classList.replace('d-flex','d-none');
    document.querySelector(".error").classList.replace("d-none", "d-block");

  }
}
async function callData() {
  fetchWeatherData();
}

btnSearch.addEventListener("click", function () {
  searchValue = searchCityInput.value;
  localStorage.setItem("cityName", JSON.stringify(searchValue));
  callData();
});

function display() {
  let currentHourOfDayOne = new Date(`${locationInfo.localtime}`);
  let currentHourOfDayTwo = new Date(`${locationInfo.localtime}`);
  let currentHourOfDayThree = new Date(`${locationInfo.localtime}`);
  //display icon and condition
  document.querySelector(".item-one .weather-desc").innerHTML =
    currentDayInfo.day.condition.text;
  document.querySelector(".item-two .weather-desc").innerHTML =
    secondDayInfo.day.condition.text;
  document.querySelector(".item-three .weather-desc").innerHTML =
    thirdDayInfo.day.condition.text;
  //display temperature
  document.querySelector(".item-one .cel_temperature").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].temp_c;
  document.querySelector(".item-one .feh_temperature").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].temp_f;
  document.querySelector(".item-two .cel_temperature").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].temp_c;
  document.querySelector(".item-two .feh_temperature").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].temp_f;
  document.querySelector(".item-three .cel_temperature").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].temp_c;
  document.querySelector(".item-three .feh_temperature").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].temp_f;
  //display city name
  document.querySelector(".item-one .city-name").innerHTML = locationInfo.name;
  document.querySelector(".item-two .city-name").innerHTML = locationInfo.name;
  document.querySelector(".item-three .city-name").innerHTML =
    locationInfo.name;

  //display the date
  let currentDate = new Date(`${currentDayInfo.date}`);
  document.querySelector(".item-one .day").innerHTML =
    daysOfWeek[currentDate.getDay()];
  document.querySelector(".item-one .date").innerHTML =
    currentDate.getDate() + " " + monthsOfYear[currentDate.getMonth()];
  let secondDate = new Date(`${secondDayInfo.date}`);
  document.querySelector(".item-two .day").innerHTML =
    daysOfWeek[secondDate.getDay()];
  document.querySelector(".item-two .date").innerHTML =
    secondDate.getDate() + " " + monthsOfYear[secondDate.getMonth()];
  let thirdDate = new Date(`${thirdDayInfo.date}`);
  document.querySelector(".item-three .day").innerHTML =
    daysOfWeek[thirdDate.getDay()];
  document.querySelector(".item-three .date").innerHTML =
    thirdDate.getDate() + " " + monthsOfYear[secondDate.getMonth()];

  //display Data for day 1  every hour
  document.querySelector(".item-one .wind-speed").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].wind_kph;
  document.querySelector(".item-one .wind-direction").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].wind_dir;
  document.querySelector(".item-one .cloud").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].cloud;
  document.querySelector(".item-one .Humidity").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].humidity;
  document.querySelector(".item-one .pressure").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].pressure_mb;
  document.querySelector(".item-one .feels-c").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].feelslike_c;
  document.querySelector(".item-one .feels-f").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].feelslike_f;
  document.querySelector(".item-one .uv").innerHTML =
    currentDayInfo.hour[currentHourOfDayOne.getHours()].uv;
  //display Data for day 2  every hour
  document.querySelector(".item-two .wind-speed").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].wind_kph;
  document.querySelector(".item-two .wind-direction").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].wind_dir;
  document.querySelector(".item-two .cloud").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].cloud;
  document.querySelector(".item-two .Humidity").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].humidity;
  document.querySelector(".item-two .pressure").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].pressure_mb;
  document.querySelector(".item-two .feels-c").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].feelslike_c;
  document.querySelector(".item-two .feels-f").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].feelslike_f;
  document.querySelector(".item-two .uv").innerHTML =
    secondDayInfo.hour[currentHourOfDayTwo.getHours()].uv;

  //display Data for day 3  every hour
  document.querySelector(".item-three .wind-speed").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].wind_kph;
  document.querySelector(".item-three .wind-direction").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].wind_dir;
  document.querySelector(".item-three .cloud").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].cloud;
  document.querySelector(".item-three .Humidity").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].humidity;
  document.querySelector(".item-three .pressure").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].pressure_mb;
  document.querySelector(".item-three .feels-c").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].feelslike_c;
  document.querySelector(".item-three .feels-f").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].feelslike_f;
  document.querySelector(".item-three .uv").innerHTML =
    thirdDayInfo.hour[currentHourOfDayThree.getHours()].uv;
  //clear input
  searchCityInput.value = "";
}

// function to get the location of user
function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  userLocation();
}

function userLocation() {
  searchValue = latitude + "," + longitude;
  callData();
}

navigator.geolocation.getCurrentPosition(success);

