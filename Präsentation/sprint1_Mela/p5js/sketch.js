let sizeLine;

let directionX, directionY;
let maxShiftX, maxShiftY;

let vieMiddle;
let minX, maxX, minY, maxY;

let lineStart, lineControl1, lineMiddle, lineControl2, lineEnd; //lineStart = pivot point

let path = [];
let pathStart, pathControl1, pathControl2, pathEnd;
let nextSectionEnd;
let steps, step;
let stepCoord;
let stepX, stepY;

function setup() {
  createCanvas(400, 500);
  noFill();
  stroke(100, 60);
  strokeWeight(1);
  background(230, 230, 230, 100);
  frameRate(500);
  
  setupCanvasAdjustment();
  setupLine();
  setupPath();
  createPath();
  setupBoundaries();
  adjustBoundaries();
}

function draw() {

  adjustBoundaries();
  translate(width / 2 + stepX, height / 2 + stepY);
  point(lineStart);
  
  if(steps > 0) {
    steps--;
  } else {
    dontCrossBoundaries();
    createPath();
  }
}

function setupCanvasAdjustment() {
  directionX = random([-1, 1]);
  directionY = random([-1, 1]);
  maxShiftX = sizeLine * directionX;
  maxShiftY = sizeLine * directionY;
}

function setupBoundaries() {
  minX = width  / 2 - width  / 2 * 0.9;
  maxX = width  / 2 + width  / 2 * 0.9;
  minY = height / 2 - height / 2 * 0.9;
  maxY = height / 2 + height / 2 * 0.9;

  adjustBoundaries();
}

function setupLine() {
  sizeLine = 150;
  lineStart    = createVector(0, 0);
  lineControl1 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineMiddle   = createVector(random(0, sizeLine), random(0, sizeLine));
  lineControl2 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineEnd      = createVector(random(0, sizeLine), random(0, sizeLine));
}

function setupPath() {
  pathStart = createVector(0, 0);
  pathEnd  = createVector(sizeLine, sizeLine);
  nextSectionEnd = pathEnd;
  steps = sizeLine;

  createPath();
}

function createPath() {  
  pathControl1 = createVector(random(pathStart.x, nextSectionEnd.x), random(pathStart.y, nextSectionEnd.y));
  pathControl2 = createVector(random(pathStart.x, nextSectionEnd.x), random(pathStart.y, nextSectionEnd.y));
  pathEnd      = createVector(random(pathStart.x, nextSectionEnd.x), random(pathStart.y, nextSectionEnd.y));
  steps = sizeLine;
  
  for (let i = 0; i <= steps; i++) {
    step = i / steps;
    path[i] = createVector(bezierPoint(pathStart.x, pathControl1.x, pathControl2.x, pathEnd.x, step), bezierPoint(pathStart.y, pathControl1.y, pathControl2.y, pathEnd.y, step));
  }
}

function dontCrossBoundaries() {
  directionX = random([-1, 1]);
  directionY = random([-1, 1]);
  pathStart = createVector(pathEnd.x, pathEnd.y);
  nextSectionEnd = pathStart.x + sizeLine * directionX, pathStart.y + sizeLine * directionY;

  if(nextSectionEnd.x > minX - sizeLine && maxX > nextSectionEnd.x) {
    directionX * (-1);
  }
  
  if(nextSectionEnd.y > minY - sizeLine && maxY > nextSectionEnd.y) {
    directionY * (-1);
  }
}

function adjustBoundaries() {
  stepCoord = path[sizeLine - steps];
  stepX     = stepCoord.x;
  stepY     = stepCoord.y;

  push();
  stroke('yellow');
  strokeWeight(3);
  line(minX, minY, maxX, minY);
  line(maxX, minY, maxX, maxY);
  line(maxX, maxY, minX, maxY);
  line(minX, maxY, minX, minY);

  stroke('red');
  vieMiddle = createVector(width / 2, height / 2);
  point(vieMiddle);
  pop();
}

function createLine() {
  beginShape();
  //Line start point
  vertex(lineStart.x, lineStart.y);
  quadraticVertex(
    //control point 1
    lineControl1.x,
    lineControl1.y,
    //anchor point middle
    lineMiddle.x,
    lineMiddle.y,
  );
  quadraticVertex(
    //control point 2
    lineControl2.x,
    lineControl2.y,
    //anchor point end
    lineEnd.x,
    lineEnd.y,
  );
  endShape();
}