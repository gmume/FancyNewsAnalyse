console.log("Hello World!");

/* let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let sum = 0;
for (i = 0; i < array.length; i++) {
  sum += array[i];
}
console.log(sum); */

let h2Tags = document.getElementsByTagName("h2");
let h2Tag;
let h2Text;
let h2LetterCount;
let h2LetterCountSum = 0;

for (let i = 0; i < h2Tags.length; i++) {
  h2Tag = h2Tags[i];
  h2Text = h2Tag.textContent;
  h2LetterCount = h2Text.length;
  //console.log("H2 Tag " + i + 1 + ":" + h2LetterCount + " Buchstaben");
  h2LetterCountSum += h2LetterCount;
  console.log('Anzahl Buchstaben H2 ' + h2LetterCountSum);
}

let h1Tags = document.getElementsByTagName("h1");
let h1Tag;
let h1Text;
let h1LetterCount;
let h1LetterCountSum = 0;

for (let i = 0; i < h1Tags.length; i++) {
  h1Tag = h1Tags[i];
  h1Text = h1Tag.textContent;
  h1LetterCount = h1Text.length;
  //console.log("H1 Tag " + i + 1 + ":" + h1LetterCount + " Buchstaben");
  h1LetterCountSum += h1LetterCount;
  console.log('Anzahl Buchstaben H1 ' + h1LetterCountSum);
}

let pTags = document.getElementsByTagName("p");
let pTag;
let pText;
let pLetterCount;
let pLetterCountSum = 0;

for (let i = 0; i < pTags.length; i++) {
  pTag = pTags[i];
  pText = pTag.textContent;
  pLetterCount = pText.length;
  //console.log("P Tag " + i + 1 + ":" + pLetterCount + " Buchstaben");
  pLetterCountSum += pLetterCount;
  console.log('Anzahl Buchstaben P ' + pLetterCountSum);
}

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

  p5.draw = function () {
    //p5.clear();
    p5.fill(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255));
    p5.rect(p5.mouseX, p5.mouseY, 50, 50, p5.random(0, 25));
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

let my_scetch = new p5(sketch);
