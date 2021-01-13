const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
// fetchCoordsByIP('87.101.48.251' , (error, data)=>{

//     if(error){
//         console.log("It didn't work!" , error);  
//         return;
//     }
//     console.log('It worked! Returned data:' , data);
// })

// fetchISSFlyOverTimes({ latitude: 45.5075, longitude: -73.5887 } , (error, data)=>{

//     if(error){
//         console.log("It didn't work!" , error);  
//         return;
//     }
//     console.log('It worked! Returned data:' , data);
// })




const printPassTimes = function(passTimes){

    for (const item of passTimes){
        const dateTime = new Date(0);
        dateTime.setUTCSeconds(item.risetime);
        const duration = item.duration;
        console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
    }
}

nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    // success, print out the deets!
    printPassTimes(passTimes);
  });