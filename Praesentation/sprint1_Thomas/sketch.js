function setup() {
    //createCanvas(800, 800);
    createCanvas(windowWidth, windowHeight)

    slider = createSlider(0, 720, 0);
    slider.position(10, 10);
    slider.style('width', '100px');

    slider_s = createSlider(0, 8, 0, 0.1);
    slider_s.position(10, 40);
    slider_s.style('width', '100px');

    slider_r = createSlider(0, 200, 0);
    slider_r.position(10, 70);
    slider_r.style('width', '100px');

    slider_c = createSlider(0, 255, 0);
    slider_c.position(10, 100);
    slider_c.style('width', '100px');

    slider_w = createSlider(0, 8, 0);
    slider_w.position(10, 130);
    slider_w.style('width', '100px');

  }
  
  function draw() {

    let val = slider.value();
    let val_s = slider_s.value();
    let val_r = slider_r.value();
    let val_c = slider_c.value();
    let val_w = slider_w.value();
    
    background(val_c, val_c, val_c);
    noFill();
    stroke(225,0,0);
    let s = 20;
  
    rectMode(CENTER);
    angleMode(DEGREES);
    randomSeed(99);
    let maxDist = dist(0,0, width, height); // maximale Distanz zum Zentrum
    for (let x = 0; x < width; x += s) {
      for (let y = 0; y < height; y += s) {
        let ra2 = int(random(-1*val_s, val_s));
        let ra = int(random(-1*val_r, val_r));
        let ra_w = int(random(-1*val_w, val_w));

        let distToCenter = dist(x, y, mouseX, mouseY);
        let rotation = map(distToCenter, 0, maxDist,val, 0); // Rotation basierend auf Distanz zum Zentrum
        let scaling = map(distToCenter, 0, maxDist,1, 0.5)
        let ra_ro = map(distToCenter, 0, maxDist,ra, 0)
        let ra_sc = map(distToCenter, 0, maxDist,ra2, 0)
        let ra_we = map(distToCenter, 0, maxDist,1, ra_w)

        push();
        translate(x + s/2, y + s/2); 
        rotate(rotation+ra_ro); // Rotation anwenden
        scale(scaling+ra_sc)
        strokeWeight(ra_we)
        rect(0, 0, s, s);
        pop();
      }
    }
noStroke();

    textSize(15);
    fill(255);
    text('rotation', 120, 20); 

    textSize(15);
    fill(255); 
    text('scaling', 120, 50); 

    textSize(15);
    fill(255); 
    text('rotation', 120, 80); 

    textSize(15);
    fill(255); 
    text('background', 120, 110);
     
    textSize(15);
    fill(255); 
    text('stroke', 120, 140);
  }