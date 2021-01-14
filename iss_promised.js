const request = require('request-promise-native');

const fetchMyIP = function(callback) { 
    // use request to fetch IP address from JSON API

    return request('https://api.ipify.org?format=json');

  }

  const fetchCoordsByIP = function(body) {
    const ip = JSON.parse(body).ip;
  
    return request(`https://freegeoip.app/json/${ip}`);
  };

  const fetchISSFlyOverTimes = function (body){
    
    latitude = JSON.parse(body).latitude;
    longitude = JSON.parse(body).longitude;

    return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
    


  }

  const nextISSTimesForMyLocation = function(callback){

    return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data =>{
        const {response} = JSON.parse(data);
        return response;
    })


  }

  module.exports = { nextISSTimesForMyLocation};