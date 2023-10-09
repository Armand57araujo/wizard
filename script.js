const API_KEY = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=5968b859cc10d7e72cd116fba774bb27';
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const searchHistory = document.getElementById('searchHistory');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeather(city);
        addToSearchHistory(city);
    }
    cityInput.value = '';
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const { name, main, wind, weather } = data;
            const temperature = main.temp;
            const humidity = main.humidity;
            const windSpeed = wind.speed;
            const icon = weather[0].icon;
            const description = weather[0].description;

            weatherInfo.innerHTML = `
<h2>${name}</h2>
<p>Date: ${new Date().toLocaleDateString()}</p>
<p>Weather: ${description}</p>
<p>Temperature: ${temperature}°C</p>
<p>Humidity: ${humidity}%</p>
<p>Wind Speed: ${windSpeed} m/s</p>
<img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
`;
        })
        .catch(error => console.error('Error:', error));
}

function addToSearchHistory(city) {
    const historyItem = document.createElement('a');
    historyItem.href = '#';
    historyItem.textContent = city;
    historyItem.addEventListener('click', () => getWeather(city));
    searchHistory.appendChild(historyItem);
}