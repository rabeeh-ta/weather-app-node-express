const request = require('request');

const geoCode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoicmFiZWVoLXRhIiwiYSI6ImNrbHJoNnltajBjZ3oyeG1wejA3Mmk3NTcifQ.p_H8PVeSV8n6j4AdHHmQjQ&limit=1';

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to location service', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = { geoCode: geoCode };
