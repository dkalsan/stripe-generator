FRAME_RATE = 50


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(FRAME_RATE);
    noStroke();

    ocRadiusSlider = createSlider(1, 500, 70);
    ocRadiusSlider.position(20, 20);
    
    icRadiusRatioSlider = createSlider(0.0, 1.0, 0.6, 0.01);
    icRadiusRatioSlider.position(20, 50);

    numStripesSlider = createSlider(2, 50, 8);
    numStripesSlider.position(20, 80);

    rotationSpeedSlider = createSlider(-6.25, 6.25, 1.0, 0.05);
    rotationSpeedSlider.position(20, 110);

    stripeColorInput1 = createInput("#FFFFFF");
    stripeColorInput1.position(20, 140);
    stripeColorInput1.style("width", `${rotationSpeedSlider.width}px`);
    
    stripeColorInput2 = createInput("#000000");
    stripeColorInput2.position(20, 170);
    stripeColorInput2.style("width", `${rotationSpeedSlider.width}px`);

    icColorInput = createInput("#B8B8B8");
    icColorInput.position(20, 200);
    icColorInput.style("width", `${rotationSpeedSlider.width}px`);
}


function draw() {

    background("#FFFFFF");
    ocRadius = ocRadiusSlider.value();
    icRadiusRatio = icRadiusRatioSlider.value();
    numStripes = numStripesSlider.value();
    rotationSpeed = rotationSpeedSlider.value();
    stripeColor1 = stripeColorInput1.value();
    stripeColor2 = stripeColorInput2.value();
    icColor = icColorInput.value();

    // Draw divider
    push();
    fill("#F0F0F0");
    rect(0, 0, width*0.14, height);
    pop();

    // Draw text
    text(`(${ocRadius}) Radius`, ocRadiusSlider.x * 2 + ocRadiusSlider.width, ocRadiusSlider.y + 7);
    text(`(${icRadiusRatio}) Inner/Outer ratio`, icRadiusRatioSlider.x * 2 + icRadiusRatioSlider.width, icRadiusRatioSlider.y + 7);
    text(`(${numStripes}) Number of stripes`, numStripesSlider.x * 2 + numStripesSlider.width, numStripesSlider.y + 7);
    text(`(${rotationSpeed} rad/s) Rotation speed`, rotationSpeedSlider.x * 2 + rotationSpeedSlider.width, rotationSpeedSlider.y + 7);
    text("Stripe color 1", rotationSpeedSlider.x * 2 + rotationSpeedSlider.width, rotationSpeedSlider.y + 7 + 30);
    text("Stripe color 2", rotationSpeedSlider.x * 2 + rotationSpeedSlider.width, rotationSpeedSlider.y + 7 + 60);
    text("Inner circle color", rotationSpeedSlider.x * 2 + rotationSpeedSlider.width, rotationSpeedSlider.y + 7 + 90);

    x_offset = width * 0.2
    y_offset = height * 0.1

    // Draw main circle
    push();
    translate(x_offset, y_offset);
    fill(stripeColor1);
    circle(0, 0, ocRadius*2);
    pop();

    // Draw stripes
    push();
    translate(x_offset, y_offset);
    if (rotationSpeed != 0) {
        rotate((frameCount / FRAME_RATE) * rotationSpeed);
    }
    fill(stripeColor2);
    polygon(0, 0, ocRadius, numStripes);
    pop();

    // Draw inner circle
    push();
    translate(x_offset, y_offset);
    fill(icColor);
    circle(0, 0, ocRadius*icRadiusRatio*2);
    pop();
}

  
function polygon(x, y, r, numStripes) {
	let angle = PI/numStripes;

    beginShape();
    for (let i = 0; i < numStripes; i++) { 

        vertex(x, y);

        let sx2 = x + (cos(2*i*angle)) * r;
        let sy2 = y + (sin(2*i*angle)) * r;
        vertex(sx2, sy2);

        let sx3 = x + (cos((2*i+1)*angle)) * r;
        let sy3 = y + (sin((2*i+1)*angle)) * r;
        vertex(sx3, sy3);
    }
    endShape(CLOSE)
}
