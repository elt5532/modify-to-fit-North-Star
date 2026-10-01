const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 1. Create and load the floor image
const floorImage = new Image();
floorImage.src = "assets/floor.png"; // Ensure your image is located at this path!

// Adjust canvas resolution for sharp rendering on retina screens
function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Game render loop
function draw() {
  // Clear previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Draw the floor PNG image to cover the full canvas area
  if (floorImage.complete && floorImage.naturalWidth !== 0) {
    ctx.drawImage(floorImage, 0, 0, canvas.width, canvas.height);
  } else {
    // Fallback floor color while image loads
    ctx.fillStyle = "#3a3a4c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Request the next frame
  requestAnimationFrame(draw);
}

// Start drawing once floor image is loaded
floorImage.onload = () => {
  draw();
};

// Also start immediately in case image is cached
draw();
