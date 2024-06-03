const apiKey = '80c316bd8d2187ed757797614d616bf1';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

//preparing variables of html id
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const icon = document.getElementById('icon');

let weatherChart;
//get data from local storage
let cities = JSON.parse(localStorage.getItem('cities')) || [];
let temperatures = JSON.parse(localStorage.getItem('temperatures')) || [];

//create chart when the page is refresh
window.onload = () => {
    if(cities.length > 0) {
        createCharts();
    }
}
//get value input when searching button click
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

//display dara weather on page
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            const { icon } = data.weather[0];
            icon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            descriptionElement.textContent = data.weather[0].description;
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + data.name + "')"

            updateChart(data.name, Math.round(data.main.temp))
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}




/**
 *?? chart weather app 
 **/
 const ctx = document.getElementById('myChart');
function updateChart(city, temperature){
    if (cities.length >= 10) {
        cities.shift();
        temperatures.shift();
    }

    cities.push(city);
    temperatures.push(temperature);

    localStorage.setItem('cities', JSON.stringify(cities));
    localStorage.setItem('temperatures', JSON.stringify(temperatures));

    if(!weatherChart){
        createCharts();
    }else{
        weatherChart.data.labels = cities;
        weatherChart.data.datasets[0].data = temperatures;
        weatherChart.update();
    }
}

//creating chart
function createCharts() {
    
    weatherChart =  new Chart(ctx, 
        {
       type: 'bar',
       data: {
         labels: cities,
         datasets: [{
           label: 'Temperature (°C)',
           data: temperatures,
           backgroundColor: 'rgba(27, 192, 192, 0.7)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
         }]
       },
       options: {
         scales: {
           y: {
             beginAtZero: true
           }
         }
       }
     });
}
 


