import { apiCalls } from './api-calls.js';
import { finalizeTrip } from './finalize.js';
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
// let storedLocation = JSON.parse(localStorage.getItem('storedLocation')|| "[]");
// let storedTripOrganizer = JSON.parse(localStorage.getItem('storedTripOrganizer')|| "[]");
// let storedStartDate = JSON.parse(localStorage.getItem('storedStartDate')|| "[]");
// let storedEndDate = JSON.parse(localStorage.getItem('storedEndDate')|| "[]");
// let storedCampers = JSON.parse(localStorage.getItem('storedCampers')|| "[]");
let campers = [];

export function initializePage() {
  $("form#initialize-trip").submit(function(event) {
    event.preventDefault();
    const location = $("input#location").val();
    const tripOrganizer = $("input#organizer").val();
    const startDate = new Date($("#start-date").val());
    const endDate = new Date($("#end-date").val());
    let formatStartDate = startDate.toDateString();
    let formatEndDate = endDate.toDateString();
    let reformatStartDate = formatStartDate.slice(0,11);

    if (startDate >= endDate) {
      $("#errorDate").show();
      setTimeout(function() {
        $("#errorDate").hide();
      }, 2000);
      document.getElementById("EndDate").value = "";
    }
    // if (storedLocation != "" || storedTripOrganizer != "" || storedStartDate != "" || storedEndDate != ""){
    //   $("#campers").append(`<div class="card"><div class="card-header">${storedTripOrganizer}</div><div class="card-body parent" id="${storedTripOrganizer}1" ondragover="onDragOver(event);" ondrop="onDrop(event);"></div></div>`);
    //   $("h3#trip-location").html(`${storedLocation}`);
    //   $("h3#trip-date").html(`${storedStartDate} — ${storedEndDate}`);
    //   $("#splash-screen").hide();
    //   $("#add-items").show();
    //   campers.push(storedTripOrganizer);
    // } else {
    localStorage.setItem('storedLocation', JSON.stringify(location));
    localStorage.setItem('storedTripOrganizer', JSON.stringify(tripOrganizer));
    localStorage.setItem('storedStartDate', JSON.stringify(startDate));
    localStorage.setItem('storedEndDate', JSON.stringify(endDate));
    campers.push(tripOrganizer);

    $("#campers").append(`<div class="card"><div class="card-header">${tripOrganizer}</div><div class="card-body parent" id="${tripOrganizer}1" ondragover="onDragOver(event);" ondragenter="onDragEnter(event);" ondragleave="onDragLeave(event);" ondrop="onDrop(event);"></div></div>`);
    $("h3#trip-location").html(`${location}`);
    $("h3#trip-date").html(`${reformatStartDate} — ${formatEndDate}`);
    $("#splash-screen").hide();
    $("#add-items").show();
    // }
    apiCalls(location);
    finalizeTrip();
  });
}

export function addCamper() {
  let counter = 2;
  $("form#add-camper").submit(function(event) {
    event.preventDefault();
    let inputCamper = $("input#camper").val();
    let inputCamperCounter = inputCamper + (counter).toString();
    if (campers.includes(inputCamperCounter)){
      $("#errorCamper").show();
      setTimeout(function() {
        $("#errorCamper").hide();
      }, 2000);
    } else {
      campers.push(inputCamperCounter);
      $("#campers").append(`<div class="card"><div class="card-header">${inputCamper}</div><div class="card-body parent" id="${inputCamperCounter}" ondragover="onDragOver(event);" ondragenter="onDragEnter(event);" ondragleave="onDragLeave(event);" ondrop="onDrop(event);"></div></div>`);
      $("input#camper").val("");
      counter++;
      finalizeTrip();
    }
  });
}

export function addKnownItem() {
  let knownItemNumber = 0;
  $("form#add-known-item").submit(function(event) {
    event.preventDefault();
    knownItemNumber += 1;
    let knownItem = $("#known-item").val();
    let knownImgUrl = `assets/images/${knownItem}.png`;
    $("#added-items").append(`<div id="${knownItem}${knownItemNumber}" ondragstart="onDragStart(event);" draggable="true" class="box" style="background-image: url(${knownImgUrl});"></div>`);
  });
}

export function addOtherItem() {
  let otherItemNumber = 0;
  $("form#add-other-item").submit(function(event) {
    event.preventDefault();
    otherItemNumber += 1;
    let otherItem = $("input#other-item").val();
    $("input#other-item").val("");
    $("#added-items").append(`<div id="${otherItem}${otherItemNumber}" ondragstart="onDragStart(event);" draggable="true" class="box" style="background-color: #07250e86; color: #f5f5f5;"><center><h5>${otherItem}</h5></center></div>`);
  });
}
