import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { TrailService } from './trail-service.js';
import { GeoService } from './geo-service.js';

$(document).ready(function() {
  const trailService = new TrailService();
  const geoService = new GeoService();

  $('.searchButton').click(function(event) {
    event.preventDefault();
    $('#outputResults').empty();
    const searchLocation = $('#searchLocation').val();
    console.log(searchLocation);
    $('#searchLocation').val("");

    (async () => {
      let geoResponse = await geoService.getGeoByInput(searchLocation);
      let lat = geoResponse.results[0].geometry.lat;
      let lng = geoResponse.results[0].geometry.lng;
      (async () => {
        let trailResponse = await trailService.getTrailInfoByLoc(lat, lng);
        getElements(trailResponse);
      })();
    })();

    const getElements = function(response) {
      if (response) {
        console.log(response);
        // displayInfo(response);
      } else {
        $("#outputResults").append("There was an error with your request. Please double-check your entries.");
      }
    };
  });
});