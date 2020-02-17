import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { TrailService } from './trail-service.js';
import { GeoService } from './geo-service.js';

$(document).ready(function() {
  const trailService = new TrailService();
  const geoService = new GeoService();

  $(".searchButton").click(function(event) {
    event.preventDefault();

    (async () => {
      let response = await trailService.getTrailInfoByLoc();
      getElements(response);
    })();

    (async () => {
      let response = await geoService.getGeoByInput();
      console.log(response.results[0].geometry.lat);
      console.log(response.results[0].geometry.lng);
      // getElements(response);
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