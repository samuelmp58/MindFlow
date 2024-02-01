function createButton(text, clickHandler) {
  var button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
}

function createSlider(min, max, value, inputHandler) {
  var slider = document.createElement("input");
  slider.type = "range";
  slider.min = min;
  slider.max = max;
  slider.value = value;
  slider.addEventListener("input", function () {
    inputHandler(slider.value);
  });
  return slider;
}

function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.id = "canvas-draw";
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function addDrawingFunctionality(canvas, ctx) {
  var isDrawing = false;

  canvas.addEventListener("mousedown", function (event) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
  });

  canvas.addEventListener("mousemove", function (event) {
    if (isDrawing) {
      if (event.buttons === 1) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
      } else if (event.buttons === 2) {
        ctx.fillStyle = "#FFFFFF";
        ctx.arc(event.offsetX, event.offsetY, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });

  canvas.addEventListener("mouseup", function () {
    isDrawing = false;
  });
}


