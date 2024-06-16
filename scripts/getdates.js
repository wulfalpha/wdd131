const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');

document.addEventListener('DOMContentLoaded', () => {
    // Calculate visitors
    let visits = localStorage.getItem('visits') || 0;
    visits++;
    localStorage.setItem('visits', visits);
    // Display visits
    let visitElement = document.querySelector('.visits');
    if(visitElement){
        visitElement.textContent = `Number of visits: ${visits}`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const rightsSection = document.querySelector("#rights");
    const paragraphs = rightsSection.querySelectorAll("p");
    const now = new Date();
    const dateString = now.toLocaleString();
    paragraphs[1].textContent = `Date and Time: ${dateString}`;
    document.querySelector("[data-modified-date]").textContent = document.lastModified;

    let pTag = document.querySelector('.card p'); // More precise selection of p tag
    if(pTag && visits) {
        pTag.innerHTML = pTag.innerHTML.replace('[visits]', visits);
    }
});


async function getWeatherData() {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.377937&lon=-111.803055&appid=5a0d88a901126cc81d618d978ab200cb&units=imperial';

    const response = await fetch(url);
    const data = await response.json();

    displayResults(data);
}

function displayResults(data){
    // Kelvin to Celsius conversion
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('figcaption');

    currentTemp.textContent = temperature.toFixed(2);
    weatherIcon.src = iconUrl;
    captionDesc.textContent = description;
}

// Call function
getWeatherData();