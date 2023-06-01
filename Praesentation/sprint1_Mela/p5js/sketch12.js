let sizeLine;
let countSteps;
let oldFrameCount;

let shiftX, shiftY;
let directionFactorX, directionFactorY;

let lineStart, controlPoint1, lineMiddle, controlPoint2, lineEnd;

let pivot;
let minX, maxX, minY, maxY;
let outlineMiddleRight, outlineMiddleLeft, outlineMiddleLower, outlineMiddleUpper;

function setup() {
  createCanvas(400, 500);
  noFill();
  stroke(100, 60);
  strokeWeight(1);
  background(230);
  frameRate(500);
  
  countSteps = random(300, 500);
  oldFrameCount = frameCount;

  setupCanvasAdjustment();
  setupLine();
  setupBoundaries();
}

function draw() {
  adjustOutlines();
  dontCrossOutlines();
  translate(width / 2 + shiftX, height / 2 + shiftY);
  createLine();
  
  if (frameCount > oldFrameCount + countSteps) {
    changeDirection();
  }
}

function setupCanvasAdjustment() {
  shiftX = 1;
  shiftY = 1;
  directionFactorX = 1;
  directionFactorY = 1;
}

function setupLine() {
  sizeLine = 150;
  lineStart     = createVector(0, 0);
  controlPoint1 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineMiddle    = createVector(random(0, sizeLine), random(0, sizeLine));
  controlPoint2 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineEnd       = createVector(random(0, sizeLine), random(0, sizeLine));
}

function setupBoundaries() {
  pivot = createVector(0, 0);
  minX = (pivot.x - width  / 2) * 0.9;
  maxX = (pivot.x + width  / 2) * 0.9;
  minY = (pivot.y - height / 2) * 0.9;
  maxY = (pivot.y + height / 2) * 0.9;
}

function adjustOutlines() {
  outlineMiddleRight = createVector(maxX - shiftX, minY - shiftY + height / 2 * 0.9);
  outlineMiddleLeft  = createVector(minX - shiftX, minY - shiftY + height / 2 * 0.9);
  outlineMiddleLower = createVector(minX - shiftX + width / 2 * 0.9, maxY - shiftY);
  outlineMiddleUpper = createVector(minX - shiftX + width / 2 * 0.9, minY - shiftY);
}

function dontCrossOutlines() {
  if(pivot.x < outlineMiddleRight.x - sizeLine && outlineMiddleLeft.x < pivot.x) {
    shiftX += 1 * directionFactorX;
  } else {
    shiftX -= 1 * directionFactorX;
    changeDirection();
  }
  
  if(pivot.y < outlineMiddleLower.y - sizeLine && outlineMiddleUpper.y < pivot.y) {
    shiftY += 1 * directionFactorY;
  } else {
    shiftY -= 1 * directionFactorY;
    changeDirection();
  }
}

function changeDirection() {
  countSteps = random(300, 500);
  directionFactorX = map(noise(random(0, 10)), 0, 1, -1, 1);
  directionFactorY = map(noise(random(0, 10)), 0, 1, -1, 1);
  oldFrameCount = frameCount;
  background(360, 10);
}

function createLine() {
  beginShape();
  //Line start point
  vertex(lineStart.x, lineStart.y);
  quadraticVertex(
    //control point 1
    controlPoint1.x,
    controlPoint1.y,
    //anchor point middle
    lineMiddle.x,
    lineMiddle.y,
  );
  quadraticVertex(
    //control point 2
    controlPoint2.x,
    controlPoint2.y,
    //anchor point end
    lineEnd.x,
    lineEnd.y,
  );
  endShape();
}