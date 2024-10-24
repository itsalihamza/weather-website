const API_KEY = 'b040fe1caf8668e6f81d888294c45441';

// Trigger search on button click or "Enter" key press
document.getElementById('search-btn').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherData(city);
        getWeatherForecast(city);
    }
});

document.getElementById('city-input').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        const city = e.target.value;
        if (city) {
            getWeatherData(city);
            getWeatherForecast(city);
        }
    }
});

// Get the user's location at the start
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherDataByCoords(lat, lon); // Fetch weather using coordinates
            getWeatherForecastByCoords(lat, lon); // Fetch forecast using coordinates
        }, (error) => {
            console.error('Geolocation error:', error);
            alert('Could not get your location. Please enter a city manually.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
};

// Fetch weather by coordinates (latitude and longitude)
function getWeatherDataByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Fetch weather forecast by coordinates
function getWeatherForecastByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherForecastCharts(data);
        })
        .catch(error => console.error('Error fetching forecast data:', error));
}

// Fetch weather data by city name
function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => alert('Error fetching weather data!'));
}

// Fetch weather forecast by city name
function getWeatherForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherForecastCharts(data);
        })
        .catch(error => alert('Error fetching forecast data!'));
}

// Update weather information on the page
function updateWeatherInfo(data) {
    const weatherWidget = document.getElementById('weather-widget');
    const weatherInfo = document.getElementById('weather-info');

    // Extract data from API response
    const cityName = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

    // Update weather info text
    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Description: ${weatherDescription}</p>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}">
    `;

    // Change background using Tailwind CSS gradients
    changeBackground(data.weather[0].main, weatherWidget);
}

// Update forecast charts on the page
function updateWeatherForecastCharts(data) {
    const temps = [];
    const labels = [];
    const weatherConditions = {};

    data.list.forEach(item => {
        temps.push(item.main.temp);
        labels.push(item.dt_txt.split(' ')[0]); 

        const condition = item.weather[0].main;
        weatherConditions[condition] = (weatherConditions[condition] || 0) + 1;
    });

    // Create Vertical Bar Chart
    createBarChart(labels, temps);

    // Create Doughnut Chart
    createDoughnutChart(weatherConditions);

    // Create Line Chart
    createLineChart(labels, temps);
}

// Change background based on weather condition
function changeBackground(weatherMain, widgetElement) {
    // Remove existing gradient classes
    widgetElement.classList.remove('bg-gradient-to-r', 'from-gray-800', 'to-indigo-500', 'from-gray-500', 'to-gray-900', 'from-yellow-400', 'to-orange-500', 'from-purple-500', 'to-yellow-500', 'from-teal-500', 'to-cyan-500', 'from-white', 'to-gray-300');

    // Apply background gradient based on weather condition
    switch (weatherMain) {
        case 'Clear':
            widgetElement.classList.add('bg-gradient-to-r', 'from-yellow-400', 'to-orange-500'); // sunny
            break;
        case 'Clouds':
            widgetElement.classList.add('bg-gradient-to-r', 'from-gray-500', 'to-gray-900'); // cloudy
            break;
        case 'Rain':
        case 'Drizzle':
            widgetElement.classList.add('bg-gradient-to-r', 'from-gray-800', 'to-indigo-500'); // rainy
            break;
        case 'Thunderstorm':
            widgetElement.classList.add('bg-gradient-to-r', 'from-purple-500', 'to-yellow-500'); // thunderstorm
            break;
        case 'Snow':
            widgetElement.classList.add('bg-gradient-to-r', 'from-white', 'to-gray-300'); // snowy
            break;
        case 'Mist':
        case 'Fog':
            widgetElement.classList.add('bg-gradient-to-r', 'from-teal-500', 'to-cyan-500'); // mist/fog
            break;
        default:
            widgetElement.classList.add('bg-gradient-to-r', 'from-gray-300', 'to-gray-600'); // default gradient
            break;
    }
}

let barChartInstance, doughnutChartInstance, lineChartInstance; // Variables to hold chart instances

// Chart.js functions for different charts (Bar, Doughnut, Line)
function createBarChart(labels, data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    // Destroy the existing chart instance if it exists
    if (barChartInstance) {
        barChartInstance.destroy();
    }

    // Create new chart instance
    barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 1000, // Chart transition duration
                easing: 'easeInOutCubic'
            }
        }
    });
}

function createDoughnutChart(data) {
    const ctx = document.getElementById('doughnutChart').getContext('2d');
    
    // Destroy the existing chart instance if it exists
    if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
    }

    // Create new chart instance
    doughnutChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Weather Conditions',
                data: Object.values(data),
                backgroundColor: ['rgba(255, 165, 0, 0.6)','rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)','rgba(255, 165, 0, 0.6)']
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 1000, // Chart transition duration
                easing: 'easeInOutCubic'
            }
        }
    });
}

function createLineChart(labels, data) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    
    // Destroy the existing chart instance if it exists
    if (lineChartInstance) {
        lineChartInstance.destroy();
    }

    // Create new chart instance
    lineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                lineTension: 0.1
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 1000, // Chart transition duration
                easing: 'easeInOutCubic'
            }
        }
    });
}

// Toggle profile popup visibility
const profileToggleBtn = document.getElementById('profile-toggle-btn');
const profilePopup = document.getElementById('profile-popup');

profileToggleBtn.addEventListener('click', () => {
    profilePopup.classList.toggle('show');
});

// Close popup when clicking outside
window.addEventListener('click', (event) => {
    if (!profileToggleBtn.contains(event.target) && !profilePopup.contains(event.target)) {
        profilePopup.classList.remove('show');
    }
});