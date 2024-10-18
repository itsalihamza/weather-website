
# WeatherX Dashboard

## Overview

WeatherX Dashboard is a fully responsive weather application that allows users to search for weather data by city. It provides detailed current weather information such as temperature, humidity, wind speed, and a weather description, as well as a 5-day forecast. Users can view various weather visualizations, including bar charts, doughnut charts, and line charts. Additionally, the dashboard features a profile section, sorting and filtering of weather data, pagination, and a chatbot for user interaction.

The application is built using HTML, CSS (Tailwind CSS), JavaScript, the OpenWeather API for fetching real-time weather data, Chart.js for data visualization, and integrates a chatbot powered by the Google Gemini API.

## Features

- **Current Weather Data**: Displays current weather conditions such as temperature, humidity, wind speed, and weather description for any searched city.
- **5-Day Forecast**: Provides a detailed 5-day weather forecast, including high and low temperatures, weather conditions, and more.
- **Charts**:
  - **Bar Chart**: Shows daily temperature trends over the forecast period.
  - **Doughnut Chart**: Displays weather condition distribution (e.g., sunny, cloudy, rainy).
  - **Line Chart**: Plots temperature trends over time.
- **Sorting & Filtering**: Users can sort the weather forecast by temperature (ascending or descending) or filter the data to show specific conditions like the hottest day or rainy days.
- **Pagination**: Allows users to browse the weather data in 3-hour intervals.
- **Chatbot Integration**: The **WeatherBot** responds to user messages, giving weather information or answering general queries using the Google Gemini API.
- **Profile Section**: A popup shows user details when clicking the profile icon.
- **Responsive Design**: The dashboard is fully optimized for both mobile and desktop devices, with a collapsible sidebar navigation for easy use on small screens.

## Technologies Used

- **HTML5**: For structuring the webpage.
- **Tailwind CSS**: For styling, layout, and responsive design.
- **JavaScript (ES6)**: For fetching weather data, rendering charts, and handling user interactions.
- **OpenWeather API**: For fetching real-time weather data.
- **Chart.js**: For rendering various types of charts (bar, doughnut, and line charts).
- **Google Gemini API**: For chatbot functionality, allowing interaction and responses.
- **Responsive Design**: Optimized for mobile and desktop views using Tailwind CSS media queries.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/weather-dashboard.git
    ```

2. Navigate into the project directory:
    ```bash
    cd weather-dashboard
    ```

3. Add your API keys:
   - **OpenWeather API**: Add your OpenWeather API key in the `dashboard.js` file by replacing the placeholder `API_KEY` with your actual key:
     ```javascript
     const API_KEY = 'your-openweather-api-key';
     ```

   - **Google Gemini API**: Add your Gemini API key in `dashboard.js` for chatbot functionality:
     ```javascript
     const geminiApiKey = 'your-google-gemini-api-key';
     ```

4. Open the `index.html` file in your browser to start the application.

## Usage

1. **Search for Weather**:
   - Enter a city name in the search bar.
   - Click the "Get Weather" button or press Enter to fetch weather data.

2. **View Weather Data**:
   - The current weather for the searched city will be displayed, showing temperature, humidity, wind speed, and weather description.

3. **View Forecast and Charts**:
   - Below the weather widget, view various charts representing forecast data:
     - **Bar Chart** for daily temperatures.
     - **Doughnut Chart** for weather condition distribution.
     - **Line Chart** for temperature trends.

4. **Sort and Filter Weather Data**:
   - Use buttons to sort temperatures (ascending or descending) or filter specific conditions (like rainy days or hottest day).

5. **Chat with WeatherBot**:
   - Type a message in the chatbot to get weather data or ask general queries, and WeatherBot will respond.

6. **Profile Popup**:
   - On desktop, click the profile icon to view user information. The popup closes when you click outside of it.

## Project Structure

```bash
├── index.html        # Main dashboard with weather search and chatbot
├── tables.html       # Weather table with sorting and filtering
├── dashboard.js      # Handles weather data fetching, charts.
├── table.js         # Handles weather data fetching, sorting, and chatbot
├── README.md         # Project overview
└── assets/
    └── icon.png      # Weather app icon
    └── User.jpg      # Placeholder user profile image
```

## Example API Calls:

- **Current Weather**: 
  ```bash
  https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY}&units=metric
  ```

- **5-Day Forecast**:
  ```bash
  https://api.openweathermap.org/data/2.5/forecast?q={city_name}&appid={API_KEY}&units=metric
  ```

## Future Enhancements

- **Additional Charts**: Extend weather data visualization with more types of charts, such as radar charts.
- **Localization**: Add support for multiple languages to make the app accessible worldwide.
- **Extended Forecast**: Display more detailed forecast data, such as wind speed, UV index, and humidity trends.
- **Weather Alerts**: Add push notifications for extreme weather conditions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
