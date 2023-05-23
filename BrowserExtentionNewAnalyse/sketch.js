console.log("Hello World!");

let colors;

const sketch = function (p5) {
  p5.preload = function () {
    // imgElements = document.getElementsByTagName("IMG");
    // images = [];

    // imgElements.forEach((imgElement) => {
    //   images = p5.loadImage(imgElement.src);
    // });
  };

  p5.setup = function () {
    p5.rectMode(p5.CENTER);
    let c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.style("top", "0px");
    c.style("left", "0px");
    c.style("pointer-events", "none");
    c.style("position", "fixed");
    c.style("z-index", "99999999");
    //p5.clear();

    colors = getAllColors();

    for (let i = 0; i < colors.length; i++) {
      console.log("colors " + i + ": " + colors[i]);
    }
  };

  function getAllColors() {

    var rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    var allColors = [];
    var elems = document.getElementsByTagName("*");
    var total = elems.length;
    var x, y, elemStyles, styleName, styleValue, rgbVal;

    for (x = 0; x < total; x++) {
      elemStyles = window.getComputedStyle(elems[x]);

      for (y = 0; y < elemStyles.length; y++) {
        styleName = elemStyles[y];
        styleValue = elemStyles[styleName];

        if (!styleValue) {
          continue;
        }

        // convert to string to avoid match exceptions
        styleValue += "";

        rgbVal = styleValue.match(rgbRegex);
        if (!rgbVal) { // property does not contain a color
          continue;
        }

        if (allColors.indexOf(rgbVal.input) == -1) { // avoid duplicate entries
          allColors.push(rgbVal.input);
        }
      }
    }

    return allColors;
  }
  
  p5.draw = function () {
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_scetch = new p5(sketch);
