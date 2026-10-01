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
  const w = canvas.width;
  const h = canvas.height;

  // Clear previous frame
  ctx.clearRect(0, 0, w, h);

  // 2. Draw Back Wall background (covers entire canvas behind the floor)
  ctx.fillStyle = "#fcf9f0"; // Wall color
  ctx.fillRect(0, 0, w, h);

  // 3. Define 2.5D Floor Trapezoid Perspective
  const horizonY = h * 0.25;    // Horizon line where wall meets floor (35% down)
  const backLeftX = w * 0.15;   // Back-left corner of the room floor
  const backRightX = w * 0.85;  // Back-right corner of the room floor

  // Save drawing state before applying clipping path
  ctx.save();

  // Create trapezoid shape for the 2.5D floor
  ctx.beginPath();
  ctx.moveTo(backLeftX, horizonY); // Top-left of floor
  ctx.lineTo(backRightX, horizonY); // Top-right of floor
  ctx.lineTo(w, h);                // Bottom-right corner
  ctx.lineTo(0, h);                // Bottom-left corner
  ctx.closePath();

  // Restrict drawing to ONLY the floor trapezoid shape
  ctx.clip();

  // 4. Draw floor image inside the 2.5D floor shape
  if (floorImage.complete && floorImage.naturalWidth !== 0) {
    ctx.drawImage(floorImage, 0, horizonY, w, h - horizonY);
  } else {
    // Fallback floor color while image loads
    ctx.fillStyle = "#3a3a4c";
    ctx.fill();
  }

  // Restore drawing state to remove clipping mask for future rendering (pets/toys)
  ctx.restore();

  // Request the next frame
  requestAnimationFrame(draw);
}

// Start drawing once floor image is loaded
floorImage.onload = () => {
  draw();
};

// Also start immediately in case image is cached
draw();
