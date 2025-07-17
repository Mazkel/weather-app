document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('#city-input');
    const switcher = document.querySelector('.switcher');
    const searchBtn = document.querySelector('#search-btn');
    const weatherDiv = document.querySelector('#weather-result');
    const useLiveToggle = document.querySelector('#live-toggle');
    const mockWeather = document.querySelector('#mock-weather')

    const apiKey = 'a2ad7a5fb4efcbb8bd83381b0f2806a3';

    searchBtn.addEventListener('click', () => {
        const city = input.value.trim();
        if (!city) return;
        
        if (useLiveToggle.checked) {
            fetchWeather(city);
        } else {
            fetchMockWeather(city);
        }
    });

      function fetchWeather(city) {
        weatherDiv.innerHTML = '';

        fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
            .then(res => res.json())
            .then(data => {
                if (data.success === false || !data.location) {
                    weatherDiv.innerHTML = `<p>Error: ${data.error?.info || "Unable to fetch weather."}</p>`;
                    return;
                }
                weatherDiv.innerHTML = `
                    <h2>${data.location.name}, ${data.location.country}</h2>
                    <p>Temperature: ${data.current.temperature}°C</p>
                    <p>Wind Speed: ${data.current.wind_speed} km/h</p>
                    <p>Condition: ${data.current.weather_descriptions[0]}</p>
                    <img src="${data.current.weather_icons[0]}" alt="Weather Icon">
                `;
            })
            .catch(error => {
                weatherDiv.innerHTML = `<p>Error fetching weather data.</p>`;
                console.error(error);
            });
        }

        mockWeather.addEventListener('click', () => {
            fetch('http://localhost:3000/weather/')
            .then(res => res.json())
            .then(data => {
                let html = '';
                data.forEach(weather => {
                    html += `
                        <h2>${weather.city}, ${weather.country}</h2>
                        <p>Temperature: ${weather.temperature}°C</p>
                        <p>Wind Speed: ${weather.wind_speed} km/h</p>
                        <p>Condition: ${weather.weather_description}</p>
                        <p>${weather.icon}</p>
                        `;                    
                });
                weatherDiv.innerHTML = html
            })
            .catch(error => {
                weatherDiv.innerHTML = "Error Loading Mock Data";
                console.error(error);
            });
        })

        switcher.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');                         
        });
             
});


