let rot = 0;
let angle = 0;
let countSteps;
let oldFrameCount;
let directionFactorX;
let directionFactorY;
let shiftX;
let shiftY;
let lineStart;
let controlPoint1;
let lineMiddle;
let controlPoint2;
let lineEnd;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(200);
  stroke("black");
  strokeWeight(5);
  angleMode(DEGREES);
  noFill();
  stroke(100, 100, 100, 100);
  strokeWeight(1);

  // countSteps = random(5, 100);
  // oldFrameCount = frameCount;
  // shiftX = 1;
  // shiftY = 1;
  // directionFactorX = 1;
  // directionFactorY = 1;
  // lineStart     = createVector(0, 0);
  lineStart     = createVector(random(0, 250), random(0, 250));
  controlPoint1 = createVector(random(0, 250), random(0, 250));
  lineMiddle    = createVector(random(0, 250), random(0, 250));
  controlPoint2 = createVector(random(0, 250), random(0, 250));
  lineEnd       = createVector(random(0, 250), random(0, 250));
}

function draw() {

  // if(frameCount > oldFrameCount + countSteps) {
  //   changeDirection();
  // }

  // translate(width / 2 + shiftX, height / 2 + shiftY);
  translate(width / 2, height / 2);
  rotate(angle % 360);
  createLine();
  // shiftX += 1 * directionFactorX;
  // shiftY += 1 * directionFactorY;
  angle += 0.3;
}

function changeDirection() {
  countSteps = random(20, 100);
  directionFactorX = random([-1, 1]);
  directionFactorY = random([-1, 1]);
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
