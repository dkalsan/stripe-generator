FRAME_RATE = 50;


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(FRAME_RATE);
    noStroke();

    x_offset_input = 160
    x_offset_text = 200

    ocRadius = 70;
    ocRadiusMin = 1;
    ocRadiusMax = 500;
    ocRadiusSlider = createSlider(ocRadiusMin, ocRadiusMax, ocRadius);
    ocRadiusSlider.position(20, 20);
    ocRadiusSlider.input(() => {
        ocRadius = ocRadiusSlider.value();
        ocRadiusInput.value(ocRadius);
    });
    ocRadiusInput = createInput(ocRadius.toString());
    ocRadiusInput.position(x_offset_input, 20);
    ocRadiusInput.size(25, 15);
    ocRadiusInput.changed(() => {
        ocRadius = ocRadiusInput.value();
        ocRadius = Math.max(Math.min(ocRadius, ocRadiusMax), ocRadiusMin);
        ocRadiusInput.value(ocRadius);
        ocRadiusSlider.value(ocRadius);
    });
    
    icRadiusRatio = 60;
    icRadiusRatioMin = 0;
    icRadiusRatioMax = 100;
    icRadiusRatioSlider = createSlider(icRadiusRatioMin, icRadiusRatioMax, icRadiusRatio);
    icRadiusRatioSlider.position(20, 50);
    icRadiusRatioSlider.input(() => {
        icRadiusRatio = icRadiusRatioSlider.value();
        icRadiusRatioInput.value(icRadiusRatio);
    });
    icRadiusRatioInput = createInput(icRadiusRatio.toString());
    icRadiusRatioInput.position(x_offset_input, 50);
    icRadiusRatioInput.size(25, 15);
    icRadiusRatioInput.changed(() => {
        icRadiusRatio = icRadiusRatioInput.value();
        icRadiusRatio = Math.max(Math.min(icRadiusRatio, icRadiusRatioMax), icRadiusRatioMin);
        icRadiusRatioInput.value(icRadiusRatio);
        icRadiusRatioSlider.value(icRadiusRatio);
    });

    numStripes = 8;
    numStripesMin = 2;
    numStripesMax = 150;
    numStripesSlider = createSlider(numStripesMin, numStripesMax, numStripes);
    numStripesSlider.position(20, 80);
    numStripesSlider.input(() => {
        numStripes = numStripesSlider.value();
        numStripesInput.value(numStripes);
    });
    numStripesInput = createInput(numStripes.toString());
    numStripesInput.position(x_offset_input, 80);
    numStripesInput.size(25, 15);
    numStripesInput.changed(() => {
        numStripes = numStripesInput.value();
        numStripes = Math.max(Math.min(numStripes, numStripesMax), numStripesMin);
        numStripesInput.value(numStripes);
        numStripesSlider.value(numStripes);
    });

    rotationSpeed = 1.0;
    rotationSpeedMin = -6.25;
    rotationSpeedMax = 6.25;
    rotationSpeedSlider = createSlider(rotationSpeedMin, rotationSpeedMax, rotationSpeed, 0.05);
    rotationSpeedSlider.position(20, 110);
    rotationSpeedSlider.input(() => {
        rotationSpeed = rotationSpeedSlider.value();
        rotationSpeedInput.value(rotationSpeed);
    });
    rotationSpeedInput = createInput(rotationSpeed.toString());
    rotationSpeedInput.position(x_offset_input, 110);
    rotationSpeedInput.size(25, 15);
    rotationSpeedInput.changed(() => {
        rotationSpeed = rotationSpeedInput.value();
        rotationSpeed = rotationSpeed.replace(/,/g, ".")
        rotationSpeed = Math.max(Math.min(rotationSpeed, rotationSpeedMax), rotationSpeedMin);
        rotationSpeedInput.value(rotationSpeed);
        rotationSpeedSlider.value(rotationSpeed);
    });

    stripeColor1 = "#FFFFFF";
    stripeColorInput1 = createInput(stripeColor1);
    stripeColorInput1.position(20, 140);
    stripeColorInput1.style("width", `${rotationSpeedSlider.width}px`);
    stripeColorInput1.changed(() => {
        stripeColor1 = stripeColorInput1.value();
    });
    
    stripeColor2 = "#000000";
    stripeColorInput2 = createInput(stripeColor2);
    stripeColorInput2.position(20, 170);
    stripeColorInput2.style("width", `${rotationSpeedSlider.width}px`);
    stripeColorInput2.changed(() => {
        stripeColor2 = stripeColorInput2.value();
    });

    icColor = "#B8B8B8";
    icColorInput = createInput(icColor);
    icColorInput.position(20, 200);
    icColorInput.style("width", `${rotationSpeedSlider.width}px`);
    icColorInput.changed(() => {
        icColor = icColorInput.value();
    });

    numCircles = 1;
    numCirclesMin = 1;
    numCirclesMax = 100;
    numCirclesSlider = createSlider(numCirclesMin, numCirclesMax, numCircles);
    numCirclesSlider.position(20, 230);
    numCirclesSlider.input(() => {
        numCircles = numCirclesSlider.value();
        numCirclesInput.value(numCircles);
    });
    numCirclesInput = createInput(numCircles.toString());
    numCirclesInput.position(x_offset_input, 230);
    numCirclesInput.size(25, 15);
    numCirclesInput.changed(() => {
        numCircles = numCirclesInput.value();
        numCircles = Math.max(Math.min(numCircles, numCirclesMax), numCirclesMin);
        numCirclesInput.value(numCircles);
        numCirclesSlider.value(numCircles);
    });

    interCircleSpace = 30;
    interCircleSpaceMin = 0;
    interCircleSpaceMax = 200;
    interCircleSpaceSlider = createSlider(interCircleSpaceMin, interCircleSpaceMax, interCircleSpace);
    interCircleSpaceSlider.position(20, 260);
    interCircleSpaceSlider.input(() => {
        interCircleSpace = interCircleSpaceSlider.value();
        interCircleSpaceInput.value(interCircleSpace);
    });
    interCircleSpaceInput = createInput(interCircleSpace.toString());
    interCircleSpaceInput.position(x_offset_input, 260);
    interCircleSpaceInput.size(25, 15);
    interCircleSpaceInput.changed(() => {
        interCircleSpace = interCircleSpaceInput.value();
        interCircleSpace = Math.max(Math.min(interCircleSpace, interCircleSpaceMax), interCircleSpaceMin);
        interCircleSpaceInput.value(interCircleSpace);
        interCircleSpaceSlider.value(interCircleSpace);
    });

    play = true;
    playStopButton = createButton("Pause");
    playStopButton.position(20, 290)
    playStopButton.size(135, 20);
    playStopButton.mouseClicked(() => {
        if (play == true) {
            playStopButton.html("Resume")
        } else {
            playStopButton.html("Pause")
        }
        play = !play;
    });
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
 }


