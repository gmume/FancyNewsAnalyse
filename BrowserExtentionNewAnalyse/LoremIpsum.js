class LoremIpsum {
  constructor(p5) {
    this.p5 = p5;
    this.textContent =
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit ame";
    this.textArray = this.createText();
    this.alleBuchstabenSum = this.countChars();
  }

  getTextArray() {
    return this.textArray;
  }

  getAlleBuchstabenSum() {
    return this.alleBuchstabenSum;
  }

  createText() {
    let loremIpsum = [];

    for (let i = 0; i < this.textContent.length; i++) {
      let index = i % 3000;
      loremIpsum[index] = this.textContent.charAt(i);
    }

    return loremIpsum;
  }

  countChars() {
    let charsSum;

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

    charsSum = h2LetterCountSum + h1LetterCountSum + aLetterCountSum +
      pLetterCountSum;
    charsSum = Math.min(this.alleBuchstabenSum, 30000);

    return charsSum;
  }

  createTextField() {
    let x = 50;
    let y = 100;

    for (let i = 0; i < this.textArray.length; i++) {
      this.p5.text(this.textArray[i], x, y);

      if (
        x + this.p5.textWidth(this.textArray[i]) >= this.p5.windowWidth - 50
      ) {
        x = 50;
        y += 25;
      } else {
        x += this.p5.textWidth(this.textArray[i]);
      }

      if (i >= (this.alleBuchstabenSum / 30000) * this.textContent.length) {
        break;
      }
    }
  }
}
