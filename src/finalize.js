export function finalizeTrip() {
  document.getElementById("save-trip").onclick = function() { 
    let campers = [];
    let camperItems = [];
    let camperArr = document.getElementsByClassName("parent");
    
    for (let j = 0; j < camperArr.length - 1; j++) {
      campers.push(camperArr[j].id);

      let itemsForCamper = camperArr[j].getElementsByClassName("box");
      let currentCamperItems = [];
      for (let i = 0; i < itemsForCamper.length; i++){
        currentCamperItems.push(itemsForCamper[i].id);
      }
      camperItems.push(currentCamperItems);
    }    
  };
}