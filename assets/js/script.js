// select the form and input element
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

// select the elements that will display weather data
const cityName = document.querySelector('#city-name');
const date = document.querySelector('#date');
const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const weatherIcon = document.querySelector('#weather-icon');


// select the element that will display the 5-day forecast
const forecastContainer = document.querySelector('#forecast-container');

// select the element that will display search history
const historyList = document.querySelector('#history-list');

// define the API endpoint and API key
const endpoint = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'bfc55248141e933e27bdb8ff269870d8';

// handle form submission
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // get the user input from the search input
  const city = searchInput.value;
  
  // build the API URL
  const url = `${endpoint}weather?q=${city}&units=imperial&appid=${apiKey}`;
  
  // make a GET request to the API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // update the weather data display
      cityName.textContent = data.name;
      date.textContent = new Date().toLocaleDateString();
      temperature.textContent = `${data.main.temp} °F`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;
      weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`;
      
      // add the city to search history
      const li = document.createElement('li');
      li.textContent = data.name;
      historyList.appendChild(li);
      
      // get the city ID for the 5-day forecast
      const cityId = data.id;
      
      // build the API URL for the 5-day forecast
      const forecastUrl = `${endpoint}forecast?id=${cityId}&units=imperial&appid=${apiKey}`;
      
      // make a GET request to the API for the 5-day forecast
      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          // display the 5-day forecast
          forecastContainer.innerHTML = '';
          for (let i = 0; i < data.list.length; i += 8) {
            const forecast = data.list[i];
            const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
            const forecastTemp = `${forecast.main.temp_min} - ${forecast.main.temp_max} °F`;
            const forecastIcon = `<img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">`;
            const forecastCard = `
              <div class="forecast-card">
                <h3>${forecastDate}</h3>
                ${forecastIcon}
                <p>${forecastTemp}</p>
              </div>
            `;
            forecastContainer.innerHTML += forecastCard;
          }
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
});


// add event listener to search history list items
historyList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const city = event.target.textContent;
    const url = `${endpoint}weather?q=${city}&units=imperial&appid=${apiKey}`;
    
    // make a GET request to the API for the current weather
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // update the weather data display
        cityName.textContent = data.name;
        date.textContent = new Date().toLocaleDateString();
        temperature.textContent = `${data.main.temp} °F`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;
        weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`;
        
        // get the city ID for the 5-day forecast
        const cityId = data.id;
        
        // build the API URL for the 5-day forecast
        const forecastUrl = `${endpoint}forecast?id=${cityId}&units=imperial&appid=${apiKey}`;
        
        // make a GET request to the API for the 5-day forecast
        fetch(forecastUrl)
          .then(response => response.json())
          .then(data => {
            // display the 5-day forecast
            forecastContainer.innerHTML = '';
            for (let i = 0; i < data.list.length; i += 8) {
              const forecast = data.list[i];
              const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
              const forecastTemp = `${forecast.main.temp_min} - ${forecast.main.temp_max} °F`;
              const forecastIcon = `<img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">`;
              const forecastCard = `
                <div class="forecast-card">
                  <h3>${forecastDate}</h3>
                  ${forecastIcon}
                  <p>${forecastTemp}</p>
                </div>
              `;
              forecastContainer.innerHTML += forecastCard;
            }
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }
});
