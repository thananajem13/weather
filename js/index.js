
async function getWeatherApi(cityName) {
    let apiWeatherLink = `https://api.weatherapi.com/v1/forecast.json?key=a06d5f0503d8429ab1173137221406&q=${cityName}&days=3`;
    console.log(apiWeatherLink)
    let response = await fetch(apiWeatherLink);
    let finalRes = await response.json();
    let statusResponse = response.status;
    if(statusResponse!=200){
        document.querySelector('.forecast2').innerHTML = '<div class="alert alert-danger text-center" role="alert">No data Exist</div>'
    }
    else{
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let todayDate = new Date(finalRes.forecast.forecastday[0].date);
        let todayName = days[todayDate.getDay()];
        let tommorrowDate = new Date(finalRes.forecast.forecastday[1].date);
        let tommorrowName = days[tommorrowDate.getDay()];
        let afterTommorrowDate = new Date(finalRes.forecast.forecastday[2].date);
        let afterTommorrowName = days[afterTommorrowDate.getDay()];
        let shortMonth = todayDate.toLocaleString('en-GB', { day: "numeric", month: 'long' });
        let str = `<div class="container">
    <div class="row forecast-row">
      <div class="col-md-4 ps-0 pe-0">
        <div class="card border-0">
          <div class="card-header ch1">
            <div class="dateDetails d-flex justify-content-between">
              <p class="day d-inline-block">${todayName}</p>
              <p class="date d-inline-block">${shortMonth}</p>
            </div>
          </div>
          <div class="card-body cb1 text-start">
            <h5 class="card-title cityName">${finalRes.location.name}</h5>
            <div class="degree text-white">
              <p class="degree-num d-inline-block">${finalRes.current.temp_c} ْC </p>
              <img class="degree-img d-inline-block" src="${finalRes.current.condition.icon}">
            </div>
     
            <div class="otherDetails">
              <span>
                <img src="images/icon-umberella.png" alt="">
                ${finalRes.current.humidity}%
              </span>
              <span>
                <img src="images/icon-wind.png" alt="">
                ${finalRes.current.wind_kph} km/h
              </span>
              <span>
                <img src="images/compass.png" alt="">
                ${finalRes.current.wind_dir}
              </span>
            </div>
    
          </div>
        </div>
      </div>
      <div class="col-md-4 ps-0 pe-0">
        <div class="card border-0">
          <div class="card-header ch2">
            <div class="dateDetails">
              <p class="tommorow text-center">${tommorrowName}</p>
            </div>
          </div>
          <div class="card-body cb2 forecast-content text-center">
            <img src="${finalRes.forecast.forecastday[1].day.condition.icon}" class="forecast-icon" alt="">
            <h5 class="card-title text-white tommorowDayTemp">${finalRes.forecast.forecastday[1].day.maxtemp_c} ْC</h5>
            <p class="card-text tommorowNightTemp text-white">${finalRes.forecast.forecastday[1].day.mintemp_c} ْ</p> 
            <p class="cloudy">${finalRes.forecast.forecastday[0].day.condition.text}</p>
          </div>
        </div>
      </div> 
      <div class="col-md-4 ps-0 pe-0">
        <div class="card border-0 h-100">
          <div class="card-header ch3">
            <div class="dateDetails">
              <p class="afterTommorw text-center">${afterTommorrowName}</p>
            </div>
          </div>
          <div class="card-body cb3 forecast-content text-center">
            <img src="${finalRes.forecast.forecastday[2].day.condition.icon}" class="forecast-icon" alt="">
            <h5 class="card-title text-white tommorowDayTemp">${finalRes.forecast.forecastday[1].day.maxtemp_c} ْC</h5>
            <p class="card-text tommorowNightTemp text-white">${finalRes.forecast.forecastday[1].day.mintemp_c} ْ</p> 
            <p class="cloudy">${finalRes.forecast.forecastday[1].day.condition.text}</p>
          </div>
        </div>
      </div> 
    </div>
    </div>`;
        console.log(document.querySelector('.forecast2'))
        document.querySelector('.forecast2').innerHTML = str;
        
    }
     
}

let searchData = document.getElementById('search');

let submit = document.getElementById('submit'); 
submit.addEventListener('click', function () {
    let searchVal = searchData.value;
    validateCityName(searchVal)
})
function validateCityName(cityName) {
    let cityNameRE = /^[a-zA-Z]+((?:[\s-])[a-zA-Z]+)*$/;
    if (cityName.length != 0) {
        if (cityNameRE.test(cityName)) {
            getWeatherApi(cityName)
        }
        else {
            alert('please enter correct city name')
        }
    }
    else {
        alert('search filed required')
    }
}



// let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// let d = new Date();
// let dayName = days[d.getDay()];
// let tommorrowName = days[d.getDay()+1];
// let afterTommorowName = days[d.getDay()+2];
// let shortMonth = d.toLocaleString('en-GB', { day:"numeric",month: 'long' });
// document.querySelector('.day').innerHTML = dayName;
// document.querySelector('.date').innerHTML = shortMonth;
// console.log(dayName)
// document.querySelector('.tommorow').innerHTML = tommorrowName;
// document.querySelector('.afterTommorw').innerHTML = afterTommorowName;
