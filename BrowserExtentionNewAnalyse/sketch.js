let loremIpsum;
let proportion;
let colorManager;
let colorList;
let fontsManager;
let fontsList;

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
  };

  p5.draw = function () {

  };

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
