const apiKeys = '80c316bd8d2187ed757797614d616bf1'; //API key
const city1 = 'mogadishu';
const city2 = 'bosaso';
const city3 = 'girible';
const city4 = 'hargeysa';
const city5 = 'garowe';
const city6 = 'barbara';
const days = 5; // Number of days


const getWeatherForecast = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKeys}&units=metric`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // `false` makes the request synchronous
    xhr.send(null);

    if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const forecast = response.list.filter((_, index) => index % 8 === 0).slice(0, days);
        const temperatures = forecast.map(item => item.main.temp);
        const dates = forecast.map(item => new Date(item.dt * 1000).toLocaleDateString());
        return { temperatures, dates };
    } else {
        console.error('Error fetching weather data:', xhr.statusText);
        return null;
    }
};

//creatuing chart
const createChart = (ctx, city, temperatures, dates) => {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `Temperature in ${city} (°C)`,
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
};
//displaying data on chart
const renderCharts = () => {
    const forecastCity1 = getWeatherForecast(city1);
    const forecastCity2 = getWeatherForecast(city2);
    const forecastCity3 = getWeatherForecast(city3);
    const forecastCity4 = getWeatherForecast(city4);
    const forecastCity5 = getWeatherForecast(city5);
    const forecastCity6 = getWeatherForecast(city6);

    if (forecastCity1) {
        const ctx1 = document.getElementById('chartCity1').getContext('2d');
        createChart(ctx1, city1, forecastCity1.temperatures, forecastCity1.dates);
    } else {
        document.getElementById('chartCity1').innerText = 'Could not fetch weather data';
    }

    if (forecastCity2) {
        const ctx2 = document.getElementById('chartCity2').getContext('2d');
        createChart(ctx2, city2, forecastCity2.temperatures, forecastCity2.dates);
    } else {
        document.getElementById('chartCity2').innerText = 'Could not fetch weather data';
    }

    if (forecastCity3) {
        const ctx3 = document.getElementById('chartCity3').getContext('2d');
        createChart(ctx3, city3, forecastCity3.temperatures, forecastCity3.dates);
    } else {
        document.getElementById('chartCity3').innerText = 'Could not fetch weather data';
    }

    if (forecastCity4) {
        const ctx4 = document.getElementById('chartCity4').getContext('2d');
        createChart(ctx4, city4, forecastCity4.temperatures, forecastCity4.dates);
    } else {
        document.getElementById('chartCity4').innerText = 'Could not fetch weather data';
    }

    if (forecastCity5) {
        const ctx5 = document.getElementById('chartCity5').getContext('2d');
        createChart(ctx5, city5, forecastCity5.temperatures, forecastCity5.dates);
    } else {
        document.getElementById('chartCity5').innerText = 'Could not fetch weather data';
    }

    if (forecastCity6) {
        const ctx6 = document.getElementById('chartCity6').getContext('2d');
        createChart(ctx6, city6, forecastCity6.temperatures, forecastCity6.dates);
    } else {
        document.getElementById('chartCity6').innerText = 'Could not fetch weather data';
    }
};

renderCharts();