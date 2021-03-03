const request = require('request');

const foreCast = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=425903f3269f4505ecf6d257c2d97aa2&units=metric`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather station', undefined);
    } else if (response.statusCode === 400) {
      callback(response.body.message, undefined);
    } else {
      callback(
        undefined,
        `${response.body.weather[0].description} it is currently ${response.body.main.temp} degrees out. there is a ${response.body.main.humidity}% chance of rain`
      );
    }
  });
};

module.exports = { foreCast: foreCast };
