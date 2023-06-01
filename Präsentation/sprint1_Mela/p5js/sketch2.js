let fps = 20;
let x;
let y;
let angle;
let slider;

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  
  frameRate(fps);

  x = window.innerWidth / 2;
  y = window.innerHeight / 2;
  angle = 0;
  slider = createSlider(0, 2, 1, 0.1)
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw(){
  
  clear();
  background(51);
  fill(100, 200, 40, 100);

  // x = newAngle(x);
  // print(x);
  // y = newAngle(y);
  print(y * slider);
  ellipse(x, y, y * slider.value(), y * slider.value());

  angle++;
}

function newAngle(){

  return sin(angle);
}