//Require listener for Items -> ondragstart="return onDragStart(event)";
export function onDragStart(event) {
  event.dataTransfer.setData('text', event.target.id);
  //event.target.className += ' hold'; to add a temp visuals
  //this instead of event.target may work
  //setTImeout(() => (event.target.className = 'invisible'), 0); will clear the old image out while dragging
}

//Require listeners for Campers -> ondragover="return onDragOver(event)";
export function onDragOver(event) {
  event.preventDefault();
}

// -> ondragenter="return onDragEnter(event)";
export function onDragEnter(event) {
  event.preventDefault();
  //this.className += 'empty';
}

// -> ondrop="onDrop(event)";
export function onDrop(event) {
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
}