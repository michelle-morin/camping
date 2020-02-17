import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { TrailService } from './trail-service.js';


$(document).ready(function() {
  const trailService = new TrailService();

  $(".searchButton").click(function(event) {
    event.preventDefault();

    (async () => {
      const response = await trailService.getTrailInfoByLoc();
      getElements(response);
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