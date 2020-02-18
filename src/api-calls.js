import { TrailService } from './trail-service.js';
import { GeoService } from './geo-service.js';
import $ from 'jQuery';
// import { WeatherService } from '.weather-service.js';

export function apiCalls(location) {
  const trailService = new TrailService();
  const geoService = new GeoService();

  $("#trail-info").on('click', 'li', function() {
    let currentTrail= $(this).val();
    (async () => {
      let currentTrailResponse = await trailService.getTrailByID(currentTrail);
      if (currentTrailResponse.trails.length === 0) {
        $("#more-info h3").html("Whoops, there was an error displaying more information about this trail.");
      } else if (currentTrailResponse.trails.length > 0) {
        $("#more-info h3").html(`${currentTrailResponse.trails[0].name}`);
        let summary;
        if (currentTrailResponse.trails[0].summary === "Needs Adoption") {
          summary = "unavailable";
        } else {
          summary = currentTrailResponse.trails[0].summary;
        }
        $("#more-info ul").append(`<li>Location:${currentTrailResponse.trails[0].location}</li><li>Difficulty: ${currentTrailResponse.trails[0].difficulty}</li><li>Acent: ${currentTrailResponse.trails[0].ascent}</li><li>Descent: ${currentTrailResponse.trails[0].descent}</li><li>${summary}</li>`);
      }
    })();
  });

  (async () => {
    let geoResponse = await geoService.getGeoByInput(location);
    let lat = geoResponse.results[0].geometry.lat;
    let lng = geoResponse.results[0].geometry.lng;

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