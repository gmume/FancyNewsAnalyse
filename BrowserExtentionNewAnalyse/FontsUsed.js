class FontsUsed {
  constructor(p5) {
    this.p5 = p5;
    this.fonts = this.listFonts();
  }

  getFonts() {
    return this.fonts;
  }

  listFonts() {
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

    return [...new Set(arr)];
  }

  showFonts() {
    this.p5.textSize(50);
    this.p5.fill("blue");

    let y = 100;

    for (let i = 0; i < this.fonts.length; i++) {
      this.p5.push();
      this.p5.translate(this.p5.width / 2, this.p5.height / 2);
      this.p5.angleMode(this.p5.DEGREES);
      let angle = -90;
      this.p5.rotate(angle);
      this.p5.textSize(50);
      this.p5.noStroke();
      this.p5.fill("blue");

      this.p5.textFont(this.fonts[i]);
      this.p5.text(this.fonts[i], 0, y);

      this.p5.pop();

      y += 50;
    }

    // Fonts turn 90 degrees
  }
}