function draw() {

    background("#121212");

    // Draw divider
    divider_width = textWidth(`(${interCircleSpace}) Space between circles`) + interCircleSpaceSlider.x * 2 + interCircleSpaceSlider.width + 30
    push();
    fill("#272727");
    rect(0, 0, divider_width, height);
    pop();

    // Draw text
    fill("#FFFFFF");
    text("Radius", x_offset_text, 20 + 7);
    text("Inner/Outer ratio (%)", x_offset_text, 50 + 7);
    text("Number of stripes", x_offset_text, 80 + 7);
    text("Rotation speed (rad/s)", x_offset_text, 110 + 7);
    text("Stripe color 1", x_offset_text, 140 + 7);
    text("Stripe color 2", x_offset_text, 170 + 7);
    text("Inner circle color", x_offset_text, 200 + 7);
    text("Number of circles", x_offset_text, 230 + 7);
    text("Space between circles", x_offset_text, 260 + 7);

    remainingWidth = width - divider_width;
    maxCols = Math.floor(remainingWidth / (ocRadius*2 + interCircleSpace));
    maxRows = Math.floor(height / (ocRadius*2 + interCircleSpace));

    if (numCircles > maxCols*maxRows) {
        fill("#FF0000");
        text(`Max ${maxCols*maxRows} circles can be drawn due to space restriction.`,
            15,
            playStopButton.y + 37);
    }

    for (let i = 0; i < Math.min(numCircles, maxCols*maxRows); i++) {
        x_offset = 10 + divider_width + (i%maxCols)*(ocRadius*2 + interCircleSpace) + ocRadius; 
        y_offset = 10 + (Math.floor(i/maxCols)*(ocRadius*2 + interCircleSpace) + ocRadius);

        // Draw main circle
        push();
        translate(x_offset, y_offset);
        fill(stripeColor1);
        circle(0, 0, ocRadius*2);
        pop();

        // Draw stripes
        push();
        translate(x_offset, y_offset);
        if (rotationSpeed != 0 && play == true) {
            rotate((frameCount / FRAME_RATE) * rotationSpeed);
        }
        fill(stripeColor2);
        polygon(0, 0, ocRadius, numStripes);
        pop();

        // Draw inner circle
        push();
        translate(x_offset, y_offset);
        fill(icColor);
        circle(0, 0, ocRadius*(icRadiusRatio/100)*2);
        pop();
    }
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
