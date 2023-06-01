let c;
let loremIpsumManager;
let loremIpsumText;
let colorManager;
let colorList;
let fontsManager;
let fontsList;
let beginingLetter;
beginingLetter;
let amoeba;

let buttonAll;
let buttonpressedAll = true;
let buttonNumber;
let buttonpressedNumber = false;
let buttonLetter;
let buttonpressedLetter = false;
let buttonAmoeba;
let buttonpressedAmoeba = false;
let buttonSave;
let buttonpressedSave = false;

const sketch = function(p5) {
    p5.setup = function() {
        setupCanvas(p5);

        beginingLetter = new BeginingLetter(p5);
        loremIpsum = new LoremIpsum(p5);
        colorManager = new Colors();
        colorList = colorManager.getColors();
        fontsManager = new FontsUsed(p5);
        fontsList = fontsManager.getFonts();
        amoeba = new Amoeba(p5, d3, new Proportion(p5), new Colors().getColors());

        let buttonBackground = p5.createDiv("blubb");
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
    };

    function saveToFile() {
        buttonSave = true;
    }

    p5.draw = function() {
        c.clear();

        if (buttonSave == true) {
            p5.background('white');
        }



        if (
            buttonpressedAll || buttonpressedNumber || buttonpressedLetter ||
            buttonpressedAmoeba
        ) {

            if (!buttonpressedAmoeba) {
                //shows an amoeba
                amoeba.draw();

                //show colors
                let x = 0;
                let y = 0;
                p5.random();
                p5.randomSeed(2);

                let currentColor;

                for (let i = 0; i < colorList.length; i++) {
                    currentColor = p5.color(colorList[i])
                    console.log(currentColor)
                    currentColor = p5.color(currentColor[0], currentColor[1], currentColor[2], currentColor[3] - 0.5);
                    p5.fill(currentColor);

                    p5.rect(x + 350, y + 100, 30, 30);
                    x = p5.random(0, 700);
                    y = p5.random(0, 520);


                }
            }
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


        }

        if (buttonSave == true) {
            p5.saveCanvas('dataviz', 'jpg');

            buttonSave = false;
        }

        p5.push();
        p5.fill('white');
        p5.textSize(15);
        p5.textFont('Helvetica');
        p5.text('This browser extension displays the', 20, p5.windowHeight - 20);
        p5.text(',', 405, p5.windowHeight - 20);
        p5.text('and', 460, p5.windowHeight - 20);
        p5.text('of the visited web page.', 618, p5.windowHeight - 20);
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
};

const setupCanvas = function(p5) {
    c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(60);
    c.style("top", "0px");
    c.style("left", "0px");
    c.style("pointer-events", "none");
    c.style("position", "fixed");
    c.style("z-index", "99999999");
};

new p5(sketch);