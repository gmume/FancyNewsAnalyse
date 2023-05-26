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
      this.p5.textFont(this.fonts[i]);
      this.p5.text(this.fonts[i], 50, y);
      y += 50;
    }

    // Fonts turn 90 degrees
    p5.push();
    p5.translate(p5.width - 150, p5.height / 2);
    p5.angleMode(p5.DEGREES);
    let angle = -90;
    p5.rotate(angle);
    p5.textSize(50);
    p5.noStroke();
    p5.fill("blue");
    p5.text("Schriftart 1", 0, 0);
    p5.text("Schriftart 2", 0, 50);
    p5.text("Schriftart 3", 0, 100);
    p5.pop();
  }
}
