// HTML
let body = document.body,
    dDev = document.getElementById('dev'),
    dFPS = document.getElementById('dev-fps'),
    dOther = document.getElementById('dev-other')

body.onkeydown = input

// Variables
let maxFPS = 24,
    timestep = 1000 / maxFPS,
    lastFrameTimeMs = 0, // The last time the loop was run
    elapsed = 0,
    fps = maxFPS,
    framesThisSecond = 0,
    lastFpsUpdate = 0,
    running = false,
    started = false,
    frameID = 0,
    width = body.clientWidth,
    height = body.clientHeight

var GameObjects = {}

function run(timestamp) {
  //console.log(`run`)

  // Throttle the framerate
  if (timestamp < (lastFrameTimeMs + (1000 / maxFPS))) {
    requestAnimationFrame(run)
    return
  }

  elapsed += timestamp - lastFrameTimeMs
  lastFrameTimeMs = timestamp

  //begin(timestamp, delta)

  if (timestamp > (lastFpsUpdate + 1000)) {
    fps = 0.25 * framesThisSecond + 0.75 * fps

    lastFpsUpdate = timestamp
    framesThisSecond = 0
  }
  framesThisSecond++

  let numUpdateSteps = 0
  while(elapsed >= timestep) {
    update(timestep)
    elapsed -= timestep
    // Sanity check
    if (++numUpdateSteps >= 240) {
        panic() // fix things
        break // bail out
    }
  }

  draw(elapsed / timestep)

  //end(fps)

  frameID = requestAnimationFrame(run)
}

// Handles user input
function input(e) {
  let keyCode = e.keyCode

  switch (keyCode) {
    case KEYCODE.P:
      stop()
      break
    case KEYCODE.S:
      start()
      break
  }
}

// Handles updating objects
function update(delta) {
  //console.log(`update`)
  // Update the size of the window
  if (body.clientWidth != width || body.clientHeight != height) {
    width = body.clientWidth
    height = body.clientHeight
  }

  // Update game objects
  for (obj in GameObjects) {
    if (GameObjects[obj].id)
      GameObjects[obj].update()
    else
      for (o in GameObjects[obj]) {
        GameObjects[obj][o].update()
      }
  }
}

// Handles drawing objects
function draw(interpolation) {
  // console.log('draw')
  dOther.textContent = `height: ${height} width: ${width}`
  dFPS.textContent = Math.round(fps) + ' FPS'

  // Draw game objects
  for (obj in GameObjects) {
    if (GameObjects[obj].id)
      GameObjects[obj].draw()
    else
      for (o in GameObjects[obj]) {
        GameObjects[obj][o].draw()
      }
  }
}

// I don't really know what to do here
function panic() {
  console.log("Ermagurhd")
  elapsed = 0
}

// Called when the game starts
function start() {
  console.log('starting')
  if (!started) { // don't request multiple frames
    started = true;
    // Dummy frame to get our timestamps and initial drawing right.
    // Track the frame ID so we can cancel it if we stop quickly.
    frameID = requestAnimationFrame(function(timestamp) {
      draw(1); // initial draw
      running = true;
      // reset some time tracking variables
      lastFrameTimeMs = timestamp;
      lastFpsUpdate = timestamp;
      framesThisSecond = 0;
      // actually start the main loop
      frameID = requestAnimationFrame(run);
    });
  }
}

// Called when the game stops
// Doesn't always stop...
function stop() {
  console.log('stopping <==========')
  running = false
  started = false
  cancelAnimationFrame(frameID)
}

// Random helper
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
