class Proportion {
  constructor(p5) {
    this.p5 = p5;
    this.textBoxWidthSumCount = 0;
    this.textBoxHeightSumCount = 0;
    this.imgWidthSumCount = 0;
    this.imgHeightSumCount = 0;

    this.printDOMRectInfo = (imgElement, index) => {
      const rect = imgElement.getBoundingClientRect();
      const imgWidth = rect.width;
      const imgHeight = rect.height;

      //console.log('Element: ' + index + 1);
      //console.log(`Width: ${imgWidth}px`);
      //console.log(`Height: ${imgHeight}px`);
      //console.log("HTML Element: ", imgElement);
      //console.log("-------------------");

      this.imgWidthSumCount += imgWidth;
      this.imgHeightSumCount += imgHeight;
    };

    this.imgElements = document.getElementsByTagName("IMG");
    this.imgElements.forEach((imgElement, index) => {
      this.printDOMRectInfo(imgElement, index);
    });

    this.bodyElement = document.body;
    this.bodyRect = this.bodyElement.getBoundingClientRect();
    this.bodyWidth = this.bodyRect.width;
    this.bodyHeight = this.bodyRect.height;
    this.bodyArea = this.bodyWidth * this.bodyHeight;
    this.imgArea = this.imgWidthSumCount * this.imgHeightSumCount;

    //console.log("Body Breite: " + bodyWidth + 'px');
    //console.log("Body Höhe: " + bodyHeight + 'px');
    //console.log("Body Fläche: " + this.bodyArea + "px");

    //console.log("Body: ", bodyElement);
    //console.log("HTML Element: ", imgElements);
    //console.log("Summe der Bildbreiten: " + imgWidthSumCount + 'px');
    //console.log("Summe der Bildhöhen: " + imgHeightSumCount + 'px');
    //console.log("Summe der Bildfläche: " + this.imgArea + "px");

    this.textBoxArea = this.textBoxWidthSumCount * this.textBoxHeightSumCount;

    //console.log(
    //   "Summe der Textboxbreiten: " + this.textBoxWidthSumCount + "px",
    // );
    // console.log("Summe der Textboxhöhen: " + this.textBoxHeightSumCount + "px");
    // console.log("Summe der Textboxfläche: ", this.textBoxArea + "px2");
  }

  draw() {
    this.p5.fill(255, 0, 0, 127);
    this.p5.noStroke();
    this.p5.rect(
      this.p5.windowWidth / 2 + 300,
      this.p5.windowHeight / 2,
      this.textBoxArea / 1000000,
      this.textBoxArea / 1000000,
    );
    this.p5.fill(255, 255, 0, 127);
    this.p5.rect(
      this.p5.windowWidth / 2 - 300,
      this.p5.windowHeight / 2,
      this.imgArea / 1000000,
      this.imgArea / 1000000,
    );
    this.p5.noLoop();

    this.p5.textSize(20);
    this.p5.fill(255, 255, 0);
    this.p5.text("yellow = image", 60, 730);
    this.p5.fill(255, 0, 0);
    this.p5.text("red = text", 60, 700);
  }

  // Filtert nach Nodes mit Text, die keine Zahlen enthalten
  logNodeTextContent(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim() != "") {
        if (!/\d/.test(node.textContent.trim())) {
          // Überprüft, ob der Text keine Zahlen enthält
          //console.log(node.textContent.trim());
          //console.log("HTML-Element:", node.parentElement);

          let textBox = node.parentElement;
          let textBoxHeight = textBox.clientHeight;
          let textBoxWidth = textBox.clientWidth;

          this.textBoxWidthSumCount += textBoxWidth;
          this.textBoxHeightSumCount += textBoxHeight;
        }
      }
    }
  }

  //Schreibt alle Nodes mit Text in die Konsole
  traverseNodes(node) {
    this.logNodeTextContent(node);

    //Geht durch die Childs der Nodes und schreibt den Text in die Konsole
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];
      this.traverseNodes(childNode);
    }
  }
}
