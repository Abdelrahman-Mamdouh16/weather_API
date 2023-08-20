//!-----------inputErea Section start-------------*/
var inputErea = document.getElementById("inputErea");
inputErea.addEventListener('input', function () {
    var inputEreaData = inputErea.value;
    startApp(inputEreaData);
})

//!-----------inputErea Section start-------------*/

//*-----------------------------------------------*/

//!-----------today Section start-----------------*/
var todayName = document.getElementById("todayName");
var todayDate = document.getElementById("todayDate");
var todayLocation = document.getElementById("todayLocation");
var todayDegreeNum = document.getElementById("todayDegreeNum");
var todayForecastIcon = document.getElementById("todayForecastIcon");
var todayCustom = document.getElementById("todayCustom");
var humidity = document.getElementById("humidity");
var windKph = document.getElementById("windKph");
var windDir = document.getElementById("windDir");
var today_Date = new Date();


function todayDisplay(data) {
    todayName.innerHTML = today_Date.toLocaleDateString("en-US", { weekday: "long" });
    todayDate.innerHTML = today_Date.getDate() + " " + today_Date.toLocaleDateString("en-US", { month: "long" })
    todayLocation.innerHTML = data.location.name;
    todayDegreeNum.innerHTML = `${data.current.temp_c}<sup>o</sup>C`;
    todayForecastIcon.setAttribute('src', data.current.condition.icon);
    todayCustom.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + " %";
    windKph.innerHTML = data.current.wind_kph + " km/h";
    windDir.innerHTML = data.current.wind_dir;
}

//!------------today Section end-----------------*/

//*----------------------------------------------*/

//!------------NextDay Section Start------------*/
var tomorrowDay = document.querySelectorAll("#tomorrowDay");
var tomorrowForecastIcon = document.querySelectorAll("#tomorrowForecastIcon");
var tomorrowDegree = document.querySelectorAll("#tomorrowDegree");
var tomorrowSmall = document.querySelectorAll("#tomorrowSmall");
var tomorrowCustom = document.querySelectorAll("#tomorrowCustom");

function NextDayDisplay(data) {
    var forecastData = data.forecast.forecastday;
    for (var i = 0; i < 2; i++) {
        var today_Date = new Date(forecastData[i+1].date);
        tomorrowDay[i].innerHTML = today_Date.toLocaleDateString("en-US", { weekday: "long" });
        tomorrowForecastIcon[i].setAttribute('src', forecastData[i + 1].day.condition.icon);
        tomorrowDegree[i].innerHTML = `${forecastData[i + 1].day.maxtemp_c}<sup>o</sup>C`;
        tomorrowSmall[i].innerHTML = `${forecastData[i + 1].day.mintemp_c}<sup>o</sup>C`;
        tomorrowCustom[i].innerHTML = forecastData[i + 1].day.condition.text;
    }
}
//!------------NextDay Section end-------------*/

//*--------------------------------------------*/

//!------------AfterTomorrow Section Start------------*/
// var afterTomorrowDay = document.getElementById("afterTomorrowDay");
// var afterTomorrowForecastIcon = document.getElementById("afterTomorrowForecastIcon");
// var afterTomorrowDegree = document.getElementById("afterTomorrowDegree");
// var afterTomorrowSmall = document.getElementById("afterTomorrowSmall");
// var afterTomorrowCustom = document.getElementById("afterTomorrowCustom");

// function AfterTomorrowDisplay(data) {
//     var forecastData = data.forecast.forecastday;
//     for (var i = 0; i <= 2; i++) {
//         afterTomorrowForecastIcon.setAttribute('src', forecastData[i+2].day.condition.icon);
//         afterTomorrowDegree.innerHTML = `${forecastData[i+2].day.maxtemp_c}<sup>o</sup>C`;
//         afterTomorrowSmall.innerHTML = `${forecastData[i+2].day.mintemp_c}<sup>o</sup>C`;
//         afterTomorrowCustom.innerHTML = forecastData[i+2].day.condition.text;
//     }
// }
//!------------AfterTomorrow Section end-------------*/

//*---------------------------------------------*/


//!------------API Section Start------------*/

async function weatherAPI_Connection(location) {
    var weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2dd800535034418284f140234231908&q=${location}&days=3&aqi=yes&alerts=yes`);
    var weatherData = await weatherResponse.json();
    return weatherData;
}
//!------------API Section End---------------------*/

//*------------------------------------------------*/

//!------------Start App Section Start-------------*/
async function startApp(location = "london") {
    var weatherAPI = await weatherAPI_Connection(location);
    if (!weatherAPI.error) {
        todayDisplay(weatherAPI);
        NextDayDisplay(weatherAPI);
    }
}
startApp();
//!------------Start App Section end-------------*/
