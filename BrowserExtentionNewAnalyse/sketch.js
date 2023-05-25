let colors;
let loremIpsum;
let fontsList;
let proportion;

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

    //create dummy text in the length of the websites chars count
    loremIpsum = new LoremIpsum(p5);
    loremIpsum.createTextField();

    //get all used colors of website
    colors = new Colors().getAllColors();

    // for (let i = 0; i < colors.length; i++) {
    //   console.log("colors " + i + ": " + colors[i]);
    // }

    //get all used fonts of website
    fontsList = new FontsUsed(p5);
    fontsList.showFonts();
    console.log(fontsList)

    //get proportion of text to images of website
    proportion = new Proportion(p5);

    //startet die Suche
    proportion.traverseNodes(document.body);

    p5.textFont("Arial");
  };

  p5.draw = function () {

    //draw shapes in proportion of text to images of website
    proportion.draw();
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_sketch = new p5(sketch);
