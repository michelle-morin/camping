export function initializePage() {
  $("form#initialize-trip").submit(function(event) {
    event.preventDefault();
    const location = $("input#location").val();
    const tripOrganizer = $("input#organizer").val();
    const tripDate = $("#date").val();
    $("#left-campers").append(`<div class="card"><h3>${tripOrganizer}</h3></div>`);
    $("h3#trip-location").html(`${location}`);
    $("h3#date").html(`${tripDate}`);
    $("#splash-screen").hide();
    $("#add-items").show();
  });
}

export function addCamper() {
  
}