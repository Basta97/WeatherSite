

const locationName = document.getElementById("locationName");
const tempDay1 = document.getElementById("temp-1");
const tempDay2 = document.getElementById("temp-2");
const tempDay3 = document.getElementById("temp-3");

const wsDay1 = document.getElementById("ws-day1");
const wsDay2 = document.getElementById("ws-day2");
const wsDay3 = document.getElementById("ws-day3");

const wdDay1 = document.getElementById("dir-1");
const wdDay2 = document.getElementById("dir-2");
const wdDay3 = document.getElementById("dir-3");

const icon1 = document.getElementById("icon-1");
const icon2 = document.getElementById("icon-2");
const icon3 = document.getElementById("icon-3");

const btnSearch = document.getElementById("button-search");

const searchField = document.getElementById("search-location");

let geo = "London";


// search function

function search() {
  geo = searchField.value;
  getD(geo);
}

// fetch function

async function getD(loc) {
  try {
    const weather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=27d49ffee088450caee110555240812&q=${loc}&days=3&aqi=no&alerts=no`
    );
    const weatherData = await weather.json();
    display(weatherData);
  } catch (err) {
    console.log(err);
  }
}

//  display function

function display(data) {
  locationName.innerHTML = data.location.name;
  // temp
  tempDay1.innerHTML = data.forecast.forecastday[0].day.avgtemp_c;
  tempDay2.innerHTML = data.forecast.forecastday[1].day.avgtemp_c;
  tempDay3.innerHTML = data.forecast.forecastday[2].day.avgtemp_c;
  //wind speed
  wsDay1.innerHTML = data.forecast.forecastday[0].day.maxwind_mph;
  wsDay2.innerHTML = data.forecast.forecastday[1].day.maxwind_mph;
  wsDay3.innerHTML = data.forecast.forecastday[2].day.maxwind_mph;
  //wind direction
  wdDay1.innerHTML = data.current.wind_dir;
  wdDay2.innerHTML = data.current.wind_dir;
  wdDay3.innerHTML = data.current.wind_dir;

  //icon state
  icon1.src = data.forecast.forecastday[0].day.condition.icon;
  icon2.src = data.forecast.forecastday[1].day.condition.icon;
  icon3.src = data.forecast.forecastday[2].day.condition.icon;
}
// get location

function getLocation() {
  

  async function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    const reg=await fetch(`https://api-bdc.net/data/reverse-geocode?latitude=${crd.latitude}&longitude=${crd.longitude}&localityLanguage=en&key=bdc_0177872f3c0f4d5bb27659bc01b694a8`);
    const locationName= await reg.json();
    console.log(locationName.countryName);
  
  geo = locationName.countryName;
  getD(geo);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const lo= navigator.geolocation.getCurrentPosition(success, error);


}

// get date 
function getDate(){
  let today = new Date();
  const tod = today.toLocaleString('default', {day:'numeric', month: 'short' });
  document.getElementById('dateDay-1').innerHTML = tod;
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tom = tomorrow.toLocaleString('default', {day:'numeric', month: 'short' });

  document.getElementById('dateDay-2').innerHTML = tom;


  let afterTomorrow = new Date();
  afterTomorrow.setDate(today.getDate() + 2);
  const afTom = afterTomorrow.toLocaleString('default', {day:'numeric', month: 'short' });
  document.getElementById('dateDay-3').innerHTML = afTom;
}

// event listener

searchField.addEventListener("input", () => {
  search();
});
btnSearch.addEventListener("click", () => {
  search();
});

// main
getLocation();
getD(geo);
getDate();