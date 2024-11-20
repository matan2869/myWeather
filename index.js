const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherError = document.querySelector('.weather-error');
const weatherDetails = document.querySelector('.weather-details');
const countrySpace = document.querySelector('.country-space');

search.addEventListener('click', () => {
    const myURL = '34f4903aa414d87425ca66afa2dc3f77';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myURL}`)
        .then(response => response.json()).then(json => {
        console.log(json);
        if (json.cod !== 200) {
            weatherBox.style.display = 'none';
            container.style.height = '250px';
            countrySpace.style.display = 'none';
            weatherDetails.style.display = 'none';
            weatherError.style.display = 'block';
            weatherError.classList.add('fade-in');
            weatherError.innerHTML = "<span>Oops!Try Again!</span>"
            return;
        }

        weatherError.style.display = 'none'

        function updateBackgroundWeather(weatherCondition) {
            let gradientBackground;
        
            // אם מזג האוויר חמים (שמש), צבעים חמים כמו אדום וכתום
            if (weatherCondition.includes("clear")) {
                gradientBackground = "linear-gradient(to right, #ff7e5f, #feb47b)";
            } 
            // אם יש גשם או טפטוף, צבעים קרים כמו כחול
            else if (weatherCondition.includes("rain") || weatherCondition.includes("drizzle")) {
                gradientBackground = "linear-gradient(to right, #00c6ff, #0072ff)";
            }
            // אם יש עננים, צבעים כמו כחול בהיר
            else if (weatherCondition.includes("cloud")) {
                gradientBackground = "linear-gradient(to right, #4facfe, #00f2fe)";
            }
            // אם יש שלג, צבעים בהירים כמו תכלת ואפור
            else if (weatherCondition.includes("snow")) {
                gradientBackground = "linear-gradient(to right, #00c6ff, #e6e6e6)";
            } 
            // ברירת מחדל אם לא נמצא מצב מזג האוויר מוכר
            else {
                gradientBackground = "linear-gradient(to right, #4facfe, #00f2fe)";
            }
        
            // עדכון הרקע של הדף
            document.body.style.background = gradientBackground;
        }

        const img = document.querySelector('.weather-box img');
        const wind = document.querySelector('.weather-details .wind span');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const country = document.querySelector('.country-space .country');
        const temp_min = document.querySelector('.t-min');
        const temp_max = document.querySelector('.t-max');

        img.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@4x.png`

        humidity.textContent = `${json.main.humidity}%`;
        wind.textContent = `${json.wind.speed} Km/h`;
        description.textContent = json.weather[0].description;
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>C°</span>`;
        country.innerHTML = `<span><b>Country :</b></span>${json.sys.country}`
        temp_min.innerHTML = `<span><b>min :</b> </span>${json.main.temp_min}°`;
        temp_max.innerHTML = `<span><b>max : </b></span>${json.main.temp_max}°`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn')
        container.style.height = '500px';

    })
});