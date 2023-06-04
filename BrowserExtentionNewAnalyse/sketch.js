let c;
let fontsList;
let colorList;
let amoeba;

let buttonAll, buttonpressedAll = true;
let buttonNumber, buttonpressedNumber = false;
let buttonLetter, buttonpressedLetter = false;
let buttonAmoeba, buttonpressedAmoeba = false;
let buttonSave, buttonpressedSave = false;

const sketch = function (p5) {
  p5.setup = function () {
    setupCanvas();
    setupButtons();

    loremIpsum = new LoremIpsum(p5);
    fontsList = new FontsUsed(p5).getFonts();
    colorList = new Colors(p5).getColors();
    amoeba = new Amoeba(p5, d3, new Proportion(p5), colorList);

    p5.noStroke();
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
      //LoremIpsum
      if (!buttonpressedNumber) {
        p5.fill(255, 255, 255, 5);
        loremIpsum.createRect();
        p5.textSize(15);
        p5.textFont(fontsList[0]);
        loremIpsum.createTextField();
      }

      //Amoeba
      if (!buttonpressedAmoeba) {
        amoeba.draw();

        //show colors
        let x = 0;
        let y = 0;
        let currentColor;
        p5.randomSeed(2);

        for (let i = 0; i < colorList.length; i++) {
          currentColor = colorList[i];
          currentColor = currentColor
            .substring(4, currentColor.length - 1)
            .replace(/ /g, "")
            .split(",");
          currentColor = [
            p5.int(currentColor[0]),
            p5.int(currentColor[1]),
            p5.int(currentColor[2]),
            currentColor[3] = 150,
          ];

          p5.fill(p5.color(currentColor));
          p5.ellipse(x + 350, y + 100, 30, 30);
          x = p5.random(0, 700);
          y = p5.random(0, 520);
        }
      }

      //Anzahl Zeichen
      if (!buttonpressedNumber) {
        p5.push();
        p5.rectMode(p5.CENTER);
        p5.textAlign(p5.CENTER);

        let textLong = p5.textWidth(loremIpsum.getCharsSum()); // Breite des Textes ermitteln
        let rectWidth = textLong + 10; // Rechteckbreite basierend auf der Textbreite

        p5.fill(220, 220, 220, 200);
        p5.rect(1000, 465, rectWidth * 6, 75);
        p5.textSize(100);
        p5.fill("black");
        p5.text(loremIpsum.getCharsSum(), 1000, 500);
        p5.pop();
      }

      //Einzelner Buchstaben
      if (!buttonpressedLetter) {
        p5.push();
        p5.textFont(fontsList[0]);
        p5.fill("black");
        p5.textAlign(p5.CENTER);
        p5.textSize(400);
        p5.text(
          document.title.charAt(0),
          p5.windowWidth / 2,
          p5.windowHeight * 0.8,
        );
        p5.pop();
      }

      //Schriftart
      if (!buttonpressedLetter) {
        p5.push();
        p5.rectMode(p5.CENTER);
        p5.textAlign(p5.CENTER);
        p5.textSize(40);

        let rectWidth1;
        let yRect = 185;
        let yText = 200;

        for (let i = 0; i < fontsList.length; i++) {
          rectWidth1 = p5.textWidth(fontsList[i]) + 10; // Rechteckbreite basierend auf der Textbreite
          p5.fill(220, 220, 220, 200);
          p5.rect(400, yRect, rectWidth1, 30);
          p5.textFont(fontsList[i]);
          p5.fill("black");
          p5.text(fontsList[i], 400, yText);
          yRect += 45;
          yText += 45;
        }

        p5.pop();
      }
    }

    if (buttonSave == true) {
      p5.saveCanvas("dataviz", "jpg");

      buttonSave = false;
    }
    

    //Legende
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
  }

  function setupButtons() {
    //button Styling
    let buttonBackground = p5.createDiv("&#8201");
    buttonBackground.position(0, p5.windowHeight - 50);
    buttonBackground.style("background-color", "black");
    buttonBackground.style("font-size", "50px");
    buttonBackground.style("position", "fixed");
    buttonBackground.style("width", "1500px");
    buttonBackground.style("z-index", "10001");

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
  }
};

new p5(sketch);
