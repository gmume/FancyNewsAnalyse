let rot = 0;
let angle = 0;
let countSteps;
let oldFrameCount;
let directionFactorX;
let directionFactorY;
let angleFactor;
let shiftX;
let shiftY;
let lineStart;
let controlPoint1;
let lineMiddle;
let controlPoint2;
let lineEnd;

let colorSlider;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);

  angleMode(DEGREES);
  noFill();
  stroke(100, 100, 100, 100);
  strokeWeight(1);

  countSteps = random(5, 100);
  oldFrameCount = frameCount;
  shiftX = 1;
  shiftY = 1;
  directionFactorX = 1;
  directionFactorY = 1;
  angleFactor = 1;
  lineStart     = createVector(0, 0);
  controlPoint1 = createVector(random(0, 280), random(0, 280));
  lineMiddle    = createVector(random(0, 280), random(0, 280));
  controlPoint2 = createVector(random(0, 280), random(0, 280));
  lineEnd       = createVector(random(0, 280), random(0, 280));
}

function draw() {

  if(frameCount > oldFrameCount + countSteps) {
    changeDirection();
  }

  translate(width / 2 + shiftX, height / 2 + shiftY);
  rotate(angle % 360);
  createLine();
  shiftX += 1 * directionFactorX;
  shiftY += 1 * directionFactorY;
  angle += 0.3 * angleFactor;
}

function changeDirection() {
  countSteps = random(80, 200);
  directionFactorX = map(noise(random(0, 10)), 0, 1, -1, 1);
  directionFactorY = map(noise(random(0, 10)), 0, 1, -1, 1);
  angleFactor = random([-1, 1]);
  oldFrameCount = frameCount;
}

function createLine() {
  beginShape();
  //Line start point
  vertex(lineStart.x, lineStart.y);

  quadraticVertex(
    //control point 1
    controlPoint1.x, controlPoint1.y,
    //anchor point middle
    lineMiddle.x, lineMiddle.y
  );
  quadraticVertex(
    //control point 2
    controlPoint2.x, controlPoint2.y,
    //anchor point end
    lineEnd.x, lineEnd.y
  );
  endShape();
}
