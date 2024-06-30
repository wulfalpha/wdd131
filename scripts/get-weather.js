// Constants
const WEATHER_API_KEY = '5a0d88a901126cc81d618d978ab200cb';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${WEATHER_API_KEY}&units=metric`;

// Elements
const heroImageElement = document.getElementById('hero-image');
const temperatureElement = document.getElementById('temperature');
const conditionsElement = document.getElementById('conditions');
const windElement = document.getElementById('wind');
const windChillElement = document.getElementById('wind-chill');
const lastModifiedElement = document.getElementById('last-modified');

// Functions
const updateHeroImage = () => {
    const smallSrc = 'https://source.unsplash.com/random/400x300/?united-kingdom';
    const largeSrc = 'https://source.unsplash.com/random/800x600/?united-kingdom';
    const sources = heroImageElement.querySelectorAll('source');
    if (sources.length > 1) {
        sources[0].srcset = smallSrc;
        sources[1].srcset = largeSrc;
    }
    const img = heroImageElement.querySelector('img');
    if (img) {
        img.src = largeSrc;
    }
};

const updateWeatherData = async () => {
    try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();
        let weatherIco = document.getElementById('weather_ico');

        // Convert the weather description to a format matching our file names
        let description = data.weather[0].description.toLowerCase().replace(/ /g, '');

        // Correctly form the path to the SVG file in the 'images' folder
        // Ensure it correctly points to rainy, sunny, hail, windy, stormy, snow, or cloudy .svg files
        weatherIco.src = `images/${description}.svg`;

        temperatureElement.textContent = `<strong>Temperature:</strong> ${data.main.temp}°C`;
        conditionsElement.textContent = `<strong>Conditions:</strong> ${data.weather[0].description}`;
        windElement.textContent = `<strong>Wind:</strong> ${data.wind.speed} km/h`;
        windChillElement.textContent = `<strong>Wind Chill:</strong> ${data.main.feels_like}°C`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

const updateLastModifiedDate = () => {
    const now = new Date();
    lastModifiedElement.textContent = `Last Modification: ${now.toLocaleString()}`;
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateHeroImage();
    updateWeatherData();
    updateLastModifiedDate();
});
