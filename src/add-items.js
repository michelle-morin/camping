import { TrailService } from './trail-service.js';
import { GeoService } from './geo-service.js';
import $ from 'jQuery';
import './assets/images/tent.png';
import './assets/images/firewood.png';
import './assets/images/booze.png';
import './assets/images/cards.png';
import './assets/images/cooler.png';
import './assets/images/firstaid.png';
import './assets/images/hatchet.png';
import './assets/images/lantern.png';
import './assets/images/stove.png';
import './assets/images/transport.png';
import './assets/images/water-filter.png';
import './assets/images/chair.png';
import './assets/images/default.png';

export function initializePage() {
  $("form#initialize-trip").submit(function(event) {
    event.preventDefault();
    const location = $("input#location").val();
    const tripOrganizer = $("input#organizer").val();
    const startDate = $("#start-date").val();
    const endDate = $("#end-date").val();

    $("#trail-info").on('click', 'li', function() {
      let currentTrail= $(this).val();
      (async () => {
        let currentTrailResponse = await trailService.getTrailByID(currentTrail);
        if (currentTrailResponse.trails.length === 0) {
          $("#more-info h3").html("Whoops, there was an error displaying more information about this trail.")
        } else if (currentTrailResponse.trails.length > 0) {
          $("#more-info h3").html(`${currentTrailResponse.trails[0].name}`);
          let summary;
          if (currentTrailResponse.trails[0].summary === "Needs Adoption") {
            summary = "unavailable";
          } else {
            summary = currentTrailResponse.trails[0].summary;
          }
          $("#more-info ul").append(`<li>Location:${currentTrailResponse.trails[0].location}</li><li>Difficulty: ${currentTrailResponse.trails[0].difficulty}</li><li>Acent: ${currentTrailResponse.trails[0].ascent}</li><li>Descent: ${currentTrailResponse.trails[0].descent}</li><li>${summary}</li>`)
        }
      })();
    });
    const trailService = new TrailService();
    const geoService = new GeoService();
    (async () => {
      let geoResponse = await geoService.getGeoByInput(location);
      let lat = geoResponse.results[0].geometry.lat;
      let lng = geoResponse.results[0].geometry.lng;
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
    $("#campers").append(`<div class="card"><div class="card-header">${tripOrganizer}</div><div class="card-body parent" id="camper1" ondragover="onDragOver(event);" ondrop="onDrop(event);"></div></div>`);
    $("h3#trip-location").html(`${location}`);
    $("h3#trip-date").html(`${startDate}-${endDate}`);
    $("#splash-screen").hide();
    $("#add-items").show();
  });
}

export function addCamper() {
  let counter = 2;
  $("form#add-camper").submit(function(event) {
    event.preventDefault();
    let inputCamper = $("input#camper").val();
    $("#campers").append(`<div class="card"><div class="card-header">${inputCamper}</div><div class="card-body parent" id="camper${counter}" ondragover="onDragOver(event);" ondrop="onDrop(event);"></div></div>`);
  });
}

export function addKnownItem() {
  let knownItemNumber = 0;
  $("form#add-known-item").submit(function(event) {
    event.preventDefault();
    knownItemNumber += 1;
    let knownItem = $("#known-item").val();
    let knownImgUrl = `assets/images/${knownItem}.png`;
    $("#added-items").append(`<div id="knownItem${knownItemNumber}" ondragstart="onDragStart(event);" draggable="true" class="box"><h5>${knownItem}</h5><center><img src='${knownImgUrl}' alt="a photo of an item"></center></div>`);
  });
}

export function addOtherItem() {
  let otherItemNumber = 0;
  $("form#add-other-item").submit(function(event) {
    event.preventDefault();
    otherItemNumber += 1;
    let defaultImgUrl = 'assets/images/default.png';
    let otherItem = $("input#other-item").val();
    $("input#other-item").val("");
    $("#added-items").append(`<div id="otherItem${otherItemNumber}" ondragstart="onDragStart(event);" draggable="true" class="box"><h5>${otherItem}</h5><center><img src='${defaultImgUrl}' alt='a photo of an item'></center></div>`);
  });
}