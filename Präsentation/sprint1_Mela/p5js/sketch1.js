let fps = 5;
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let strokeW = 5;
let rgbX = 1;
let rgbY = 360;
let rgbZ = 180;
let alpha = 100;
let time = 0;
let sinus1;
let sinus2;
let perimeter;

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  background(51);
  frameRate(fps)
  
  noFill();
}

function draw(){
  for (let i = 0; i < 20; i++) {
    sinus = sin(i);
    cosinus = cos(i);
    stroke(rgbX + 5 * i, rgbY - 15 * i, rgbZ + 8 * i, alpha - 0.2 * i);
    strokeWeight(strokeW * random(1));
    perimeter = i * random(1, 30);

    if(i % 2 > 0){
      ellipse(x + i * sinus, y + i * cosinus, perimeter, perimeter);
      ellipse(x + i * -sinus, y + i * -cosinus, perimeter, perimeter);
    }else{
      ellipse(x + i * cosinus, y + i * sinus, perimeter, perimeter);
      ellipse(x + i * -cosinus, y + i * -sinus, perimeter, perimeter);
    }
  }

}