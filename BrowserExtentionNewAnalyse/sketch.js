let loremIpsumManager;
let loremIpsumText;
let proportion;
let colorManager;
let colorList;
let fontsManager;
let fontsList;

//amoeba
let cWEBGL;
let zhue = 0;
let zpos = 0;
let points = [];
let numPoints = 200;
let angleGap;
let bgColor;

const sketch = function (p5) {
  p5.setup = function () {
    setupCanvas();

    loremIpsum = new LoremIpsum(p5);
    proportion = new Proportion(p5);
    colorManager = new Colors();
    colorList = colorManager.getColors();
    fontsManager = new FontsUsed(p5);
    fontsList = fontsManager.getFonts();

    p5.rectMode(p5.CENTER);
    p5.textSize(20);
    p5.fill(255, 0, 0);

    // //create dummy text in the length of the websites chars count
    // loremIpsum.createTextField();

    // //draw shapes in proportion of text to images of website
    // proportion.draw();

    // p5.textFont(fontsList[0]);
    // fontsManager.showFonts();

    // for (let i = 0; i < colorList.length; i++) {
    //   p5.fill(p5.color(colorList[i]));
    //   p5.rect(p5.width / i, 0, p5.width / colorList.length, p5.height / 10);
    // }

    //amoeba
    // p5.angleMode(p5.DEGREES);
    // p5.colorMode(p5.HSB, 360, 100, 100, 100);
    // p5.noStroke();

    angleGap = 360 / numPoints;
    bgColor = p5.color("#141636");
  };

  p5.draw = function () {
    p5.clear(0, 0, 0, 0);

    //create dummy text in the length of the websites chars count
    loremIpsum.createTextField();

    //draw shapes in proportion of text to images of website
    proportion.draw();

    p5.textFont(fontsList[0]);
    fontsManager.showFonts();

    for (let i = 0; i < colorList.length; i++) {
      p5.fill(p5.color(colorList[i]));
      p5.rect(p5.width / i, 0, p5.width / colorList.length, p5.height / 10);
    }

    //amoeba
    p5.push();
    // cWEBGL = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    p5.noStroke();
    
    points = [];
    let firstPoint;

    // Main Shape
    p5.beginShape();

    // This colour will "shine" from centre
    p5.fill(40, 100, 100);

    // Draw one vertex in middle of canvas to start and end shape,
    // so that the gradient fill will "aim" towards there instead of
    // to one side of the shape
    p5.vertex(0, 0);

    for (let i = 0; i < numPoints; i++) {
      let a = angleGap * i;
      let nx = 600 + p5.sin(a) * 0.3; // nx and ny pos for noisy angle jitter
      let ny = 600 + p5.cos(a) * 0.3;
      let r = 300 + p5.map(p5.noise(nx, ny, zpos), 0, 1, -300, 200);

      nx = 1600 + p5.sin(a) * 0.9; // nx and ny pos for noisy hue jitter
      ny = 1600 + p5.cos(a) * 0.9;

      let h = p5.map(p5.noise(nx, ny, zhue), 0, 1, 150, 350);
      let x = p5.sin(a) * r; // actual x and y to draw
      let y = p5.cos(a) * r;

      if (i == 0) {
        firstPoint = {
          x: x,
          y: y,
          h: h,
        };
      }

      points[i] = {
        x: p5.sin(a) * r * 0.2, // Saving smaller version of x and y
        y: p5.cos(a) * r * 0.2, // to draw smaller inner shape in bg color
      }; // to cover the bit where the gradient all joins together

      p5.fill(h, 95, 100);
      p5.vertex(x, y);
    }

    p5.fill(firstPoint.h, 95, 100);
    p5.vertex(firstPoint.x, firstPoint.y); // First / Last outer point
    p5.vertex(0, 0); // End shape in centre so gradient aims there
    p5.endShape(p5.CLOSE);

    // Inner Shape
    p5.fill(bgColor);
    p5.beginShape();
    for (let p of points) {
      p5.vertex(p.x, p.y);
    }
    p5.endShape(p5.CLOSE);

    // To animate through noise
    zpos += 0.003;
    zhue += 0.008;

    p5.pop();
  };

  // function setupCanvasWEBGL() {
  //   cWEBGL = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
  //   cWEBGL.style("top", "0px");
  //   cWEBGL.style("left", "0px");
  //   cWEBGL.style("pointer-events", "none");
  //   cWEBGL.style("position", "fixed");
  //   cWEBGL.style("z-index", "99999999");
  // }

  function setupCanvas() {
    let c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.style("top", "0px");
    c.style("left", "0px");
    c.style("pointer-events", "none");
    c.style("position", "fixed");
    c.style("z-index", "99999999");
  }
};

let my_sketch = new p5(sketch);
