FRAME_RATE = 50;


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(FRAME_RATE);
    noStroke();

    ocRadiusSlider = createSlider(1, 500, 70);
    ocRadiusSlider.position(20, 20);
    
    icRadiusRatioSlider = createSlider(0.0, 1.0, 0.6, 0.01);
    icRadiusRatioSlider.position(20, 50);

    numStripesSlider = createSlider(2, 150, 8);
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

    numCirclesSlider = createSlider(1, 100, 1);
    numCirclesSlider.position(20, 230);

    interCircleSpaceSlider = createSlider(0, 200, 30);
    interCircleSpaceSlider.position(20, 260);

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
    ocRadius = ocRadiusSlider.value();
    icRadiusRatio = icRadiusRatioSlider.value();
    numStripes = numStripesSlider.value();
    rotationSpeed = rotationSpeedSlider.value();
    stripeColor1 = stripeColorInput1.value();
    stripeColor2 = stripeColorInput2.value();
    icColor = icColorInput.value();
    numCircles = numCirclesSlider.value();
    interCircleSpace = interCircleSpaceSlider.value();

    // Draw divider
    divider_width = textWidth(`(${interCircleSpace}) Space between circles`) + interCircleSpaceSlider.x * 2 + interCircleSpaceSlider.width + 30
    push();
    fill("#272727");
    rect(0, 0, divider_width, height);
    pop();

    // Draw text
    fill("#FFFFFF");
    text(`(${ocRadius}) Radius`, ocRadiusSlider.x * 2 + ocRadiusSlider.width, ocRadiusSlider.y + 7);
    text(`(${icRadiusRatio}) Inner/Outer ratio`, icRadiusRatioSlider.x * 2 + icRadiusRatioSlider.width, icRadiusRatioSlider.y + 7);
    text(`(${numStripes}) Number of stripes`, numStripesSlider.x * 2 + numStripesSlider.width, numStripesSlider.y + 7);
    text(`(${rotationSpeed} rad/s) Rotation speed`, rotationSpeedSlider.x * 2 + rotationSpeedSlider.width, rotationSpeedSlider.y + 7);
    text("Stripe color 1", rotationSpeedSlider.x * 2 + rotationSpeedSlider.width, rotationSpeedSlider.y + 7 + 30);
    text("Stripe color 2", rotationSpeedSlider.x * 2 + rotationSpeedSlider.width, rotationSpeedSlider.y + 7 + 60);
    text("Inner circle color", rotationSpeedSlider.x * 2 + rotationSpeedSlider.width, rotationSpeedSlider.y + 7 + 90);
    text(`(${numCircles}) Number of circles`, numCirclesSlider.x * 2 + numCirclesSlider.width, numCirclesSlider.y + 7);
    text(`(${interCircleSpace}) Space between circles`, interCircleSpaceSlider.x * 2 + interCircleSpaceSlider.width, interCircleSpaceSlider.y + 7);

    remainingWidth = width - divider_width;
    maxCols = Math.floor(remainingWidth / (ocRadius*2 + interCircleSpace));
    maxRows = Math.floor(height / (ocRadius*2 + interCircleSpace));

    if (numCircles > maxCols*maxRows) {
        fill("#FF0000");
        text(`Max ${maxCols*maxRows} circles can be drawn due to space restriction.`,
            15,
            interCircleSpaceSlider.y + 37);
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
        circle(0, 0, ocRadius*icRadiusRatio*2);
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
