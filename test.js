let totalTimems = 0;
timeout = 60000;


const updateTimeAndTimeLeft = (sunset) => {
  // sunElement.dataSet.time = new Date().toLocaleDateString([], {hour:'2-digit', minute:'2-digit', hour12:true});
  // timeLeftElement.innertext = timeLeftTimeStamp;
  document.querySelector('.js-sun').dataset.time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  //const timeleft = _parseMillisecondsIntoReadableTime(sunset) - new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  const timeleft = (sunset - new Date().getTime() / 1000) / 60;
  arraytime = (timeleft / 60).toString().split('.');
  document.querySelector('.js-time-left').innerText = arraytime[0] + ' uur ' + arraytime[1].substring(0, 2) + ' minuten';

  console.info('sunset timeleft ' + sunset);
  console.info('current time ' + new Date().getTime());
  // console.info('sunset - current ')
  console.info('current time ' + new Date().getTime());
  // console.info(typeof(sunset - new Date()));
};

let startSunMovement = (city) => {
  setInterval(() => {
    updateTimeAndTimeLeft(city.sunset);
    placeSunAndStartMoving(city.sunrise).catch((e) => console.error(e));
  }, timeout);
};


const makeReadableTimeFormatFromTimestamp = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};



function _parseMillisecondsIntoReadableTime(timestamp) {
  //Get hours from milliseconds
  const date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  const hours = '0' + date.getHours();
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes();

  return hours.substr(-2) + ':' + minutes.substr(-2);
}

let placeSunAndStartMoving = (sunrise) => {
  const currenttime = new Date().getTime();
  const percentageday = (currenttime - sunrise * 1000) / totalTimems;

  const sunriseLeftPosition = percentageday * 100;
  const sunriseBottomPosition = Math.sin(Math.PI * percentageday) * 100;
  console.info('currenttime' + currenttime);
  console.info('totaltime' + totaltimems);
  console.info('sunrise' + sunrise);
  console.info('percentageday' + percentageday);
  console.info('sunrisebottom' + sunriseBottomPosition);

  document.querySelector('.js-sun').style.left = `${sunriseLeftPosition}%`;
  document.querySelector('.js-sun').style.bottom = `${sunriseBottomPosition}%`;
};


let showResult = (queryResponse) => {
  document.querySelector('.js-location').innerText = queryResponse.name + ', ' + queryResponse.country;
  document.querySelector('.js-sunrise').innerText = _parseMillisecondsIntoReadableTime(queryResponse.sunrise);
  document.querySelector('.js-sunset').innerText = _parseMillisecondsIntoReadableTime(queryResponse.sunset);
};

const getData = (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .catch((e) => console.error(e));
};

document.addEventListener('DOMContentLoaded', async function () {
  // 1 We will query the API with longitude and latitude.
  let lat = 50.8027841;
  let lon = 3.2097454;
  const endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1582dbea022940ad4b9e58b28cd900ad&units=metric&lang=nl&cnt=1`;
  const { city } = await getData(endpoint);
  console.log(city);
  showResult(city);

  totaltimems = (city.sunset - city.sunrise) * 1000;
  placeSunAndStartMoving(city.sunrise);
  updateTimeAndTimeLeft(city.sunset);
  startSunMovement(city);

});

