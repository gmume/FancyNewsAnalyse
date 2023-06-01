let sizeLine;
let countSteps;
let oldFrameCount;

let angle = 0;
let angleFactor;
let shiftX;
let shiftY;
let directionFactorX;
let directionFactorY;

let lineStart;
let controlPoint1;
let lineMiddle;
let controlPoint2;
let lineEnd;

let sliderAngle;
let sliderCountStepsMin;
let sliderCountStepsMax;
let sliderSpeed;

let viewMiddle;
let minX;
let maxX;
let minY;
let maxY;

function setup() {
  // createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9);
  createCanvas(230, 250);
  angleMode(DEGREES);
  noFill();
  strokeWeight(1);
  background(230);

  group = createDiv('');
  group.position(30, 30);  
  
  sliderAngle = createSlider(0.0, 0.5, 0.3, 0.1);
  sliderAngle.style('width', '80px');
  sliderAngle.parent(group);
  labelSliderAngle = createSpan("angle&#8195");
  labelSliderAngle.parent(group);
  
  sliderCountStepsMin = createSlider(10, 200, 100, 10);
  sliderCountStepsMin.style('width', '80px');
  sliderCountStepsMin.parent(group);
  labelSliderCountStepsMin = createSpan("min step&#8195");
  labelSliderCountStepsMin.parent(group);

  sliderCountStepsMax = createSlider(200, 500, 300, 10);
  sliderCountStepsMax.style('width', '80px');
  sliderCountStepsMax.parent(group);
  labelSliderCountStepsMax = createSpan("max step&#8195");
  labelSliderCountStepsMax.parent(group);

  sliderSpeed = createSlider(10, 100, 100, 10);
  sliderSpeed.style('width', '80px');
  sliderSpeed.parent(group);
  labelSliderSpeed = createSpan('speed');
  labelSliderSpeed.parent(group);

  // frameRate(sliderSpeed.value());
  frameRate(500);
  sizeLine = 40;
  countSteps = random(sliderCountStepsMin.value(), sliderCountStepsMax.value());
  oldFrameCount = frameCount;

  angleFactor = 1;
  shiftX = 1;
  shiftY = 1;
  directionFactorX = 1;
  directionFactorY = 1;

  lineStart     = createVector(0, 0);
  controlPoint1 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineMiddle    = createVector(random(0, sizeLine), random(0, sizeLine));
  controlPoint2 = createVector(random(0, sizeLine), random(0, sizeLine));
  lineEnd       = createVector(random(0, sizeLine), random(0, sizeLine));

  viewMiddle    = createVector(0, 0);
  minX = (viewMiddle.x - width  / 2) * 0.9;
  maxX = (viewMiddle.x + width  / 2) * 0.9;
  minY = (viewMiddle.y - height / 2) * 0.9;
  maxY = (viewMiddle.y + height / 2) * 0.9;
}

function draw() {
  //background(230);

  if (frameCount > oldFrameCount + countSteps) {
    changeDirection();
  }

  frameRate(sliderSpeed.value());
  stroke(map(noise(frameCount), 0, 1, 0, 100) % 100, angle % 100, angle % 100, 60);
  translate(width / 2 + shiftX, height / 2 + shiftY);
  //rotate(angle % 360);
  createLine();
  
  push();
  stroke(255, 69, 0, 6);
  
  //box
  line(0, 0, sizeLine, 0);
  line(sizeLine, 0, sizeLine, sizeLine);
  line(sizeLine, sizeLine, 0, sizeLine);
  line(0,sizeLine, 0, 0);
  
  strokeWeight(2);
  
  //view middle
  point(viewMiddle.x - shiftX, viewMiddle.y - shiftY);
  
  //canvas 0
  point(0, 0);
  
  //outlines
  line(minX - shiftX, minY - shiftY, maxX - shiftX, minY - shiftY);
  line(maxX - shiftX, minY - shiftY, maxX - shiftX, maxY - shiftY);
  line(maxX - shiftX, maxY - shiftY, minX - shiftX, maxY - shiftY);
  line(minX - shiftX, maxY - shiftY, minX - shiftX, minY - shiftY);
  
  pop();
  
  let newShiftX = shiftX + 1 * directionFactorX;
  let translateX = width / 2 + newShiftX;

  if(minX - sizeLine < translateX) {
    console.log("x+");
    shiftX += 1 * directionFactorX;
  } else if( translateX < maxX - sizeLine) {
    shiftX += 1 * directionFactorX;
  } else {
    shiftX -= 1 * directionFactorX;
    console.log("x-");
  }
  
  let newShiftY = shiftY + 1 * directionFactorY;
  let translateY = height / 2 +  newShiftY;
  
  if(minY - sizeLine < translateY) {
    console.log("y+");
    shiftY += 1 * directionFactorY;
  } else if(translateY < maxY - sizeLine) {
    shiftY += 1 * directionFactorY;
  } else {
    shiftY -= 1 * directionFactorY;
    console.log("y-");
  }

  // console.log("minX: "+minX+", translateX: "+translateX+", maxX: "+maxX);
  
  angle += sliderAngle.value() * angleFactor;
}

function changeDirection() {
  countSteps = random(sliderCountStepsMin.value(), sliderCountStepsMax.value());
  directionFactorX = map(noise(random(0, 10)), 0, 1, -1, 1);
  directionFactorY = map(noise(random(0, 10)), 0, 1, -1, 1);
  //angleFactor = random([-1, 0, 1]);
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
