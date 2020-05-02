const weather = document.querySelector(".span_weather_js");

const COORDS = "coords";
const API_KEY = "c584d0de6a3d7a76fb95142a1c6b8cfb";

function getWeather(lat,lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    const place = json.name;
    const temperature = json.main.temp;
    weather.innerText = `${temperature} @ ${place}`;
  });
}

function saveCoords(coordsOBJ){
  localStorage.setItem(COORDS,JSON.stringify(coordsOBJ));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsOBJ = {
    latitude,
    longitude
  };
  saveCoords(coordsOBJ);
  getWeather(latitude,longitude);
}

function handleGeoError(){
  console.log("FUCK YOU!!");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude,parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
