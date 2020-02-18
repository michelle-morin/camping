import { TrailService } from './trail-service.js';
import { GeoService } from './geo-service.js';
import { WeatherService } from './weather-service.js';
import $ from 'jQuery';

export function apiCalls(location) {
  const trailService = new TrailService();
  const geoService = new GeoService();
  const weatherService = new WeatherService();

  $("#trail-info").on('click', 'li', function() {
    let currentTrail= $(this).val();
    (async () => {
      let currentTrailResponse = await trailService.getTrailByID(currentTrail);
      if (currentTrailResponse.trails.length === 0) {
        $("#more-info h3").html("Whoops, there was an error displaying more information about this trail.");
      } else if (currentTrailResponse.trails.length > 0) {
        $("#more-info h3").html(`${currentTrailResponse.trails[0].name}`);
        let summary;
        if (currentTrailResponse.trails[0].summary === "Needs Adoption" || currentTrailResponse.trails[0].summary === "Needs Summary") {
          summary = "unavailable";
        } else {
          summary = currentTrailResponse.trails[0].summary;
        }
        $("#more-info ul").html(`<li>Location:${currentTrailResponse.trails[0].location}</li><li>Difficulty: ${currentTrailResponse.trails[0].difficulty}</li><li>Acent: ${currentTrailResponse.trails[0].ascent}</li><li>Descent: ${currentTrailResponse.trails[0].descent}</li>`);
        if (summary != "unavailable") {
          $("#more-info ul").append(`<li>Summary: ${summary}</li>`);
        }
      }
    })();
  });

  (async () => {
    let geoResponse = await geoService.getGeoByInput(location);
    console.log(geoResponse);
    let lat = geoResponse.results[0].geometry.lat;
    let lng = geoResponse.results[0].geometry.lng;
    let sunrise = geoResponse.results[0].annotations.sun.rise.apparent + geoResponse.results[0].annotations.timezone.offset_sec;
    let sunset = geoResponse.results[0].annotations.sun.set.apparent + geoResponse.results[0].annotations.timezone.offset_sec;

    //Weather Info
    (async () => {
      let weatherResponse = await weatherService.getWeatherByLoc(lat, lng, sunrise, sunset);
      console.log(weatherResponse);
      getWeather(weatherResponse, sunrise, sunset);
    })();
    
    //Trail Info
    (async () => {
      let radius = 10;
      let trailResponse = await trailService.getTrailInfoByLoc(lat, lng, radius);
      if (trailResponse.trails.length === 0) {
        radius += 50;
        let trailResponse = await trailService.getTrailInfoByLoc(lat, lng, radius);
        getElements(trailResponse);
      } else {
        getElements(trailResponse);
      }
    })();
  })();

  const getWeather = function(weatherResponse, sunrise, sunset) {
    console.log(`Current temperature is ${weatherResponse.main.temp}°F and feels like ${weatherResponse.main.feels_like}°F with ${weatherResponse.main.humidity}% humidity. Conditions are ${weatherResponse.weather[0].main.toLowerCase()}. Sunrise: ${getTime(sunrise)} Sunset: ${getTime(sunset)}`);
  };

  const getElements = function(response) {
    const trailsArray = response.trails;
    if (trailsArray) {
      trailsArray.sort(function(a, b) {
        return b.stars - a.stars;
      });
      for (let i=0; i<10; i++) {
        $("#trail-info ul").append(`<li value="${trailsArray[i].id}">${trailsArray[i].name}, ${trailsArray[i].length} miles</li>`);
      }
    } else {
      $("#trail-info").append("There was an error with your request. Please double-check your entries.");
    }
  };
}

const getTime = function(unicode) {
  let suntime = new Date(unicode *1000);
  let utcString = suntime.toUTCString();
  console.log(utcString);
  let time = utcString.slice(-12, -4);
  return time;
};

