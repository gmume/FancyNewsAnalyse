let imgWidthSumCount = 0;
let imgHeightSumCount = 0;

const printDOMRectInfo = (imgElement, index) => {
  const rect = imgElement.getBoundingClientRect();
  const imgWidth = rect.width;
  const imgHeight = rect.height;

  console.log(`Element ${index + 1}:`);
  console.log(`Width: ${width}px`);
  console.log(`Height: ${height}px`);
  console.log("HTML Element: ", imgElement);
  console.log("-------------------");

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
const bodyArea = bodyWidth*bodyHeight;
const imgArea = imgWidthSumCount * imgHeightSumCount;

console.log("Body Breite: ", bodyWidth);
console.log("Body Höhe: ", bodyHeight);
console.log('Body Fläche: ', bodyArea);

console.log("Body: ", bodyElement);
console.log("HTML Element: ", imgElements);
console.log("Summe der Bildbreiten: ", imgWidthSumCount);
console.log("Summe der Bildhöhen: ", imgHeightSumCount);
console.log("Summe der Bildfläche: ", imgArea);

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

  p5.draw = function () {};

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_sketch = new p5(sketch);
