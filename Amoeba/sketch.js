var zhue = 0;
var zpos = 0;
var points = [];

var numPoints = 200;
var angleGap;

var bgColor;

function setup() {
  createCanvas(700, 700, WEBGL);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  
  angleGap = 360 / numPoints;
  
  bgColor = color('#141636');
}

function draw() {
  background(bgColor);
 
  points = [];
  
  let firstPoint;
  
  // Main Shape
  beginShape();
  
  // This colour will "shine" from centre 
  fill(40, 100, 100);
  
  // Draw one vertex in middle of canvas to start and end shape, 
  // so that the gradient fill will "aim" towards there instead of 
  // to one side of the shape 
  vertex(0,0)
  
  for (let i = 0; i < numPoints; i++){
    let a = angleGap * i;
    let nx = 600 + sin(a) * 0.3;   // nx and ny pos for noisy angle jitter
    let ny = 600 + cos(a) * 0.3;
    
    let r = 300 + map(noise(nx, ny, zpos), 0, 1, -300, 200);
     
    nx = 1600 + sin(a) * 0.9;    // nx and ny pos for noisy hue jitter 
    ny = 1600 + cos(a) * 0.9;    
    
    let h = map(noise(nx, ny, zhue), 0, 1, 150, 350);
    
    let x = sin(a) * r;     // actual x and y to draw 
    let y = cos(a) * r;
  
    if (i == 0){             
      firstPoint = {      
        x: x,
        y: y,
        h: h
      }
    }   
    
    points[i] = {
      x: sin(a) * r * 0.2,   // Saving smaller version of x and y
      y: cos(a) * r * 0.2    // to draw smaller inner shape in bg color
    }                        // to cover the bit where the gradient all joins together 
    
    fill(h, 95, 100);
    vertex(x, y);
  }

  fill(firstPoint.h, 95, 100)
  vertex(firstPoint.x, firstPoint.y);  // First / Last outer point
  vertex(0, 0);                         // End shape in centre so gradient aims there
  endShape(CLOSE);
   
  
  // Inner Shape 
  fill(bgColor);
  beginShape();
  for (let p of points){
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
  
  // To animate through noise
  zpos+= 0.003;
  zhue+= 0.008;
  
}