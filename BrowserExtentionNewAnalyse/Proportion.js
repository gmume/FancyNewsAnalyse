class Proportion {
  constructor(p5) {
    this.p5 = p5;
    this.body;
    this.textBoxWidthSumCount = 0;
    this.textBoxHeightSumCount = 0;
    this.imgWidthSumCount = 0;
    this.imgHeightSumCount = 0;
    this.imgArea;
    this.textBoxArea;

    this.setup();
  }

  setup() {
    this.body = document.body;

    //gets all image elements
    let imgElements = document.getElementsByTagName("IMG");
    //gets the size of every image element
    imgElements.forEach((imgElement) => {
      this.printDOMRectInfo(imgElement);
    });
    //calculates the image shape's size in relation to all summed up images
    this.imgArea = this.imgWidthSumCount * this.imgHeightSumCount;

    //starts the nodes search
    this.traverseNodes(this.body);
    //calculates the text shape's size in relation to all summed up texts
    this.textBoxArea = this.textBoxWidthSumCount * this.textBoxHeightSumCount;
  }

  draw() {
    this.p5.noStroke();

    //draw text shape in red
    this.p5.fill(255, 0, 0, 127);
    this.p5.rect(
      this.p5.windowWidth / 2 + 300,
      this.p5.windowHeight / 2,
      this.textBoxArea / 1000000,
      this.textBoxArea / 1000000,
    );

    //draw image shape in yellow
    this.p5.fill(255, 255, 0, 127);
    this.p5.rect(
      this.p5.windowWidth / 2 - 300,
      this.p5.windowHeight / 2,
      this.imgArea / 1000000,
      this.imgArea / 1000000,
    );

    this.p5.textSize(20);
    this.p5.fill(255, 255, 0);
    this.p5.text("yellow = image", 60, 730);
    this.p5.fill(255, 0, 0);
    this.p5.text("red = text", 60, 700);
  }

  //gets the size of the element and sums it up in variables
  printDOMRectInfo(imgElement) {
    const rect = imgElement.getBoundingClientRect();
    this.imgWidthSumCount += rect.width;
    this.imgHeightSumCount += rect.height;
  }

  //Schreibt alle Nodes mit Text in die Konsole
  traverseNodes(node) {
    this.logNodeTextContent(node);

    //Geht durch die Childs der Nodes
    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];
      this.traverseNodes(childNode);
    }
  }

  // Filtert nach Nodes mit Text, die keine Zahlen enthalten
  logNodeTextContent(node) {
    if (
      node.nodeType === Node.TEXT_NODE && 
      node.textContent.trim() != "" &&
      !/\d/.test(node.textContent.trim())
    ) {

      //Adds the tag's size to variables
      let textBox = node.parentElement;
      this.textBoxWidthSumCount += textBox.clientWidth;
      this.textBoxHeightSumCount += textBox.clientHeight;
    }
  }
}
