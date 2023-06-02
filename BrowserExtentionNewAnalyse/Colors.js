class Colors {
  constructor(p5) {
    this.p5 = p5;
    this.colors = [];

    this.setupColors();
  }

  getColors() {
    return this.colors;
  }

  setupColors() {
    let rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    let elems = document.getElementsByTagName("*");
    let total = elems.length;
    let x, y, elemStyles, styleName, styleValue, rgbVal;

    for (x = 0; x < total; x++) {
      elemStyles = window.getComputedStyle(elems[x]);

      for (y = 0; y < elemStyles.length; y++) {
        styleName = elemStyles[y];
        styleValue = elemStyles[styleName];

        if (styleValue) {
          // convert to string to avoid match exceptions
          styleValue += "";

          rgbVal = styleValue.match(rgbRegex);

          if (
            rgbVal && rgbVal != "rgba(0, 0, 0, 0),0,0,0,0"
          ) {
            rgbVal = rgbVal.input;

            if (!this.colors.includes(rgbVal)) {
              this.colors.push(rgbVal);
            }
          }
        }
      }
    }
    console.log("colors: " + this.colors);
  }
}
