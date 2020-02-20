// All commented code in this file is for future local storage utilization
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
let storedLocation = JSON.parse(localStorage.getItem('storedLocation')|| "[]");
// let storedTripOrganizer = JSON.parse(localStorage.getItem('storedTripOrganizer')|| "[]");
let storedStartDate = JSON.parse(localStorage.getItem('storedStartDate')|| "[]");
let storedEndDate = JSON.parse(localStorage.getItem('storedEndDate')|| "[]");
let storedCampers = JSON.parse(localStorage.getItem('storedCampers')|| "[]");

export function initializePage() {
  $("form#initialize-trip").submit(function(event) {
    event.preventDefault();
    const location = $("input#location").val();
    const tripOrganizer = $("input#organizer").val();
    const startDateInput = new Date($("#start-date").val());
    let startDate = new Date(startDateInput.getTime() + 1919 * 60000);
    const endDateInput = new Date($("#end-date").val());
    let endDate = new Date(endDateInput.getTime() + 1919 * 60000);
    let formatStartDate = startDate.toDateString();
    let formatEndDate = endDate.toDateString();
    let reformatStartDate = formatStartDate.slice(0,11);
    // const today = new Date();
  
    if (startDate >= endDate) {
      $("#errorDate").show();
      setTimeout(function() {
        $("#errorDate").hide();
      }, 2000);
      document.getElementById("EndDate").value = "";
    }
    // if (storedLocation != "" || storedStartDate != "" || storedEndDate != "") {
      if (storedCampers.length > 0){
      $("#errorTrip").show();
      setTimeout(function() {
        $("#errorTrip").hide();
        // $("#splash-screen").hide();
        $("#startPlanningButton").hide();
        $("#dontRevertButton").show();
        $("#revertButton").show();
      }, 2000);
      
      $("#revertButton").click(function() {
        // Ask camper if they would like to revert back to previous trip or create new trip
        //   $("#campers").append(`<div class="card"><div class="card-header">${camper}</div><div class="card-body parent" ondragover="onDragOver(event);" ondragenter="onDragEnter(event);" ondragleave="onDragLeave(event);" ondrop="onDrop(event);"></div></div>`);
        // });
        $("input#camper").val("");
        $("h3#trip-location").html(`${storedLocation}`);
        $("h3#trip-date").html(`${storedStartDate} — ${storedEndDate}`);
        $("#splash-screen").hide();
        $("#add-items").show();
        $("#dontRevertButton").hide();
        $("#revertButton").hide();
        storedCampers.forEach(function(camper){
          $("#campers").append(
          `<div class="card"><div class="card-header">${camper}</div><div class="card-body parent" id="${camper}1" ondragover="onDragOver(event);" ondragenter="onDragEnter(event);" ondragleave="onDragLeave(event);" ondrop="onDrop(event);"></div></div>`
        );
      });
    });
      $("#dontRevertButton").click(function() {
        // If camper doesn't want to divert back to old trip then populate the dom with the new information
        $("#campers").append(
          `<div class="card"><div class="card-header">${tripOrganizer}</div><div class="card-body parent" id="${tripOrganizer}1" ondragover="onDragOver(event);" ondragenter="onDragEnter(event);" ondragleave="onDragLeave(event);" ondrop="onDrop(event);"></div></div>`
        );
        $("h3#trip-location").html(`${location}`);
        $("h3#trip-date").html(`${reformatStartDate} — ${formatEndDate}`);
        $("#splash-screen").hide();
        $("#add-items").show();
        localStorage.setItem("storedLocation", JSON.stringify(location));
        localStorage.setItem(
          "storedTripOrganizer",
          JSON.stringify(tripOrganizer)
        );
        localStorage.setItem("storedStartDate", JSON.stringify(startDate));
        localStorage.setItem("storedEndDate", JSON.stringify(endDate));
        // campers.push(tripOrganizer);
      });
    } else {
      $("#campers").append(
        `<div class="card"><div class="card-header">${tripOrganizer}</div><div class="card-body parent" id="${tripOrganizer}1" ondragover="onDragOver(event);" ondragenter="onDragEnter(event);" ondragleave="onDragLeave(event);" ondrop="onDrop(event);"></div></div>`
      );
      $("h3#trip-location").html(`${location}`);
      $("h3#trip-date").html(`${reformatStartDate} — ${formatEndDate}`);
      $("#splash-screen").hide();
      $("#add-items").show();
      localStorage.setItem("storedLocation", JSON.stringify(location));
      localStorage.setItem(
        "storedTripOrganizer",
        JSON.stringify(tripOrganizer)
      );
      localStorage.setItem("storedStartDate", JSON.stringify(startDate));
      localStorage.setItem("storedEndDate", JSON.stringify(endDate));
    }
  });
  // If camper wants to divert back to old trip then populate the dom with locally stored information

  apiCalls(location);
  finalizeTrip();
}
export function addCamper(campers) {
  let counter = 2;
  $("form#add-camper").submit(function(event) {
    event.preventDefault();
    let closeImgUrl = `https://static.thenounproject.com/png/240658-200.png`;
    let inputCamper = $("input#camper").val();
    let inputCamperCounter = inputCamper + (counter).toString();
    let closeOutCounter = "X" + (counter).toString();
    if (campers.includes(inputCamperCounter)){
      $("#errorCamper").show();
      setTimeout(function() {
        $("#errorCamper").hide();
      }, 2000);
    } else {
      campers.push(inputCamperCounter);
      $("#campers").append(`<div class="card"><div class="card-header">${inputCamper} <img id="${closeOutCounter}" src="${closeImgUrl}" alt="X icon"></div><div class="card-body parent" id="${inputCamperCounter}" ondragover="onDragOver(event);" ondragenter="onDragEnter(event);" ondragleave="onDragLeave(event);" ondrop="onDrop(event);"></div></div>`);
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
