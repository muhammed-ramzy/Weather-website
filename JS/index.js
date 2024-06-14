'usestrict';

let apiKey = "f7ff3b3d362a4d5393130820241206";
let fullURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=cairo&days=3`;

let content = document.getElementById('cards');
console.log(content)

let weatherData = {};

// Data needed to be extracted
let date, dayName, dayNumber, month, secondDayName, thirdDayName;
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let cityName;
let temp_c, secMaxTemp, secMinTemp, thrMaxTemp, thrMinTemp;
let conditionText, secConditionText, thrConditionText;
let conditionIcon, secConditionIcon, thrConditionIcon;
let windSpeed, chanceOfRain, direction;

async function getWeatherData(object) {
    let fetchedData = await fetch(fullURL);
    object = await fetchedData.json();

    extractWeatherData(object);
    display();

}

function extractWeatherData(object) {
    // Extracting different data
    cityName = object.location.name;
    windSpeed = object.current.wind_kph;
    chanceOfRain = object.forecast.forecastday[0].day.daily_chance_of_rain;

    direction = object.current.wind_dir;
    switch (direction) {
        case "N":
            direction = "North";
            break;
        case "NNE":
            direction = "North-Northeast";
            break;
        case "NE":
            direction = "Northeast";
            break;
        case "ENE":
            direction = "East-Northeast";
            break;
        case "E":
            direction = "East";
            break;
        case "ESE":
            direction = "East-Southeast";
            break;
        case "SE":
            direction = "Southeast";
            break;
        case "SSE":
            direction = "South-Southeast";
            break;
        case "S":
            direction = "South";
            break;
        case "SSW":
            direction = "South-Southwest";
            break;
        case "SW":
            direction = "Southwest";
            break;
        case "WSW":
            direction = "West-Southwest";
            break;
        case "W":
            direction = "West";
            break;
        case "WNW":
            direction = "West-Northwest";
            break;
        case "NW":
            direction = "Northwest";
            break;
        case "NNW":
            direction = "North-Northwest";
            break;
        default:
            direction = "Invalid direction abbreviation";
    }

    // Extracting tempretures
    temp_c = object.current.temp_c;

    secMaxTemp = object.forecast.forecastday[1].day.maxtemp_c;
    secMinTemp = object.forecast.forecastday[1].day.mintemp_c;

    thrMaxTemp = object.forecast.forecastday[2].day.maxtemp_c;
    thrMinTemp = object.forecast.forecastday[2].day.mintemp_c;

    //Extracting current day name
    date = new Date(object.forecast.forecastday[0].date);
    dayName = dayNames[date.getDay()];

    // Extracting tommorow and the day after tomorrow names
    secondDayName = date.getDay() + 1;
    thirdDayName = date.getDay() + 2;

    secondDayName = secondDayName > 6 ? 7 - secondDayName : secondDayName;
    thirdDayName = thirdDayName > 6 ? 7 - thirdDayName : thirdDayName;

    secondDayName = dayNames[secondDayName];
    thirdDayName = dayNames[thirdDayName];

    // Extracting day number
    dayNumber = date.getDate();

    //Extracting month name
    month = months[date.getMonth()];


    // Extracting Condition data
    conditionText = object.forecast.forecastday[0].day.condition.text;
    conditionIcon = object.forecast.forecastday[0].day.condition.icon;


    secConditionText = object.forecast.forecastday[1].day.condition.text;
    secConditionIcon = object.forecast.forecastday[1].day.condition.icon;

    thrConditionText = object.forecast.forecastday[2].day.condition.text;
    thrConditionIcon = object.forecast.forecastday[2].day.condition.icon;
}

function display() {
    box = `<div class="card col-4 border-0 my-body-text-color p-0">
                            <div class="card-header my-main-small-text-size border-0 my-card-lighter-header-color d-flex justify-content-between">
                                <span id="today">${dayName}</span>
                                <span id="date">${dayNumber}${month}</span>
                            </div>
                            <div class="card-body my-lighter-color">
                                <h5 id="city" class="card-title py-3">${cityName}</h5>
                                <p id="currentTemp" class="card-text display-1 fw-bold text-white mb-4">${temp_c}<sup>o</sup>C</p>
                                <p id="todayCondition" class="weather-icon">
                                    <img src="${conditionIcon}" alt="">
                                </p>
                                <p id="condition" class="weather-condition my-blue-text-color">
                                    ${conditionText}
                                </p>
                                <div class="weather-properties">
                                    <span class="me-3"><img src="images/icon-umberella.png" alt=""> ${chanceOfRain}%</span>
                                    <span id="wind" class="me-3"><img src="images/icon-wind.png" alt=""> ${windSpeed}km/h</span>
                                    <span class="me-3"><img src="images/icon-compass.png" alt=""> ${direction}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card col-4 border-0 my-body-text-color p-0 ">
                            <div class="card-header middle-card my-main-small-text-size border-0 my-card-light-header-color text-center">
                                <span>${secondDayName}</span>
                            </div>
                            <div class="card-body my-light-color text-center pt-5">
                                
                                <p class="weather-icon">
                                    <img src="${secConditionIcon}" alt="">
                                </p>
                                <p class="card-text my-main-large-text-size fw-bold text-white large-deg mb-1">${secMaxTemp}<sup>o</sup>C</p>
                                <p class="card-text text-white small-deg">${secMinTemp}<sup>o</sup>C</p>
                                <p class="weather-condition my-blue-text-color">
                                    ${secConditionText}
                                </p>
                            </div>
                        </div>
                        <div class="card col-4 border-0 my-body-text-color p-0 ">
                            <div class="card-header my-main-small-text-size middle-card border-0 my-card-lighter-header-color text-center">
                                <span>${thirdDayName}</span>
                            </div>
                            <div class="card-body my-lighter-color text-center pt-5">
                                
                                <p class="weather-icon">
                                    <img src="${thrConditionIcon}" alt="">
                                </p>
                                <p class="card-text my-main-large-text-size fw-bold text-white large-deg mb-1">${thrMaxTemp}<sup>o</sup>C</p>
                                <p class="card-text text-white small-deg">${thrMinTemp}<sup>o</sup>C</p>
                                <p class="weather-condition my-blue-text-color">
                                    ${thrConditionText}
                                </p>
                            </div>
                        </div>`;
    content.innerHTML = box;
}

getWeatherData(weatherData)
