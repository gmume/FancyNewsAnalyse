console.log("Hello World!");

let blob;

const sketch = function (p5) {
  p5.setup = function () {
    p5.rectMode(p5.CENTER);
    let c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.style("top", "0px");
    c.style("left", "0px");
    c.style("pointer-events", "none");
    c.style("position", "fixed");
    c.style("z-index", "99999999");
    //p5.clear();

    blob = takeScreenshot();

    console.log("blob: "+blob.type);
    blob;
  
    // generate();
  };

  function takeScreenshot() {
    var screenshot = document.documentElement.cloneNode(true);
    screenshot.style.pointerEvents = 'none';
    // screenshot.style.overflow = 'hidden';
    screenshot.style.webkitUserSelect = 'none';
    screenshot.style.mozUserSelect = 'none';
    screenshot.style.msUserSelect = 'none';
    screenshot.style.oUserSelect = 'none';
    screenshot.style.userSelect = 'none';
    screenshot.dataset.scrollX = window.scrollX;
    screenshot.dataset.scrollY = window.scrollY;
    var blob = new Blob([screenshot.outerHTML], {
      type: 'text/html'
    });
    return blob;
  }
  
  function generate() {
    window.URL = window.URL || window.webkitURL;
    window.open(window.URL
      .createObjectURL(takeScreenshot()));
  }

  p5.draw = function () {
    
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_scetch = new p5(sketch);
