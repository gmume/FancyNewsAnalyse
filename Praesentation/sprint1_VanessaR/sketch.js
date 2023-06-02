function setup() {

    createCanvas(1500, 1000);



    slider_ro = createSlider(0, 100, 0);
    slider_ro.position(10, 940);
    slider_ro.style("width", "100px");

    slider_si = createSlider(1, 3, 0, 0.1);
    slider_si.position(150, 940);
    slider_si.style("width", "100px");

    slider_pos = createSlider(10, 500, 0);
    slider_pos.position(300, 940);
    slider_pos.style("width", "100px");

    slider_col = createSlider(0, 255, 0);
    slider_col.position(450, 940);
    slider_col.style("width", "100px");

    slider_back = createSlider(0, 255, 0);
    slider_back.position(600, 940);
    slider_back.style("width", "100px");



}


function draw() {

    let rot_val = slider_ro.value();
    let si_val = slider_si.value();
    let col_val = slider_col.value();
    let pos_val = slider_pos.value();
    let back_val = slider_back.value();

    background(back_val, back_val, back_val);
    noFill();

    strokeWeight(4);
    stroke(col_val, 100, 100, 255);

    let s = 50;

    rectMode(CENTER);

    angleMode(DEGREES);

    let maxDist = dist(300, 300, width, height); // maximale Distanz zum Zentrum

    randomSeed(10);
    for (let x = 0; x < width; x += s) {

        for (let y = 0; y < height; y += s) {

            let distToCenter = dist(x, y, mouseX, mouseY); //Anhängig von der Maustaste 
            //let distToCenter = dist(x, y, width / 2, height / 2); //Zentriert 

            let rotation = map(distToCenter, 0, maxDist, rot_val, 0); // Rotation basierend auf Distanz zum Zentrum // wenn zB. random(80,100) anstelle von 100 eingegeben wird, bewegen sich die Vierecke noch zusätzlich 
            let scaling = map(distToCenter, 0, maxDist, si_val, 0);
            let position = map(distToCenter, 0, maxDist, pos_val, 0);


            push();

            translate(x + s / 2, y + s / 2);

            rotate(rotation); // Rotation anwenden

            scale(scaling);

            rect(position, position, s, s);

            pop();

        }

    }

    //Balken
    noStroke();
    fill(255)
    rect(10, 950, 3000, 100)

    //Beschriftung unten 
    textFont("times")
    textSize(20);
    fill(0);
    text("ROTATION", 10, 930);

    fill(0);
    text("SIZE", 150, 930);

    fill(0);
    text("POSITION", 300, 930);

    fill(0);
    text("COLOR", 450, 930);

    fill(0);
    text("BACKGROUND", 600, 930);

}