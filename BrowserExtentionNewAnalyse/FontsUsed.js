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

        console.log("this.fonts[0]: "+this.fonts[0]);
        this.p5.textFont(this.fonts[0]);
        this.p5.text(this.fonts[0], 50, 100);


       this.p5.textFont(this.fonts[1]);
       this.p5.text(this.fonts[1], 50, 150);


        this.p5.textFont(this.fonts[2]);
        this.p5.text(this.fonts[2], 50, 200);


        // this.p5.textFont(this.fonts[3]);
        // this.p5.text(this.fonts[3], 50, 250);


        // this.p5.textFont(this.fonts[4]);
        // this.p5.text(this.fonts[4], 50, 300);


        // this.p5.textFont(this.fonts[5]);
        // this.p5.text(this.fonts[5], 50, 350);


        // this.p5.textFont(this.fonts[6]);
        // this.p5.text(this.fonts[6], 50, 400);
    }
}