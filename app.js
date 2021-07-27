const api = " "; // your api key here
const link = "https://api.openweathermap.org/data/2.5/"

//var
const searchBar = document.getElementById("searchbar");
let city = document.querySelector(".city");
let temprature = document.querySelector(".temprature");
let description = document.querySelector(".description");
let minMax = document.querySelector(".minMax");
let backgroundImage = document.querySelector(".backgroundImage");
let wind = document.querySelector('.wind');
let humudity = document.querySelector('.humudity');

//event listener
searchBar.addEventListener('keypress',cityInput);
document.addEventListener("DOMContentLoaded",loadPages);

//func

function loadPages(){
    cityChange("new york");
}

async function cityInput(e){
    if(e.keyCode == '13'){
        cityChange(searchBar.value);
        await changeBackground(searchBar.value);
    }
}

const cityChange = (city) => {
    let newCityLink = `${link}weather?q=${city}&appid=${api}&units=metric&lang=en`;
    fetch(newCityLink).then(weather => {
        return weather.json();
    }).then(changeWithResult);
}

const changeWithResult = async (jsonResult) => {
    if(jsonResult.message){
        city.innerText = 'City Not Found';
        temprature.innerText = `404`;
        description.innerText = " ";
        minMax.innerText  = "Please, enter a valid city.";
        wind.innerText = " ";
        humudity.innerText= " ";
    }else{
        city.innerText = `${jsonResult.name}, ${jsonResult.sys.country}`;
        temprature.innerText = `${Math.round(jsonResult.main.temp)}°C`;
        
        description.innerText = `${jsonResult.weather[0].description}`;
        minMax.innerText = `${Math.round(jsonResult.main.temp_min)}°C / ${Math.round(jsonResult.main.temp_max)}°C`;
        wind.innerText = `Wind Speed ${jsonResult.wind.speed}`;
        humudity.innerText = `Humidity ${jsonResult.main.humidity}`
    }
    
}
 
const changeBackground = (city) => {
    if(city === "new york"){
        backgroundImage.style.background = 'url(./image/1.jpg)';
    }else if( city === 'los angeles'){
        backgroundImage.style.background = 'url(./image/2.jpg)';
    }else{
        backgroundImage.style.background = 'url(./image/earth.jpg)';
    }
}



