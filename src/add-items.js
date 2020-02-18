import { apiCalls } from './api-calls.js';
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

    apiCalls(location);

    // Add any necessary clases for drag/drop into the append statement
    $("#campers").append(`<div id="camper1" ondragover="onDragOver(event);" ondrop="onDrop(event);" class="card parent"><h3>${tripOrganizer}</h3></div>`);
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
    $("#added-items").append(`<div id="knownItem${knownItemNumber}" ondragstart="onDragStart(event);" draggable="true" class="box" style="background-image: url(${knownImgUrl});"></div>`);
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
    $("#added-items").append(`<div id="otherItem${otherItemNumber}" ondragstart="onDragStart(event);" draggable="true" class="box" style="background-image: url(${defaultImgUrl});"><h5>${otherItem}</h5></div>`);
  });
}