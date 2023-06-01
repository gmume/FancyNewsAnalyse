let points;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);

  background(0);
  frameRate(3);
  stroke(100, 100, 100, 100);
  strokeWeight(2);
  let yOff = 0.0;
    
  vectors = [];

  for (let i = 0; i <= 100; i++) {
    vectors[i] = createVector(width / 4 + i * 2, height / 2, 0);
    vectors[i].y += noise(yOff) * 300;
    yOff += 0.01;
  }
}

function draw(){
  for (let i = 0; i < vectors.length; i++) {
    point(vectors[i]);
  }
}
