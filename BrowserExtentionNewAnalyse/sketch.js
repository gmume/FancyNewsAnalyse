console.log("Hello World!");

const sketch = function (p5) {
  p5.setup = function () {
    p5.rectMode(p5.CENTER);
    let c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.style("top", "0px");
    c.style("left", "0px");
    c.style("pointer-events", "none");
    c.style("position", "fixed");
    c.style("z-index", "99999999");
    p5.clear();
  };

  p5.draw = function () {
    //p5.clear();
    p5.fill(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255));
    p5.rect(p5.mouseX, p5.mouseY, 50, 50, p5.random(0, 25));
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_scetch = new p5(sketch);
