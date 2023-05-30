let c;

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
let colScale;
let firstPoint;

const sketch3D = function (p5) {
  p5.setup = function () {
    setupCanvas(p5);

    cWEBGL = p5.createGraphics(p5.width, p5.height, p5.WEBGL);
    cWEBGL.setAttributes("alpha", true);

    //amoeba
    cWEBGL.angleMode(p5.DEGREES);
    cWEBGL.colorMode(cWEBGL.HSB, 360, 100, 100, 100);
    cWEBGL.noStroke();

    angleGap = 360 / numPoints;
    colScale = d3.scaleLinear().domain([-10, 0, 10]).range([
      "red",
      "blue",
      "yellow",
      "ornage",
    ]);
  p5.draw = function () {
  };
};

const sketch3D = function (p5) {
  p5.setup = function () {
    // setupCanvas(p5, this);

    const c = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);

    c.style("top", "0px");
    c.style("left", "0px");
    c.style("pointer-events", "none");
    c.style("position", "fixed");
    c.style("z-index", "99999999");

    proportion = new Proportion(p5);
    colorManager = new Colors();
    colorList = colorManager.getColors();

    //amoeba
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB, 360, 100, 100, 100);
    p5.noStroke();

    angleGap = 360 / numPoints;
    bgColor = p5.color("#141636");
  };

  p5.draw = function () {
    c.clear();
    cWEBGL.clear();

    //amoeba
    // Main Shape
    cWEBGL.beginShape();

    // This color will "shine" from centre
    cWEBGL.fill(40, 100, 100);

    // Draw one vertex in middle of canvas to start and end shape,
    // so that the gradient fill will "aim" towards there instead of
    // to one side of the shape
    cWEBGL.vertex(0, 0);

    for (let i = 0; i < numPoints; i++) {
      let a = angleGap * i;
      let nx = 600 + cWEBGL.sin(a) * 0.3; // nx and ny pos for noisy angle jitter
      let ny = 600 + cWEBGL.cos(a) * 0.3;
      let r = 300 + cWEBGL.map(p5.noise(nx, ny, zpos), 0, 1, -300, 200);

      nx = 1600 + cWEBGL.sin(a) * 0.9; // nx and ny pos for noisy hue jitter
      ny = 1600 + cWEBGL.cos(a) * 0.9;

      let h = cWEBGL.map(cWEBGL.noise(nx, ny, zhue), 0, 1, 150, 350);
      let x = cWEBGL.sin(a) * r; // actual x and y to draw
      let y = cWEBGL.cos(a) * r;

      if (i == 0) {
        firstPoint = {
          x: x,
          y: y,
          h: h,
        };
      }

      points[i] = {
        x: cWEBGL.sin(a) * r * 0.2, // Saving smaller version of x and y
        y: cWEBGL.cos(a) * r * 0.2, // to draw smaller inner shape in bg color
      }; // to cover the bit where the gradient all joins together

      cWEBGL.fill(h, 95, 100);
      cWEBGL.vertex(x, y);
    }

    cWEBGL.fill(firstPoint.h, 95, 100);
    cWEBGL.vertex(firstPoint.x, firstPoint.y); // First / Last outer point
    cWEBGL.vertex(0, 0); // End shape in centre so gradient aims there
    cWEBGL.endShape(cWEBGL.CLOSE);

    // Inner Shape
    cWEBGL.fill(p5.color("black"));
    cWEBGL.beginShape();
    for (let p of points) {
      cWEBGL.vertex(p.x, p.y);
    }
    cWEBGL.endShape(cWEBGL.CLOSE);

    // To animate through noise
    zpos += 0.003;
    zhue += 0.008;

    p5.image(cWEBGL, 0, 0);
  };
};

const setupCanvas = function (p5) {
  c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
  c.style("top", "0px");
  c.style("left", "0px");
  c.style("pointer-events", "none");
  c.style("position", "fixed");
  c.style("z-index", "99999999");
};

new p5(sketch3D);
// new p5(sketch2D);
