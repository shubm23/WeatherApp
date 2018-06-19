const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
    .options({
      a:{
        demand: true,
        alias: 'address',
        describe: 'Address to fetch Weather',
        string: true
      }
    })
    .help()
    .alias('help','h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
let geourl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geourl)
    .then((response)=>{
      if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find Address');
      }
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      let weatherURL = `https://api.forecast.io/forecast/8aa67c4cfcf9cdf5b80791a134220d7b/${lat},${lng}`;
      console.log(response.data.results[0].formatted_address);
      return axios.get(weatherURL);
    }).then((response)=>{
      let temperature = response.data.currently.temperature;
      let apparentTemperature = response.data.currently.apparentTemperature;
      console.log(`It's currently ${(temperature-32)*0.5} Degrees. It feels like ${(apparentTemperature-32)*0.5} Degrees.`);

    }).catch((e)=>{
      if(e.code === 'ENOTFOUND'){
        console.log('Unable to Connect to API server');
      }else{
        console.log(e.message);
      }
    });
