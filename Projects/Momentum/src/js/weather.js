const API_KEY = "10251c0625a7588a95878bff57a021e6";
const COORDS = "coords";

const weather = document.querySelector(".js-weather"),
  weatherIcon = weather.querySelector(".weather__icon"),
  weatherTemperature = weather.querySelector(".weather__temperature"),
  weatherPlace = weather.querySelector(".weather__place");

/*
method.then(): 데이터가 완전히 들어온 다음 호출
*/
function GetWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json(); // network에 있는 response의 body 부분을 가져온다.
    })
    .then(function (json) {
      // once the json is ready..
      const iconUrl = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
      weatherIcon.src = iconUrl;
      const temperature = Math.round(parseFloat(json.main.temp));
      const place = json.name;
      weatherTemperature.innerText = `${temperature}°`;
      weatherPlace.innerText = place;
      //   weather.innerText = `${temperature} @ ${place}`;
    });
}

function SaveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  SaveCoords(coordsObj);
  GetWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can not access geo location.");
}

function AskForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function LoadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    AskForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    GetWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  LoadCoords();
}

init();
