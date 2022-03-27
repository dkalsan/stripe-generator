/*
Adapted from https://github.com/JunShern/fish-stripes/
*/

let autoInstructions = [];
let instructionCounter = 1;
let totalInstructions;


class Timer {
    constructor() {
        this.counter = 0;
        this.running = false;
    }

    start(seconds, updateCallback, endCallback) {
        if (seconds == 0) {
            endCallback();
        } else {
            this.counter = seconds;
            this.running = true;
            this.interval = setInterval(() => {
                this.counter--;
                updateCallback(this.counter);
                if (this.counter <= 0) {
                    endCallback();
                    // Reset
                    this.counter = 0;
                    this.running = false;
                    clearInterval(this.interval);
                }
            }, 1000);
        }
    }

}


class Instruction {
    constructor(timer, numStripes, rotationSpeed, stripeColor1, stripeColor2) {
        this.timer = timer;
        this.numStripes = numStripes;
        this.rotationSpeed = rotationSpeed;
        this.stripeColor1 = stripeColor1;
        this.stripeColor2 = stripeColor2;
    }
}


function startAutomation() {
    fullCommandString = textArea.value();
    console.log(fullCommandString);
    console.log("Parsing...");
    commandStrings = fullCommandString.split(/\r?\n/);
    for (let i = 0; i < commandStrings.length; i++) {
        commandString = commandStrings[i];
        command = commandString.split(',').map(x => x.trim());
        console.log(i + 1, command);

        // Input validation
        if (isNaN(Number(command[0]))) {
            // Timer
            alert(`Error on line ${i + 1} "${commandString}":\n${command[0]} is not a valid number`);
        }
        if (isNaN(Number(command[1]))) {
            // Number of stripes
            alert(`Error on line ${i + 1} "${commandString}":\n${command[1]} is not a valid number`);
        }
        if (isNaN(Number(command[2]))) {
            // Rotation speed
            alert(`Error on line ${i + 1} "${commandString}":\n${command[2]} is not a valid number`);
        }
        if (!(/^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(command[3]))) {
            // Stripe color 1
            alert(`Error on line ${i + 1} "${commandString}":\n${command[3]} is not a valid HEX string`);
        }
        if (!(/^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(command[4]))) {
            // Stripe color 2
            alert(`Error on line ${i + 1} "${commandString}":\n${command[4]} is not a valid HEX string`);
        }

        instruction = new Instruction(Number(command[0]), Number(command[1]), Number(command[2]), command[3], command[4]);
        autoInstructions.push(instruction);
    }
    instructionCounter = 1;
    totalInstructions = autoInstructions.length;
    executeNextInstruction();
}


function executeNextInstruction() {
    if (autoInstructions.length <= 0) {
        console.log("Done!");
        autoStatus.html("Done!");
        return;
    }

    instruction = autoInstructions.shift();
    autoStatus.html(`(${instructionCounter} / ${totalInstructions})<br>${instruction.timer}s remaining with configuration:<br>
    numStripes=${instruction.numStripes},<br>rotationSpeed=${instruction.rotationSpeed},<br>
    stripeColor1=${instruction.stripeColor1},<br>stripeColor2=${instruction.stripeColor2}.`);

    console.log("Executing", instruction)

    numStripes = instruction.numStripes;
    numStripesSlider.value(numStripes);
    numStripesInput.value(numStripes);

    rotationSpeed = instruction.rotationSpeed;
    rotationSpeedSlider.value(rotationSpeed);
    rotationSpeedInput.value(rotationSpeed);

    stripeColor1 = instruction.stripeColor1;
    stripeColorInput1.html(stripeColor1);

    stripeColor2 = instruction.stripeColor2;
    stripeColorInput1.html(stripeColor2);

    let timer = new Timer();
    timer.start(
        seconds = instruction.timer,
        updateCallback = (count) => {
            autoStatus.html(`(${instructionCounter} / ${totalInstructions})<br>${count}s remaining with configuration:<br>
                numStripes=${instruction.numStripes},<br>rotationSpeed=${instruction.rotationSpeed},<br>
                stripeColor1=${instruction.stripeColor1},<br>stripeColor2=${instruction.stripeColor2}.`);
        },
        endCallback = () => {
            instructionCounter++;
            executeNextInstruction();
        }
    );
}