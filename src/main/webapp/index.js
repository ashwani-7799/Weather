
    // Add floating clouds to background
    function createClouds() {
        const background = document.getElementById('backgroundAnimation');
        for (let i = 0; i < 10; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.style.top = `${Math.random() * 100}%`;
            cloud.style.width = `${Math.random() * 100 + 50}px`;
            cloud.style.height = `${Math.random() * 60 + 30}px`;
            cloud.style.animationDuration = `${Math.random() * 10 + 15}s`;
            cloud.style.opacity = Math.random() * 0.3;
            background.appendChild(cloud);
        }
    }

    // Update weather icon based on condition
    function updateWeatherIcon(weatherCode) {
        const iconElement = document.getElementById('weatherIcon');
        let iconClass = 'fas ';
        
        if (weatherCode >= 200 && weatherCode < 300) {
            iconClass += 'fa-bolt';
        } else if (weatherCode >= 300 && weatherCode < 500) {
            iconClass += 'fa-cloud-rain';
        } else if (weatherCode >= 500 && weatherCode < 600) {
            iconClass += 'fa-cloud-showers-heavy';
        } else if (weatherCode >= 600 && weatherCode < 700) {
            iconClass += 'fa-snowflake';
        } else if (weatherCode >= 700 && weatherCode < 800) {
            iconClass += 'fa-smog';
        } else if (weatherCode === 800) {
            iconClass += 'fa-sun';
        } else {
            iconClass += 'fa-cloud';
        }
        
        iconElement.className = iconClass;
    }

    // Modified getWeather function
    function getWeather() {
        const cityInput = document.getElementById('cityInput').value;
        const weatherInfo = document.getElementById('weatherInfo');
        const error = document.getElementById('error');
        
        if (!cityInput) {
            error.textContent = 'Please enter a city name';
            weatherInfo.style.display = 'none';
            return;
        }

        fetch(`WeatherServlet?city=${encodeURIComponent(cityInput)}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    error.textContent = data.error;
                    weatherInfo.style.display = 'none';
                    return;
                }

                error.textContent = '';
                weatherInfo.style.display = 'block';
                weatherInfo.classList.add('show');
                
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
                document.getElementById('description').textContent = data.weather[0].description;
                document.getElementById('humidity').textContent = `${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
                
                updateWeatherIcon(data.weather[0].id);
            })
            .catch(err => {
                error.textContent = 'Error fetching weather data';
                weatherInfo.style.display = 'none';
            });
    }

    // Initialize clouds on load
    window.onload = createClouds;
