const apiKey; //must add API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherImage = document.querySelector(".weatherImage");

async function checkWeather () {
    const city = searchBox.value
    let response = await fetch(apiUrl + city + `&appid=${apiKey}` + '&units=metric');
    let data = await response.json();
    
    console.log(data)
    document.querySelector(".cityName").innerHTML = data.name
    
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C"
    document.querySelector(".minTemp").innerHTML = Math.round(data.main.temp_min) + "°C"
    document.querySelector(".maxTemp").innerHTML = Math.round(data.main.temp_max) + "°C"
   
    document.querySelector("#FLValue").innerHTML = Math.round(data.main.feels_like) + "°C"
    document.querySelector("#windValue").innerHTML = Math.round(data.wind.speed) + "m/s"
    document.querySelector("#humidityValue").innerHTML = Math.round(data.main.humidity) + "%"
    document.querySelector("#pressureValue").innerHTML = Math.round(data.main.pressure) + "hPa"

   
   switch (data.weather[0].main) {
        case 'Clear': {
            document.body.style.backgroundImage = 'linear-gradient(#fceabb, #FFC371)';
            document.querySelector(".cityName").style.backgroundColor = '#FFC371'
            document.querySelector(".cityName").style.textShadow = '2px 2px 10px #fceabb' 
            weatherImage.src = "weatherImages/clear.png"
            break;
        }
        case 'Clouds': {
            document.body.style.backgroundImage = 'linear-gradient(#eef2f3, #8e9eab)';
            document.querySelector(".cityName").style.backgroundColor = '#8e9eab'
            document.querySelector(".cityName").style.textShadow = '2px 2px 10px #eef2f3'
            weatherImage.src = "weatherImages/clouds.png"
            break;
        }
        case 'Haze': {
            document.body.style.backgroundImage = 'linear-gradient(#eef2f3, #8e9eab)';
            document.querySelector(".cityName").style.backgroundColor = '#8e9eab'
            document.querySelector(".cityName").style.textShadow = '2px 2px 10px #eef2f3'
            weatherImage.src = "weatherImages/clouds.png"
            break;
        }
        case 'Rain': {
            document.body.style.backgroundImage = 'linear-gradient(#485563, #29323c)';
            document.querySelector(".cityName").style.backgroundColor = '#29323c'
            document.querySelector(".cityName").style.textShadow = '2px 2px 10px #485563'
            weatherImage.src = "weatherImages/rain.png"
            break;
        }
        case 'Drizzle': {
            document.body.style.backgroundImage = 'linear-gradient(#3d72b4, #525252)';
            document.querySelector(".cityName").style.backgroundColor = '#525252'
            document.querySelector(".cityName").style.textShadow = '2px 2px 10px #3d72b4'
            weatherImage.src = "weatherImages/drizzle.png"
            break;
        }
        case 'Mist': {
            document.body.style.backgroundImage = 'linear-gradient(#FFEFBA, #7AA1D2)';
            document.querySelector(".cityName").style.backgroundColor = '#7AA1D2'
            document.querySelector(".cityName").style.textShadow = '2px 2px 10px #FFEFBA'
            weatherImage.src = "weatherImages/mist.png"
            break;
        }
        case 'Snow': {
            document.body.style.backgroundImage = 'linear-gradient(#FFFFFF, #6DD5FA, #2980B9)';
            document.querySelector(".cityName").style.backgroundColor = '#6DD5FA'
            document.querySelector(".cityName").style.textShadow = '2px 2px 10px #FFFFFF'
            weatherImage.src = "weatherImages/snow.png"
            break;
        }
   }
}

async function Forecast() {
    const cityForecast = searchBox.value
    let responseForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityForecast}&cnt=7&appid=${apiKey}&units=metric`);
    let dataForecast = await responseForecast.json();
        console.log(dataForecast)


    for (let i = 0; i < 8; i++) {
        let value = dataForecast.list[i].dt;
        let timezoneOffset = dataForecast.city.timezone //in seconds

        let date = new Date((value + timezoneOffset) * 1000);
        console.log(date)
        let dateFormat = date.getDate() + `/` + date.getMonth();
        let hours = date.getHours() + 'h';
        let forecastTemperature = Math.round(dataForecast.list[i].main.temp)

        document.querySelector(`#hour${i}Title`).innerHTML = dateFormat + " " + hours;
        document.querySelector(`#hour${i}Value`).innerHTML = forecastTemperature + "°C";
        
        switch (dataForecast.list[i].weather[0].main) {
            case 'Clear': {
                document.querySelector(`#forecastIcon${i}`).src = "weatherImages/clear.png"
                break;
            }
            case 'Clouds': {
                document.querySelector(`#forecastIcon${i}`).src = "weatherImages/clouds.png"
                break;
            }
            case 'Drizzle': {
                document.querySelector(`#forecastIcon${i}`).src = "weatherImages/drizzle.png"
                break;
            }
            case 'Mist': {
                document.querySelector(`#forecastIcon${i}`).src = "weatherImages/mist.png"
                break;
            }
            case 'Rain': {
                document.querySelector(`#forecastIcon${i}`).src = "weatherImages/rain.png"
                break;
            }
            case 'Snow': {
                document.querySelector(`#forecastIcon${i}`).src = "weatherImages/snow.png"
                break;
            }
        }
    }
}

searchBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter"){
        checkWeather(searchBox.value);
        Forecast(searchBox.value)
    }
})

searchButton.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    Forecast(searchBox.value)
})




