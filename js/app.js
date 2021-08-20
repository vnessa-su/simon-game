const gameContainer = document.getElementById("game-container");

const createGameStartButton = () => {
    const startButton = document.createElement("button");
    startButton.innerText = "Start Next";
    gameContainer.appendChild(startButton);
};

const generateGameButtons = (numberOfButtons) => {
    for (let i = 0; i < numberOfButtons; i++) {
        const gameButton = document.createElement("button");
        gameButton.setAttribute("class", "game-button");
        gameButton.innerText = `Button ${i}`;
        gameButton.id = i;
        gameContainer.appendChild(gameButton);
    }
};

const generateRandomPattern = (sequenceLength, numberOfButtons) => {
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        const randomButtonNumber = Math.floor(Math.random() * numberOfButtons);
        sequence.push(randomButtonNumber);
    }
    console.log(sequence);
    return sequence;
};

const highlightButtonsInSequence = () => {
    const sequenceOfButtons = generateRandomPattern(4, 4);
    sequenceOfButtons.forEach((buttonId, sequenceIndex) => {
        setTimeout(() => {
            const buttonToHighlight = document.getElementById(buttonId);
            buttonToHighlight.focus();
        }, 1000 * sequenceIndex);
    });
};

createGameStartButton();
generateGameButtons(4);
highlightButtonsInSequence();
