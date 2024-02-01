const dropArea = document.getElementById('drop-area');
let isDragging = false;
let startMouseX, startMouseY, lastDeltaMouseX = 0, lastDeltaMouseY = 0;
let zoomFactor = 1.0;
const zoomStep = 0.05;

function handleMouseDown(event) {
  // Verifica se o botão pressionado é o botão do meio (scroll)
  if (event.button === 1 && event.target === dropArea) {
    isDragging = true;
    startMouseX = event.clientX;
    startMouseY = event.clientY;
  }
}

function handleMouseMove(event) {
  if (isDragging) {
    const deltaMouseX = event.clientX - startMouseX + lastDeltaMouseX;
    const deltaMouseY = event.clientY - startMouseY + lastDeltaMouseY;

    // Move the drop-area
    dropArea.style.transform = `translate(${deltaMouseX}px, ${deltaMouseY}px) scale(${zoomFactor})`;
  }
}

function handleMouseUp() {
  if (isDragging) {
    isDragging = false;
    lastDeltaMouseX += event.clientX - startMouseX;
    lastDeltaMouseY += event.clientY - startMouseY;
    startMouseX = event.clientX;
    startMouseY = event.clientY;
  }
}

function handleWheel(event) {
  // Adjust zoom factor
  const newZoomFactor = zoomFactor * (event.deltaY < 0 ? 1 + zoomStep : 1 / (1 + zoomStep));

  // Calculate the scale factor between the new and old zoom factors
  const scaleFactor = newZoomFactor / zoomFactor;

  // Update zoom factor
  zoomFactor = newZoomFactor;

  // Apply transformation for zoom
  dropArea.style.transform = `translate(${lastDeltaMouseX}px, ${lastDeltaMouseY}px) scale(${zoomFactor})`;

  // Adjust drop area size
  dropArea.style.width = `${dropArea.clientWidth * scaleFactor}px`;
  dropArea.style.height = `${dropArea.clientHeight * scaleFactor}px`;

  // Prevent the default wheel behavior to avoid page scrolling
  event.preventDefault();
}

dropArea.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
dropArea.addEventListener('wheel', handleWheel);

