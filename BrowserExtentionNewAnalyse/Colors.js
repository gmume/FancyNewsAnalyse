class Colors {
    getAllColors() {
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
  }
  