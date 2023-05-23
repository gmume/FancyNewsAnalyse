console.log("Hello World!");

// let fontFam = document.getElementById("demo").style.fontFamily;
// let teaserLayoutRelatedContent = document.getElementsByClassName("teaserLayoutRelatedContent_title__0X_WS");
// console.log("teaserLayoutRelatedContent: "+teaserLayoutRelatedContent);
// let fontFam = teaserLayoutRelatedContent.style;
// console.log("fontFam: "+fontFam);

// console.log(getComputedStyle(document.getElementsByClassName('teaserLayoutRelatedContent'), null).getPropertyValue('fontFamily'));

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

    let fonts = listFonts();

    for (let i = 0; i < fonts.length; i++) {
      console.log("font "+i+": "+fonts[i]);
      
    }
    
  };

  function listFonts() {
    let { fonts } = document;
    const it = fonts.entries();
  
    let arr = [];
    let done = false;
  
    while (!done) {
      const font = it.next();

      if (!font.done) {
        arr.push(font.value[0].family);
      } else {
        done = font.done;
      }
    }
  
    // converted to set then arr to filter repetitive values
    return [...new Set(arr)];
  }

  p5.draw = function () {

  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_scetch = new p5(sketch);
