/*
Adapted from https://github.com/JunShern/fish-stripes/
*/

let autoInstructions = [];
let validCommands = ['start', 'stop'];
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
    constructor(timer, command, numStripes, rotationSpeed, stripeColor1, stripeColor2) {
        this.timer = timer;
        this.command = command;
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
        if (!validCommands.includes(command[1])) {
            // Command
            alert(`Error on line ${i + 1} "${commandString}":\n${command[1]} is not a valid command. Should be one of: ${validCommands}`);
        }
        if (isNaN(Number(command[2]))) {
            // Number of stripes
            alert(`Error on line ${i + 1} "${commandString}":\n${command[2]} is not a valid number`);
        }
        if (isNaN(Number(command[3]))) {
            // Rotation speed
            alert(`Error on line ${i + 1} "${commandString}":\n${command[3]} is not a valid number`);
        }
        if (!(/^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(command[4]))) {
            // Stripe color 1
            alert(`Error on line ${i + 1} "${commandString}":\n${command[4]} is not a valid HEX string`);
        }
        if (!(/^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(command[5]))) {
            // Stripe color 2
            alert(`Error on line ${i + 1} "${commandString}":\n${command[5]} is not a valid HEX string`);
        }

        instruction = new Instruction(Number(command[0]), command[1], Number(command[2]), Number(command[3]), command[4], command[5]);
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

    nextInstruction = autoInstructions.shift();
    autoStatus.html(`(${instructionCounter} / ${totalInstructions})<br>${nextInstruction.timer}s before executing "${nextInstruction.command}" with<br>
    numStripes=${nextInstruction.numStripes},<br>rotationSpeed=${nextInstruction.rotationSpeed},<br>
    stripeColor1=${nextInstruction.stripeColor1},<br>stripeColor2=${nextInstruction.stripeColor2}.`);

    console.log("Executing", nextInstruction)

    let timer = new Timer();
    timer.start(
        seconds = nextInstruction.timer,
        updateCallback = (count) => {
            autoStatus.html(`(${instructionCounter} / ${totalInstructions})<br>${count}s before executing "${nextInstruction.command}" with<br>
                numStripes=${nextInstruction.numStripes},<br>rotationSpeed=${nextInstruction.rotationSpeed},<br>
                stripeColor1=${nextInstruction.stripeColor1},<br>stripeColor2=${nextInstruction.stripeColor2}.`);
        },
        endCallback = () => {
            numStripes = nextInstruction.numStripes;
            numStripesSlider.value(numStripes);
            numStripesInput.value(numStripes);

            rotationSpeed = nextInstruction.rotationSpeed;
            rotationSpeedSlider.value(rotationSpeed);
            rotationSpeedInput.value(rotationSpeed);

            stripeColor1 = nextInstruction.stripeColor1;
            stripeColorInput1.html(stripeColor1);

            stripeColor2 = nextInstruction.stripeColor2;
            stripeColorInput1.html(stripeColor2);

            switch (nextInstruction.command) {
                case 'start':
                    playStopButton.html("Pause");
                    play = true;
                    break;
                case 'stop':
                    playStopButton.html("Resume");
                    play = false;
                    break;
            }
            instructionCounter++;
            executeNextInstruction();
        }
    );
}