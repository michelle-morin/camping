function onDragStart(event) {
  event.dataTransfer.setData('text', event.target.id);
  //event.target.className += hold; to add a temp visuals
  //setTImeout(() => (event.target.className = 'invisible'), 0); will clear the old image out while dragging
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
}