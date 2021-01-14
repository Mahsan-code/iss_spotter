
const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss_promised');
const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');

nextISSTimesForMyLocation()
    .then(PassTime => {
        printPassTimes(PassTime);
    })
    .catch (error => {
        console.log("It didn't work: ", error.message);
    })

