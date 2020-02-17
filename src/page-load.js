
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { TrailService } from './trail-service.js';
import { GeoService, arraySort } from './geo-service.js';

$(document).ready(function() {
  const trailService = new TrailService();
  const geoService = new GeoService();

  $('.searchButton').click(function(event) {
    event.preventDefault();
    $('#outputResults').empty();
    const searchLocation = $('#searchLocation').val();
    $('#searchLocation').val("");

    (async () => {
      let geoResponse = await geoService.getGeoByInput(searchLocation);
      let lat = geoResponse.results[0].geometry.lat;
      let lng = geoResponse.results[0].geometry.lng;
      (async () => {
        let radius = 10;
        let trailResponse = await trailService.getTrailInfoByLoc(lat, lng, radius);
        if (trailResponse.trails.length === 0) {
          console.log("Larger radius");
          let radius = 50;
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
        console.log(trailsArray);
        trailsArray.sort(arraySort);
        console.log(trailsArray.sort(arraySort));
        // displayInfo(trailsArray);
      } else {
        $("#outputResults").append("There was an error with your request. Please double-check your entries.");
      }
    };
  });
});