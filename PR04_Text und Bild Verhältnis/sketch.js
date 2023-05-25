let textBoxWidthSumCount = 0;
let textBoxHeightSumCount = 0;
let imgWidthSumCount = 0;
let imgHeightSumCount = 0;
let bodyElement;
let bodyRect;
let bodyWidth;
let bodyHeight;
let bodyArea;
let imgArea;
let textBoxArea;

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

    traverseNodes(document.body);

    const imgElements = document.getElementsByTagName("IMG");
    imgElements.forEach((imgElement, index) => {
      printDOMRectInfo(imgElement, index);
    });

    bodyElement = document.body;
    bodyRect = bodyElement.getBoundingClientRect();
    bodyWidth = bodyRect.width;
    bodyHeight = bodyRect.height;
    bodyArea = bodyWidth * bodyHeight;
    imgArea = imgWidthSumCount * imgHeightSumCount;

    textBoxArea = textBoxWidthSumCount * textBoxHeightSumCount;

    // let textBoxScale = d3.scaleLinear().domain(0, textBoxArea).range(0, 400);
    // let imgScale = d3.scaleLinear().domain(0, imgArea).range(0, 400);
  };

  p5.draw = function () {
    p5.fill(255, 0, 0, 127);
    p5.noStroke();
    p5.rect(
      p5.windowWidth / 2 + 300,
      p5.windowHeight / 2,
      textBoxArea / 1000000,
      textBoxArea / 1000000,
    );
    p5.fill(255, 255, 0, 127);
    p5.rect(
      p5.windowWidth / 2 - 300,
      p5.windowHeight / 2,
      imgArea / 1000000,
      imgArea / 1000000,
    );
    p5.noLoop();

    p5.textSize(20);
    p5.fill(255, 255, 0);
    p5.text("yellow = image", 60, 730);
    p5.fill(255, 0, 0);
    p5.text("red = text", 60, 700);
  };

  function logNodeTextContent(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim() != "") {
        if (!/\d/.test(node.textContent.trim())) {
          let textBox = node.parentElement;
          let textBoxHeight = textBox.clientHeight;
          let textBoxWidth = textBox.clientWidth;

          textBoxWidthSumCount += textBoxWidth;
          textBoxHeightSumCount += textBoxHeight;
        }
      }
    }
  }

  function traverseNodes(node) {
    logNodeTextContent(node);

    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];
      traverseNodes(childNode);
    }
  }

  function printDOMRectInfo(imgElement, index) {
    const rect = imgElement.getBoundingClientRect();
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    imgWidthSumCount += imgWidth;
    imgHeightSumCount += imgHeight;
  }

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_sketch = new p5(sketch);
