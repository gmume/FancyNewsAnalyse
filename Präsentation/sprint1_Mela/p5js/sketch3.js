let widthW = window.innerWidth;
let heightW = window.innerHeight;
let vec = [];
let distanceFactor = 1.5;
let counter = 0;


function setup(){
  createCanvas(widthW, heightW);

  background(0);
  frameRate(20);
  stroke(100, 100, 100);
  strokeWeight(3);

  for(let i = 0; i <= 99; i += 2){

    vec[i] = createVector(widthW / 2 - widthW / 4 , addVerticalDistance(i));
    vec[i + 1] = createVector(widthW / 2 + widthW / 4 , addVerticalDistance(i));
    
    line(vec[i].x, vec[i].y, vec[i + 1].x, vec[i + 1].y);
  }
}

function draw(){

}

function addVerticalDistance(i){
  let distance = heightW / 1.5 - i * distanceFactor;

  if(counter % 2 > 0){
    distanceFactor += 0.2;
  }
  
  counter++;
  return distance;
}