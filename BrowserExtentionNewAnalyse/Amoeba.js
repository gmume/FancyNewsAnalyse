class Amoeba {
  constructor(p5, d3, proportion, colors) {
    this.p5 = p5;
    this.d3 = d3;
    this.proportion = proportion;
    this.AllColors = colors;

    this.cWEBGL;
    this.zhue = 0;
    this.zpos = 0;
    this.points = [];
    this.numPoints = 200;
    this.angleGap;
    this.colScale;
    this.firstPoint;
    this.colCenterX = -300;
    this.colCenterY = 100;
    this.colTheta = 0;
    this.grayCenterX = 250;
    this.grayCenterY = -200;
    this.grayTheta = 0;
    this.scale;
    this.colorsCount = [];
    this.greyCount = [];
    this.colors = [];
    this.greys = [];

    this.setup();
  }

  setup() {
    this.cWEBGL = this.p5.createGraphics(
      this.p5.width,
      this.p5.height,
      this.p5.WEBGL,
    );

    this.cWEBGL.setAttributes("alpha", true);
    this.cWEBGL.angleMode(this.p5.DEGREES);
    this.cWEBGL.noStroke();

    let colCount = 0;
    let grCount = 0;

    this.AllColors.forEach(color => {
      let currentColor = this.cWEBGL.color(color);

      this.cWEBGL.push();
      this.cWEBGL.colorMode(this.cWEBGL.HSB, 360, 100, 100, 100);

      if(this.cWEBGL.saturation(currentColor) > 20) {
        this.colors.push(color);
        this.colorsCount.push(colCount);
        colCount += 1;
      } else {
        this.greys.push(color);
        this.greyCount.push(grCount);
        grCount += 1;
      }

      this.cWEBGL.pop();
    });

    this.angleGap = 360 / this.numPoints;
    this.colScale = this.d3
      .scaleLinear()
      .domain(this.colorsCount)
      .range(this.colors);
      
    this.greyScale = this.d3
      .scaleLinear()
      .domain(this.greyCount)
      .range(this.greys);
  }

  draw() {
    this.cWEBGL.clear();

    if (this.proportion.getTextBoxArea() > this.proportion.getImgArea()) {
      this.scale = this.d3
        .scaleLinear()
        .domain([0, this.proportion.getTextBoxArea()])
        .range([0, 300]);
    } else {
      this.scale = this.d3
        .scaleLinear()
        .domain([0, this.proportion.getImgArea()])
        .range([0, 300]);
    }

    this.cWEBGL.push();
    this.cWEBGL.translate(this.colCenterX, this.colCenterY);

    // Main Shape
    this.cWEBGL.beginShape();

    // This color will "shine" from centre
    this.cWEBGL.fill(0, 0, 0);

    // Draw one vertex in middle of canvas to start and end shape,
    // so that the gradient fill will "aim" towards there instead of
    // to one side of the shape
    this.cWEBGL.vertex(0, 0);

    for (let i = 0; i < this.numPoints; i++) {
      let a = this.angleGap * i;
      let nx = 600 + this.cWEBGL.sin(a) * 0.3; // nx and ny pos for noisy angle jitter
      let ny = 600 + this.cWEBGL.cos(a) * 0.3;
      let r = this.scale(this.proportion.getImgArea()) +
        this.cWEBGL.map(this.p5.noise(nx, ny, this.zpos), 0, 1, -50, 50);

      nx = this.cWEBGL.sin(a); // nx and ny pos for noisy hue jitter
      ny = this.cWEBGL.cos(a);

      let h = this.cWEBGL.map(nx, -1, 1, 0, this.colorsCount.length - 1);
      let x = this.cWEBGL.sin(a) * r; // actual x and y to draw
      let y = this.cWEBGL.cos(a) * r;

      if (i == 0) {
        this.firstPoint = {
          x: x,
          y: y,
          h: h,
        };
      }

      this.points[i] = {
        x: this.cWEBGL.sin(a) * r * 0.2, // Saving smaller version of x and y
        y: this.cWEBGL.cos(a) * r * 0.2, // to draw smaller inner shape in bg color
      }; // to cover the bit where the gradient all joins together

      this.cWEBGL.fill(this.colScale(h));
      this.cWEBGL.vertex(x, y);
    }

    this.cWEBGL.fill(this.colScale(this.firstPoint.h));
    this.cWEBGL.vertex(this.firstPoint.x, this.firstPoint.y); // First / Last outer point
    this.cWEBGL.vertex(0, 0); // End shape in centre so gradient aims there
    this.cWEBGL.endShape(this.cWEBGL.CLOSE);

    // Inner Shape
    this.cWEBGL.fill(this.p5.color("white"));
    this.cWEBGL.beginShape();

    for (let p of this.points) {
      this.cWEBGL.vertex(p.x, p.y);
    }

    this.cWEBGL.endShape(this.cWEBGL.CLOSE);

    this.cWEBGL.pop();
    // this.colTheta = this.colTheta - 0.1;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.cWEBGL.push();
    this.cWEBGL.translate(this.grayCenterX, this.grayCenterY);

    // Main Shape
    this.cWEBGL.beginShape();

    // This color will "shine" from centre
    this.cWEBGL.fill(0, 0, 0);

    // Draw one vertex in middle of canvas to start and end shape,
    // so that the gradient fill will "aim" towards there instead of
    // to one side of the shape
    this.cWEBGL.vertex(0, 0);

    for (let i = 0; i < this.numPoints; i++) {
      let a = this.angleGap * i;
      let nx = 600 + this.cWEBGL.sin(a) * 0.3; // nx and ny pos for noisy angle jitter
      let ny = 600 + this.cWEBGL.cos(a) * 0.3;
      let r = this.scale(this.proportion.getTextBoxArea()) +
        this.cWEBGL.map(this.p5.noise(nx, ny, this.zpos), 0, 1, -50, 50);

      nx = this.cWEBGL.sin(a); // nx and ny pos for noisy hue jitter
      ny = this.cWEBGL.cos(a);

      let h = this.cWEBGL.map(nx, -1, 1, 0, this.greyCount.length - 1);
      let x = this.cWEBGL.sin(a) * r; // actual x and y to draw
      let y = this.cWEBGL.cos(a) * r;

      if (i == 0) {
        this.firstPoint = {
          x: x,
          y: y,
          h: h,
        };
      }

      this.points[i] = {
        x: this.cWEBGL.sin(a) * r * 0.2, // Saving smaller version of x and y
        y: this.cWEBGL.cos(a) * r * 0.2, // to draw smaller inner shape in bg color
      }; // to cover the bit where the gradient all joins together

      this.cWEBGL.fill(this.greyScale(h));
      this.cWEBGL.vertex(x, y);
    }

    this.cWEBGL.fill(this.greyScale(this.firstPoint.h));
    this.cWEBGL.vertex(this.firstPoint.x, this.firstPoint.y); // First / Last outer point
    this.cWEBGL.vertex(0, 0); // End shape in centre so gradient aims there
    this.cWEBGL.endShape(this.cWEBGL.CLOSE);

    // Inner Shape
    this.cWEBGL.fill(this.p5.color("white"));
    this.cWEBGL.beginShape();

    for (let p of this.points) {
      this.cWEBGL.vertex(p.x, p.y);
    }

    this.cWEBGL.endShape(this.cWEBGL.CLOSE);
    this.cWEBGL.pop();

    // To animate through noise
    this.zpos += 0.003;
    this.zhue += 0.008;

    this.p5.image(this.cWEBGL, 0, 0);
  }
}
