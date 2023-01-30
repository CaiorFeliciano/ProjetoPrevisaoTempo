// Interação
const citySearchInput = document.getElementById('city-search-input');
const citySearchButton = document.getElementById('city-search-button');

// Exibição
const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentTemperature = document.getElementById('current-temperature');
const windSpeed = document.getElementById('wind-speed');
const feelsLikeTemperature = document.getElementById('feels-like-temperature');
const currentHumidity = document.getElementById('current-humidity');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

const api_key = "f85e9cc7c586a23319b78e63648df3f0";

// console.log(citySearchBar, citySearchButton, currentDate, cityName, weatherDescription, weatherIcon, currentTemperature, currentHumidity, windSpeed, feelsLikeTemperature, sunriseTime, sunsetTime)

//pegando o valor do input
citySearchButton.addEventListener("click", () => {

  let cityName = citySearchInput.value 
  getCityWeather(cityName)

});

//buscando localização do usuário
navigator.geolocation.getCurrentPosition(
  (position) => {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getCurrentLocationWeather(lat, lon);
}, 
  (err) => {
    if(err.code === 1) {
    alert('Geolocalização negada pelo usuário, busque manualmente por uma cidade através da barra de pesquisa.')
  } else {
    console.log(err)
}});

//buscando os dados da API
function getCurrentLocationWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`) 
  .then((response) => (response.json())) 
  .then((data) => displayWeather(data))
}


//buscando o valor armazenado no input e buscando na API
function getCityWeather(cityName) {

  weatherIcon.src = `./assets/loading-icon.svg`;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`) // fetch(buscar),buscando os dados da API
  .then((response) => (response.json())) //então(then), convertendo os dados da API
  .then((data) => displayWeather(data)) //então(then), executando uma nova função com as informações adquiriodas  
};

//exibição dentro do HTML
function displayWeather(data) {

  //desustruturação de objeto
  let {
    dt, 
    name,
    weather: [{icon, description}],
    main: {temp, feels_like, humidity},
    wind: {speed},
    sys: {sunrise, sunset}, 
   } = data;

   //substituição das informações
   currentDate.textContent = formatDate(dt);
   cityName.textContent = name;
   weatherDescription.textContent = description;
   currentTemperature.textContent = `${Math.round(temp)}°C`;
   feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
   windSpeed.textContent = `${Math.round(speed * 3.6)}km`;
   currentHumidity.textContent = `${humidity}%`;
   sunriseTime.textContent = formatTime(sunrise);
   sunsetTime.textContent = formatTime(sunset);
   weatherIcon.src = `./assets/${icon}.svg`;
};

//formatando as datas
function formatDate(epochTime) {
  let date = new Date(epochTime * 1000)
  let formattedDate = date.toLocaleDateString('pt-BR',{month:"long", day:'numeric'} )//transoforma a data na localização que você esta
  return `Hoje, ${formattedDate}`
}

//formatando horários 
function formatTime(epochTime) {
  let date = new Date(epochTime * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()

  return `${hours}:${minutes}`

}
