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
}
