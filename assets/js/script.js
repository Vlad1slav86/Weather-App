console.log("js is working");

//https://api.openweathermap.org/data/2.5/weather?appid=${bfc55248141e933e27bdb8ff269870d8}&q=${London}&units=imperial

//https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}

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


