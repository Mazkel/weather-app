document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('#city-input');
    const switcher = document.querySelector('.switcher');
    const searchBtn = document.querySelector('#search-btn');
    const weatherDiv = document.querySelector('#weather-result');
    const useLiveToggle = document.querySelector('#live-toggle');

    const apiKey = 'a2ad7a5fb4efcbb8bd83381b0f2806a3';

    searchBtn.addEventListener('click', () => {
        const city = input.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });


});