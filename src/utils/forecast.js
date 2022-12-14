const request = require("request");

const forecast = (latitude, longitude, callback) => {
   const url =
      "http://api.weatherstack.com/current?access_key=ded2f89c0558d0c51dcd37a3e039b424&query=45&query=" +
      latitude +
      "," +
      longitude +
      "&units=f";

   request({ url, json: true }, (error, { body }) => {
      if (error) {
         callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
         callback("Unable to find location", undefined);
      } else {
         callback(
            undefined,
            body.current.weather_descriptions[0] +
               ". It is currently " +
               body.current.temperature +
               " degress out and humidity is " +
               body.current.humidity +
               "%."
         );
      }
   });
};

module.exports = forecast;
