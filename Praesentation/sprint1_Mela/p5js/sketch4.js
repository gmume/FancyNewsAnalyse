// let distanceFactor = 1.5;
let counter = 1;
let line1;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);

  background(0);
  frameRate(3);
  stroke(100, 100, 100, 100);
  strokeWeight(2);
    
  line1 = new myLine();
}

function draw(){
  line1.draw();
  line1.moveHorizontal();
}

class myLine {

  constructor() {
    this.vec1 = createVector(width / 2 - width / 4 , height / 2);
    this.vec2 = createVector(width / 2 + width / 4 , height / 2);
  }

  moveHorizontal() {
    
    this.vec1 = applyMatrix(
        100, 100,
        1, 1,
        0, 0
      );
  }

  draw() {
    return line(this.vec1.x, this.vec1.y, this.vec2.x, this.vec2.y);
  }
}