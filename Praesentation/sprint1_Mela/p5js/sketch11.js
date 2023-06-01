let sizeLine;
let countSteps;
let oldFrameCount;

let shiftX;
let shiftY;
let directionFactorX;
let directionFactorY;

let lineStart;
let controlPoint1;
let lineMiddle;
let controlPoint2;
let lineEnd;

let pivot;
let viewMiddle;
let minX;
let maxX;
let minY;
let maxY;

function setup() {
  createCanvas(400, 500);
  noFill();
  strokeWeight(1);
  background(230);

  frameRate(500);
  sizeLine = 150;
  countSteps = random(300, 500);
  oldFrameCount = frameCount;

  shiftX = 1;
  shiftY = 1;
  directionFactorX = 1;
  directionFactorY = 1;

  lineStart     = createVector(0, 0);
  controlPoint1 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineMiddle    = createVector(random(0, sizeLine), random(0, sizeLine));
  controlPoint2 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineEnd       = createVector(random(0, sizeLine), random(0, sizeLine));

  pivot = createVector(0, 0);
  minX = (pivot.x - width  / 2) * 0.9;
  maxX = (pivot.x + width  / 2) * 0.9;
  minY = (pivot.y - height / 2) * 0.9;
  maxY = (pivot.y + height / 2) * 0.9;
  viewMiddle = createVector(0, 0);
  // minX = (viewMiddle.x - width  / 2) * 0.9;
  // maxX = (viewMiddle.x + width  / 2) * 0.9;
  // minY = (viewMiddle.y - height / 2) * 0.9;
  // maxY = (viewMiddle.y + height / 2) * 0.9;
}

function draw() {

  if (frameCount > oldFrameCount + countSteps) {
    changeDirection();
  }

  frameRate(300);
  stroke(100, 60);
  translate(width / 2 + shiftX, height / 2 + shiftY);
  createLine();
  
  push();
  stroke(255, 69, 0, 20);
  
  //box
  line(       0,        0, sizeLine,        0);
  line(sizeLine,        0, sizeLine, sizeLine);
  line(sizeLine, sizeLine,        0, sizeLine);
  line(       0, sizeLine,        0,        0);
  
  strokeWeight(2);
  
  //view middle
  viewMiddle = createVector(pivot.x - shiftX, pivot.y - shiftY);
  point(viewMiddle);
  
  push();
  stroke(0,153,0, 200);
  line(viewMiddle.x, viewMiddle.y, pivot.x, pivot.y);
  let outlineMiddleRight = createVector(maxX - shiftX, minY - shiftY + height / 2 * 0.9);
  let outlineMiddleLeft = createVector(minX - shiftX, minY - shiftY + height / 2 * 0.9);
  let outlineMiddleLower = createVector(minX - shiftX + width / 2 * 0.9, maxY - shiftY);
  let outlineMiddleUpper = createVector(minX - shiftX + width / 2 * 0.9, minY - shiftY);
  pop();
  
  //outlines
  line(minX - shiftX, minY - shiftY, maxX - shiftX, minY - shiftY); //upper line
  line(maxX - shiftX, minY - shiftY, maxX - shiftX, maxY - shiftY); //right line
  line(maxX - shiftX, maxY - shiftY, minX - shiftX, maxY - shiftY); //lower line
  line(minX - shiftX, maxY - shiftY, minX - shiftX, minY - shiftY); //left line
  
  pop();

  if(pivot.x < outlineMiddleRight.x - sizeLine && outlineMiddleLeft.x < pivot.x) {
    console.log("x+");
    shiftX += 1 * directionFactorX;
  } else {
    shiftX -= 1 * directionFactorX;
    changeDirection();
    console.log("x-");
  }
  
  if(pivot.y < outlineMiddleLower.y - sizeLine && outlineMiddleUpper.y < pivot.y) {
    console.log("y+");
    shiftY += 1 * directionFactorY;
  } else {
    shiftY -= 1 * directionFactorY;
    changeDirection();
    console.log("y-");
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

  push();
  stroke('red');
  strokeWeight(2);
  point(lineStart.x, lineStart.y);
  pop();
}
