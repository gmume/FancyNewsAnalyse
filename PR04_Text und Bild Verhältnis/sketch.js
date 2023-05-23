/////////////TEXT///////////////////////TEXT/////////////////////////TEXT/////////////////////////

let textBoxWidthSumCount = 0;
let textBoxHeightSumCount = 0;

// Filtert nach Nodes mit Text, die keine Zahlen enthalten
function logNodeTextContent(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.textContent.trim() != "") {
      if (!/\d/.test(node.textContent.trim())) {
        // Überprüft, ob der Text keine Zahlen enthält
        //console.log(node.textContent.trim());
        //console.log("HTML-Element:", node.parentElement);

        let textBox = node.parentElement;
        let textBoxHeight = textBox.clientHeight;
        let textBoxWidth = textBox.clientWidth;

        textBoxWidthSumCount += textBoxWidth;
        textBoxHeightSumCount += textBoxHeight;
      }
    }
  }
}




//Schreibt alle Nodes mit Text in die Konsole
function traverseNodes(node) {
  logNodeTextContent(node);

  //Geht durch die Childs der Nodes und schreibt den Text in die Konsole
  for (let i = 0; i < node.childNodes.length; i++) {
    const childNode = node.childNodes[i];
    traverseNodes(childNode);
  }
}

//startet die Suche
traverseNodes(document.body);

/////////////IMG///////////////////////IMG/////////////////////////IMG/////////////////////////
let imgWidthSumCount = 0;
let imgHeightSumCount = 0;

const printDOMRectInfo = (imgElement, index) => {
  const rect = imgElement.getBoundingClientRect();
  const imgWidth = rect.width;
  const imgHeight = rect.height;

  //console.log('Element: ' + index + 1);
  //console.log(`Width: ${imgWidth}px`);
  //console.log(`Height: ${imgHeight}px`);
  //console.log("HTML Element: ", imgElement);
  //console.log("-------------------");

  imgWidthSumCount += imgWidth;
  imgHeightSumCount += imgHeight;
};

const imgElements = document.getElementsByTagName("IMG");
imgElements.forEach((imgElement, index) => {
  printDOMRectInfo(imgElement, index);
});

const bodyElement = document.body;
const bodyRect = bodyElement.getBoundingClientRect();
const bodyWidth = bodyRect.width;
const bodyHeight = bodyRect.height;
const bodyArea = bodyWidth * bodyHeight;
const imgArea = imgWidthSumCount * imgHeightSumCount;

//console.log("Body Breite: " + bodyWidth + 'px');
//console.log("Body Höhe: " + bodyHeight + 'px');
console.log("Body Fläche: " + bodyArea + "px");

//console.log("Body: ", bodyElement);
//console.log("HTML Element: ", imgElements);
//console.log("Summe der Bildbreiten: " + imgWidthSumCount + 'px');
//console.log("Summe der Bildhöhen: " + imgHeightSumCount + 'px');
console.log("Summe der Bildfläche: " + imgArea + "px");

let textBoxArea = textBoxWidthSumCount * textBoxHeightSumCount;

console.log("Summe der Textboxbreiten: " + textBoxWidthSumCount + "px");
console.log("Summe der Textboxhöhen: " + textBoxHeightSumCount + "px");
console.log("Summe der Textboxfläche: ", textBoxArea + "px2");

////////////////SETUP////////////////////////////////////SETUP///////////////////////////////SETUP///////////////////////

//let textBoxScale = d3.scaleLinear().domain(0,textBoxArea).range(0,400);
//let imgScale = d3.scaleLinear().domain(0,imgArea).range(0,400);

//console.log(imgScale(20000))

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

  ////////////////DRAW//////////////////////////////////DRAW//////////////////////DRAW/////////////////
  p5.draw = function () {
    //p5.clear();

    p5.fill(255, 0, 0, 127);
    p5.noStroke();
    p5.rect(
      p5.windowWidth / 2+300,
      p5.windowHeight / 2,
      textBoxArea / 1000000,
      textBoxArea / 1000000
    );
    p5.fill(255, 255, 0, 127);
    p5.rect(
      p5.windowWidth / 2-300,
      p5.windowHeight / 2,
      imgArea / 1000000,
      imgArea / 1000000
    );
    p5.noLoop();

    p5.textSize(20);
    p5.fill(255, 255, 0);
    p5.text("yellow = image", 60, 730);
    p5.fill(255, 0, 0);
    p5.text("red = text", 60, 700);
}
 
  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_sketch = new p5(sketch);
