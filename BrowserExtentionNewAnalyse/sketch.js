let c;
let loremIpsumManager;
let loremIpsumText;
let proportion;
let colorManager;
let colorList;
let fontsManager;
let fontsList;
let amoeba;

const sketch = function (p5) {
  p5.setup = function () {
    setupCanvas(p5);

    loremIpsum = new LoremIpsum(p5);
    proportion = new Proportion(p5);
    colorManager = new Colors();
    colorList = colorManager.getColors();
    fontsManager = new FontsUsed(p5);
    fontsList = fontsManager.getFonts();
    amoeba = new Amoeba(p5, d3);
  };

  p5.draw = function () {
    c.clear();

    //create dummy text in the length of the websites chars count
    loremIpsum.createTextField();

    //draw shapes in proportion of text to images of website
    //  proportion.draw();

    p5.textFont(fontsList[0]);
    fontsManager.showFonts();

    //show colors
    let x = 0;

    for (let i = 0; i < colorList.length; i++) {
      p5.fill(p5.color(colorList[i]));
      p5.rect(x, 0, 30, 30);
      x += 30;
    }

    //shows an amoeba
    amoeba.draw();
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

new p5(sketch);
