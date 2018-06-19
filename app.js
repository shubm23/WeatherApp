const yargs = require('yargs');
const geocode = require('./src/geocode');
const weather = require('./src/weather');
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

let address = argv.a;
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${(weatherResults.temperature-32)*0.5} Degrees. It feels like ${(weatherResults.apparentTemperature-32)*0.5} Degrees.`);
      }
    });
  }
});
