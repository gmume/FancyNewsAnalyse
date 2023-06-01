let sizeLine;
let angle = 0;
let countSteps;
let oldFrameCount;
let shiftX;
let shiftY;
let directionFactorX;
let directionFactorY;
let angleFactor;
let pivot;
let lineStart;
let controlPoint1;
let lineMiddle;
let controlPoint2;
let lineEnd;

function setup() {
  createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9);
  frameRate(200);
  angleMode(DEGREES);
  noFill();
  strokeWeight(1);
  background(360);

  sizeLine = 280;
  countSteps = random(5, 100);
  oldFrameCount = frameCount;
  shiftX = 1;
  shiftY = 1;
  directionFactorX = 1;
  directionFactorY = 1;
  angleFactor = 1;
  pivot = createVector(0, 0);
  lineStart     = createVector(0, 0);
  controlPoint1 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineMiddle    = createVector(random(0, sizeLine), random(0, sizeLine));
  controlPoint2 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineEnd       = createVector(random(0, sizeLine), random(0, sizeLine));
}

function draw() {
  if (frameCount > oldFrameCount + countSteps) {
    changeDirection();
  }

  stroke(map(noise(frameCount), 0, 1, 0, 100) % 100, angle % 100, angle % 100, 60);
  translate(width / 2 + shiftX, height / 2 + shiftY);
  rotate(angle % 360);
  createLine();

  if(shiftX + 1 * directionFactorX < width / 2 - sizeLine * 2.2 && shiftX + 1 * directionFactorX >  sizeLine * 2.2 - width / 2) {
    shiftX += 1 * directionFactorX;
  } else {
    shiftX -= 1 * directionFactorX;
  }
  
  if(shiftY + 1 * directionFactorY < height / 2 - sizeLine * 2.2 && shiftY + 1 * directionFactorY >   sizeLine * 2.2 - height / 2) {
    shiftY += 1 * directionFactorY;
  } else {
    shiftY -= 1 * directionFactorY;
  }
  
  angle += 0.3 * angleFactor;
}

function changeDirection() {
  countSteps = random(100, 300);
  directionFactorX = map(noise(random(0, 10)), 0, 1, -1, 1);
  directionFactorY = map(noise(random(0, 10)), 0, 1, -1, 1);
  angleFactor = random([-1, 0, 1]);
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
