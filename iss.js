const request = require('request');

const fetchMyIP = function(callback) { 
    // use request to fetch IP address from JSON API

    request(`https://api.ipify.org/?format=json`, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode);
        console.log('body', body);

         if (error) {
             callback("PAGE NOT FOUND", null);
         }
         if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
          } else {
             const ip = JSON.parse(body).ip;
            callback(null, ip);
         }
 
    });

  }

  const fetchCoordsByIP = function (ip, callback){

    request(`https://freegeoip.app/json/`, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode);
        console.log('body', body);

         if (error) {
             callback("PAGE NOT FOUND", null);
         }
         if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetch coordinates for IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
          } else {
            const result = {};
             result.latitude = JSON.parse(body).latitude;
             result.longitude = JSON.parse(body).longitude;
             
             
            callback(null, result);
         }
 
    });


  }

  const fetchISSFlyOverTimes = function (coords, callback){
      const {latitude,longitude} = coords;

    request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode);
        console.log('body', body);

         if (error) {
             callback("PAGE NOT FOUND", null);
         }
         if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetch coordinates for IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
          } else {
           
             result= JSON.parse(body).response;
             
             
             
            callback(null, result);
         }
 
    });
  }

  const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip)=>{
      if(error){ callback(error, null)};
      fetchCoordsByIP(ip, (error, coords)=>{
          if(error){ callback(error,null)};
          fetchISSFlyOverTimes(coords, (error, dates)=>{
            if(error){ callback(error, null)};
            callback(null, dates)
          })
      })
  })
}
  
  module.exports = { fetchMyIP };
  module.exports = { fetchCoordsByIP };
  module.exports = {fetchISSFlyOverTimes};
  module.exports = {nextISSTimesForMyLocation};