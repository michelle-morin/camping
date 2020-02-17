import $ from 'jQuery';

export function initializePage() {
  $("form#initialize-trip").submit(function(event) {
    event.preventDefault();
    const location = $("input#location").val();
    const tripOrganizer = $("input#organizer").val();
    const startDate = $("#start-date").val();
    const endDate = $("#end-date").val();
    // Add UI logic for APIs that use location.
    // Add any necessary clases for drag/drop into the append statement
    $("#left-campers").append(`<div class="card"><h3>${tripOrganizer}</h3></div>`);
    $("h3#trip-location").html(`${location}`);
    $("h3#trip-date").html(`${startDate}-${endDate}`);
    $("#splash-screen").hide();
    $("#add-items").show();
  });
}

export function addCamper() {
  let counter = 1;
  $("form#add-camper").submit(function(event) {
    event.preventDefault();
    let camper = $("input#camper").val();
    // Add any necessary clases for drag/drop into the append statement
    if (counter %2 === 0) {
      $("#left-campers").append(`<div class="card"><h3>${camper}</h3></div>`);
    } else {
      $("#right-campers").append(`<div class="card"><h3>${camper}</h3></div>`);
    }
    counter += 1;
  });
}

export function addKnownItem() {
  $("form#add-known-item").submit(function(event) {
    event.preventDefault();
    let knownItem = $("#known-item").val();
    let knownImgUrl = `./assets/images/${knownItem}.png`; // Requires figuring out local images.
    $("#added-items").append(`<div class="card"><h3>${knownItem}</h3><img src="${knownImgUrl}" alt="a photo of an item"></div>`);
  });
}

export function addOtherItem() {
  $("form#add-other-item").submit(function(event) {
    event.preventDefault();
    let otherItem = $("input#other-item").val();
    let otherImgUrl = `../img/default.jpeg`; // requires a default img
    $("#added-items").append(`<div class="card"><h3>${otherItem}</h3><img src=${otherImgUrl} alt="a photo of an item"></div>`);
  });
}