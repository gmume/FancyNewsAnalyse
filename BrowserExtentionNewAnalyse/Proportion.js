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

  getTextBoxArea() {
    return this.textBoxArea;
  }

  getImgArea() {
    return this.imgArea;
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
