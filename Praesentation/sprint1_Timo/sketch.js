let x = 100;
let y = 100;
let squaresize = 1000 / 5 - 7;
let rot = 0;
let keyCount = 0;
let rad = 1;
let tf = false;

function setup() {
  createCanvas(1000, 1000);
  rectMode(CENTER);
  background("white");
  angleMode(DEGREES);
  colorMode(HSB);
}

let farbe = document.querySelector("#farbe");
let konturdicke = document.querySelector("#konturdicke")
let konturfarbe = document.querySelector("#konturfarbe")
let helligkeit = document.querySelector("#helligkeit")
let saettigung = document.querySelector("#saettigung")


let clicked = false;

function draw() {
  let col = farbe.value;
  let str = konturdicke.value;
  let strcol = konturfarbe.value;
  let brightness = helligkeit.value;
  let saturation = saettigung.value;

  let pos = width / 5;
  let size = width / 50;

  console.log(str );
console.log(sin(1))

  stroke(strcol,100-saturation, 100-brightness);
  noFill();
  strokeWeight(str, 100, 100);
  background(col, saturation, brightness);

  if (keyCount % 2 == 0) {
    tf = false;
  } else {
    tf = true;
  }

  if (tf == false) {
    rad = rad - 1;
    if (rad < 1) {
      rad = 1
    }
  } else {
    rad = rad + 1;
    if (rad > 100) {
      rad = 100;
    }
  }

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      for (let i = 0; i < 10; i++) {
        if (x == 1 && y == 3) {
          if (i !== 0) {
            if (clicked) {
              push();
              translate(x * pos + 100, y * pos + 100);
              rotate(rot);
              rect(0, 0, (i + 1) * size, (i + 1) * size, rad);
              pop();
            } else {
              noFill();
              push();
              translate(x * pos + 100, y * pos + 100);
              rotate(rot);
              rect(0, 0, (i + 1) * size);
              pop();
            }
          }
        } else if (x == 1 && y == 2) {
          if (i !== 1) {
            if (clicked) {
              push();
              translate(x * pos + 100, y * pos + 100);
              rotate(rot);
              rect(0, 0, (i + 1) * size, (i + 1) * size, rad);
              pop();
            } else {
              noFill();
              push();
              translate(x * pos + 100, y * pos + 100);
              rotate(rot);
              rect(0, 0, (i + 1) * size);
              pop();
            }
          }
        } else if (x == 2 && y == 2) {
          if (i !== 3) {
            if (clicked) {
              push();
              translate(x * pos + 100, y * pos + 100);
              rotate(rot);
              rect(0, 0, (i + 1) * size, (i + 1) * size, rad);
              pop();
            } else {
              noFill();
              push();
              translate(x * pos + 100, y * pos + 100);
              rotate(rot);
              rect(0, 0, (i + 1) * size);
              pop();
            }
          }
        } else {
          if (clicked) {
            push();
            translate(x * pos + 100, y * pos + 100);
            rotate(rot);
            rect(0, 0, (i + 1) * size, (i + 1) * size, rad);
            pop();
          } else {
            noFill();
            push();
            translate(x * pos + 100, y * pos + 100);
            rotate(rot);
            rect(0, 0, (i + 1) * size);
            pop();
          }
        }
      }
    }
  }
  console.log(tf);
  console.log(keyCount);

  rot = rot + 0.5;
  push();
  colorMode(RGB)
  noStroke();
  fill(255,0,150)
  rect(145, height - 15, 280,20)
  fill(255);
  textSize(15);
  text("play: w | stop: e | morph: f while playing", 10, height - 10); 
  pop();
}

function mouseClicked(fxn) {
  clicked = !clicked;
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("quadrate", "png");
  }

  if (key === "f") {
    keyCount++;
  }

  if (key === "w") {
    noLoop();
  } else if (key === "e") {
    loop();
  }
}
