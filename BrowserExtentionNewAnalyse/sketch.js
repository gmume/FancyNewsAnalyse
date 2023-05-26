const colors = new Colors();
let loremIpsum;
let proportion;
let fontsManager;
let fontsList;

const sketch = function (p5) {
  p5.setup = function () {
    p5.rectMode(p5.CENTER);

    let c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.style("top", "0px");
    c.style("left", "0px");
    c.style("pointer-events", "none");
    c.style("position", "fixed");
    c.style("z-index", "99999999");

    p5.textSize(20);
    p5.fill(255, 0, 0);

    loremIpsum = new LoremIpsum(p5);
    proportion = new Proportion(p5);
    fontsManager = new FontsUsed(p5);

    //create dummy text in the length of the websites chars count
    loremIpsum.createTextField();

    // for (let i = 0; i < colors.length; i++) {
    //   console.log("colors " + i + ": " + colors[i]);
    // }

    fontsList = fontsManager.getFonts();
    fontsManager.showFonts();

    //draw shapes in proportion of text to images of website
    proportion.draw();

    p5.textFont(fontsList[0]);
  };

  p5.draw = function () {
    // Fonts turn 90 degrees
    // p5.push();
    // p5.translate(p5.width - 150, p5.height / 2);
    // p5.angleMode(p5.DEGREES);
    // let angle = -90;
    // p5.rotate(angle);
    // p5.textSize(50);
    // p5.noStroke();
    // p5.fill("blue");
    // p5.text("Schriftart 1", 0, 0);
    // p5.text("Schriftart 2", 0, 50);
    // p5.text("Schriftart 3", 0, 100);
    // p5.pop();
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_sketch = new p5(sketch);
