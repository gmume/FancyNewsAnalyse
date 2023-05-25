class FontsUsed  {
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
                console.log("font.value[0].family: "+font.value[0].family)
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
         y += 50
        }
    }
}