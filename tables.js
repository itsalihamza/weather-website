// API keys
const openWeatherApiKey = 'b040fe1caf8668e6f81d888294c45441';
const geminiApiKey = 'AIzaSyBwql1EiApl9uF-fvbJDvbXLg9mK93D3Vk';

// Weather Data and Pagination
let weatherData = [];
let filteredData = [];
let currentPage = 1;
const entriesPerPage = 8; // Show 8 entries per page (for 8 intervals of 3 hours)

// Fetch weather data for a specific city
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${openWeatherApiKey}`)
        .then(response => response.json())
        .then(data => {
            weatherData = processWeatherData(data.list);
            filteredData = [...weatherData]; // Clone the data for filtering
            currentPage = 1; // Reset pagination
            displayWeatherTable();
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

// Process weather data (keeping 3-hour intervals but grouping by day)
function processWeatherData(dataList) {
    const result = dataList.map(item => ({
        date: new Date(item.dt_txt).toLocaleDateString(),
        time: new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Get time
        temp: item.main.temp,
        condition: item.weather[0].description
    }));
    return result;
}

// Display weather data in table with pagination (8 entries per page)
function displayWeatherTable() {
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const tableBody = document.getElementById('weather-table-body');
    tableBody.innerHTML = '';

    filteredData.slice(start, end).forEach(entry => {
        const row = `<tr>
                        <td class="border px-4 py-2">${entry.date}</td>
                        <td class="border px-4 py-2">${entry.time}</td>
                        <td class="border px-4 py-2">${entry.temp}°C</td>
                        <td class="border px-4 py-2">${entry.condition}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    });
}

// Sorting by Temperature (Ascending)
document.getElementById('sort-asc-btn').addEventListener('click', () => {
    filteredData.sort((a, b) => a.temp - b.temp);
    currentPage = 1; // Reset to first page
    displayWeatherTable();
});

// Sorting by Temperature (Descending)
document.getElementById('sort-desc-btn').addEventListener('click', () => {
    filteredData.sort((a, b) => b.temp - a.temp);
    currentPage = 1; // Reset to first page
    displayWeatherTable();
});

// Filtering Days with Rain
document.getElementById('filter-rain-btn').addEventListener('click', () => {
    filteredData = weatherData.filter(entry => entry.condition.toLowerCase().includes('rain'));
    currentPage = 1; // Reset to first page
    displayWeatherTable();
});

// Show Day with Highest Temperature
document.getElementById('max-temp-btn').addEventListener('click', () => {
    const hottestDay = weatherData.reduce((max, entry) => (entry.temp > max.temp ? entry : max), weatherData[0]);
    filteredData = [hottestDay];
    currentPage = 1; // Reset to first page
    displayWeatherTable();
});

// Pagination buttons
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayWeatherTable();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < Math.ceil(filteredData.length / entriesPerPage)) {
        currentPage++;
        displayWeatherTable();
    }
});

// Chatbot Interaction (unchanged from your previous code)
document.getElementById('chat-send-btn').addEventListener('click', () => {
    const message = document.getElementById('chat-input').value;
    document.getElementById('chat-input').value = '';

    // Add user message to chat
    const chatOutput = document.getElementById('chat-output');
    chatOutput.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

    // Detect if the message is weather-related
    if (message.toLowerCase().includes('weather')) {
        // Respond with weather data
        if (weatherData.length > 0) {
            const latestWeather = weatherData[0];
            chatOutput.innerHTML += `<p><strong>WeatherBot:</strong> The latest weather is ${latestWeather.temp}°C with ${latestWeather.condition}.</p>`;
        } else {
            chatOutput.innerHTML += `<p><strong>WeatherBot:</strong> Please search for a city first.</p>`;
        }
    } else {
        // Send query to Gemini API for non-weather-related queries
        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        })
        .then(response => response.json())
        .then(data => {
            const geminiResponse = data.candidates[0].content.parts[0].text;
            chatOutput.innerHTML += `<p><strong>WeatherBot:</strong> ${geminiResponse}</p>`;
        })
        .catch(error => console.error('Error with Gemini API:', error));
    }

    // Scroll chat output to the bottom
    chatOutput.scrollTop = chatOutput.scrollHeight;
});

const profileToggleBtn = document.getElementById('profile-toggle-btn');
const profilePopup = document.getElementById('profile-popup');

// Toggle profile popup visibility
profileToggleBtn.addEventListener('click', () => {
    profilePopup.classList.toggle('show');
});

// Close popup when clicking outside
window.addEventListener('click', (event) => {
    if (!profileToggleBtn.contains(event.target) && !profilePopup.contains(event.target)) {
        profilePopup.classList.remove('show');
    }
});