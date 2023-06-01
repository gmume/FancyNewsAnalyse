let c;
let loremIpsumManager, loremIpsumText;
let colorManager, colorList;
let fontsManager, fontsList;
let beginingLetter;
let amoeba;

let buttonAll,    buttonpressedAll    = true;
let buttonNumber, buttonpressedNumber = false;
let buttonLetter, buttonpressedLetter = false;
let buttonAmoeba, buttonpressedAmoeba = false;
let buttonSave,   buttonpressedSave   = false;

const sketch = function (p5) {
  p5.setup = function () {
    setupCanvas();
    setupButtons()

    beginingLetter = new BeginingLetter(p5);
    loremIpsum = new LoremIpsum(p5);
    colorManager = new Colors();
    colorList = colorManager.getColors();
    fontsManager = new FontsUsed(p5);
    fontsList = fontsManager.getFonts();
    amoeba = new Amoeba(p5, d3, new Proportion(p5), new Colors().getColors());
  };

  p5.draw = function () {
    c.clear();

    if (buttonSave == true) {
      p5.background("white");
    }

    if (
      buttonpressedAll || buttonpressedNumber || buttonpressedLetter ||
      buttonpressedAmoeba
    ) {
      if (!buttonpressedNumber) {
        p5.push();
        p5.fill(0);
        p5.textSize(15);
        p5.textFont(fontsList[0]);
        loremIpsum.createTextField();
        p5.textSize(100);
        p5.text(loremIpsum.getCharsSum(), 350, 200);
        p5.pop();
      }

      if (!buttonpressedLetter) {
        p5.push();
        p5.textFont(fontsList[0]);
        p5.fill(0);
        p5.textSize(400);
        p5.text(
          document.title.charAt(0),
          p5.windowWidth / 1.6,
          p5.windowHeight / 1.2,
        );
        p5.pop();
      }

      if (!buttonpressedAmoeba) {
        amoeba.draw();
      }
    }

    if (buttonSave == true) {
      p5.saveCanvas("dataviz", "jpg");

      buttonSave = false;
    }
    

    p5.push();
    p5.fill("white");
    p5.textSize(15);
    p5.textFont("Helvetica");
    p5.text("This browser extension displays the", 20, p5.windowHeight - 20);
    p5.text(",", 405, p5.windowHeight - 20);
    p5.text("and", 460, p5.windowHeight - 20);
    p5.text("of the visited web page.", 618, p5.windowHeight - 20);
    p5.pop();
  };

  function toggleButtonAll() {
    buttonpressedAll = !buttonpressedAll;
  }

  function toggleButtonNumber() {
    buttonpressedNumber = !buttonpressedNumber;
  }

  function toggleButtonLetter() {
    buttonpressedLetter = !buttonpressedLetter;
  }

  function toggleButtonAmoeba() {
    buttonpressedAmoeba = !buttonpressedAmoeba;
  }

  function saveToFile() {
    buttonSave = true;
  };

  function setupButtons() {
    let buttonBackground = p5.createDiv("&#8201");
    buttonBackground.position(0, p5.windowHeight - 50);
    buttonBackground.style("background-color", "black");
    buttonBackground.style("font-size", "50px");
    buttonBackground.style("position", "fixed");
    buttonBackground.style("width", "1500px");
    buttonBackground.style("z-index", "3000");

    buttonAll = p5.createButton("on/off");
    buttonAll.position(p5.windowWidth - 70, p5.windowHeight - 40);
    buttonAll.mousePressed(toggleButtonAll);
    buttonAll.style("position", "fixed");
    buttonAll.class("buttonAll");

    buttonNumber = p5.createButton("character count");
    buttonNumber.position(493, p5.windowHeight - 40);
    buttonNumber.mousePressed(toggleButtonNumber);
    buttonNumber.style("position", "fixed");
    buttonNumber.class("buttonNumber");

    buttonLetter = p5.createButton("font");
    buttonLetter.position(414, p5.windowHeight - 40);
    buttonLetter.mousePressed(toggleButtonLetter);
    buttonLetter.style("position", "fixed");
    buttonLetter.class("buttonLetter");

    buttonAmoeba = p5.createButton("image-to-text ratio");
    buttonAmoeba.position(265, p5.windowHeight - 40);
    buttonAmoeba.mousePressed(toggleButtonAmoeba);
    buttonAmoeba.style("position", "fixed");
    buttonAmoeba.class("buttonAmoeba");

    buttonSave = p5.createButton("screenshot");
    buttonSave.position(p5.windowWidth - 170, p5.windowHeight - 40);
    buttonSave.mousePressed(saveToFile);
    buttonSave.style("position", "fixed");
    buttonSave.class("buttonSave");
  }
  
  function setupCanvas() {
    c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(60);
    c.style("top", "0px");
    c.style("left", "0px");
    c.style("pointer-events", "none");
    c.style("position", "fixed");
    c.style("z-index", "99999999");
  };
};

new p5(sketch);
