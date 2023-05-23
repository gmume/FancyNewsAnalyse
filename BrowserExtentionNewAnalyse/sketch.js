

let colors;
let alleBuchstabenSum;

const sketch = function (p5) {

  let textContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit ame";
  let textArray = [];

  p5.setup = function() {
    for (let i = 0; i < textContent.length; i++) {
      let index = i % 3000;
      textArray[index] = textContent.charAt(i);
    }

    p5.rectMode(p5.CENTER);

    let c = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    c.style("top", "0px");
    c.style("left", "0px");
    c.style("pointer-events", "none");
    c.style("position", "fixed");
    c.style("z-index", "99999999");


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

  p5.draw = function() {
    
    let h2Tags = document.getElementsByTagName("h2");
    let h2LetterCountSum = 0;

    for (let i = 0; i < h2Tags.length; i++) {
      let h2Tag = h2Tags[i];
      let h2Text = h2Tag.textContent;
      let h2LetterCount = h2Text.length;
      h2LetterCountSum += h2LetterCount;
    }

    let h1Tags = document.getElementsByTagName("h1");
    let h1LetterCountSum = 0;

    for (let i = 0; i < h1Tags.length; i++) {
      let h1Tag = h1Tags[i];
      let h1Text = h1Tag.textContent;
      let h1LetterCount = h1Text.length;
      h1LetterCountSum += h1LetterCount;
    }

    let aTags = document.getElementsByTagName("a");
    let aLetterCountSum = 0;

    for (let i = 0; i < aTags.length; i++) {
      let aTag = aTags[i];
      let aText = aTag.textContent;
      let aLetterCount = aText.length;
      aLetterCountSum += aLetterCount;
    }

    let pTags = document.getElementsByTagName("p");
    let pLetterCountSum = 0;

    for (let i = 0; i < pTags.length; i++) {
      let pTag = pTags[i];
      let pText = pTag.textContent;
      let pLetterCount = pText.length;
      pLetterCountSum += pLetterCount;
    }

    alleBuchstabenSum = h2LetterCountSum + h1LetterCountSum + aLetterCountSum + pLetterCountSum;
    alleBuchstabenSum = Math.min(alleBuchstabenSum, 30000);

    console.log('Anzahl Buchstaben H1 ' + h1LetterCountSum);
    console.log('Anzahl Buchstaben H2 ' + h2LetterCountSum);
    console.log('Anzahl Buchstaben A ' + aLetterCountSum);
    console.log('Anzahl Buchstaben P ' + pLetterCountSum);
    console.log("Alle Buchstaben: " + alleBuchstabenSum);
    
    
    p5.textSize(20);
    p5.fill(255, 0, 0);
    p5.textFont("Arial");

    let x = 50;
    let y = 100;

    for (let i = 0; i < textArray.length; i++) {
    p5.text(textArray[i], x, y);

    if (x + p5.textWidth(textArray[i]) >= p5.windowWidth - 50) {
    x = 50;
    y += 25;
    } else {
    x += p5.textWidth(textArray[i]);
    }

    if (i >= (alleBuchstabenSum / 30000) * textContent.length) {
    break;
    }
    }
    };

    p5.windowResized = function() {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_sketch = new p5(sketch);
