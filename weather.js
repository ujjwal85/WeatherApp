let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchinput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=150186d296f5e427a11990dba760f464&units=metric `
            console.log(lat, long);
            fetch(api).then((response) => {
                return response.json();
                // console.log(response.json());

            })
                .then(showWeather)

        })
    }
})
function showWeather(weather) {
    console.log(weather);
    tempvalue.innerHTML = `${weather.main.temp}`
    climate.innerHTML = weather.weather[0].main
    loc.innerHTML = weather.name
    if (weather.weather[0].main === "Clouds") {
        tempicon.innerHTML = `<img class="temp-icon" src="./icons/cloudy.png"/>`
    }
    else if (weather.weather[0].main === "Sunny" || weather.weather[0].main === "Clear") {
        tempicon.innerHTML = `<img class="temp-icon" src="./icons/sunny.png"/>`
    }
    else if (weather.weather[0].main === "Rain") {
        tempicon.innerHTML = `<img class="temp-icon" src="./icons/rainy-day.png"/>`
    }
    else if (weather.weather[0].main === "Winds") {
        tempicon.innerHTML = `<img class="temp-icon" src="./icons/windy.png"/>`
    }
    else if (weather.weather[0].main === "Mist" || weather.weather[0].main === "Haze" ) {
        tempicon.innerHTML = `<img class="temp-icon" src="./icons/mist.png"/>`
    }
}
searchButton.addEventListener("click",function searchWeather() {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${searchinput.value}&appid=150186d296f5e427a11990dba760f464&units=metric `
           // console.log(lat, long);
            fetch(api).then((response) => {
                return response.json();
                // console.log(response.json());

            })
            .then (showWeather)
            .catch(err=>{
                alert(" City Not Found")
            })
    //console.log(searchinput.value);
})
