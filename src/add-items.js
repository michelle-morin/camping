export function initializePage() {
  $("form#initialize-trip").submit(function(event) {
    event.preventDefault();
    const location = $("input#location").val();
    const tripOrganizer = $("input#organizer").val();
    const tripDate = $("#date").val();
    // Add UI logic for APIs that use location.
    // Add any necessary clases for drag/drop into the append statement
    $("#left-campers").append(`<div class="card"><h3>${tripOrganizer}</h3></div>`);
    $("h3#trip-location").html(`${location}`);
    $("h3#date").html(`${tripDate}`);
    $("#splash-screen").hide();
    $("#add-items").show();
  });
}

export function addCamper() {
  $("form#add-camper").submit(function(event) {
    event.preventDefault();
    let counter = 1;
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
    let item = $("#known-item").val();
    let imgurl = `../img/${item}.jpeg`; // Requires figuring out local images.
    $("#added-items").append(`<div class="card"><h3>${item}</h3><img src=${imgurl} alt="a photo of an item"></div>`);
  });
}

export function addOtherItem() {
  $("form#add-other-item").submit(function(event) {
    event.preventDefault();
    let item = $("#other-item").val();
    let imgurl = `../img/default.jpeg`; // requires a default img
    $("#added-items").append(`<div class="card"><h3>${item}</h3><img src=${imgurl} alt="a photo of an item"></div>`);
  });
}