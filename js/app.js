let currentSequence = [];
let sequenceLength = 4;
let numberOfButtons = 4;

const gameContainer = document.getElementById("game-container");

const createGameStartButton = () => {
    const startButton = document.createElement("button");
    startButton.innerText = "Start Next";
    startButton.addEventListener("click", gameStartButtonClickHandler);
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

const generateRandomPattern = (patternLength, numberLimit) => {
    const sequence = [];
    for (let i = 0; i < patternLength; i++) {
        const randomButtonNumber = Math.floor(Math.random() * numberLimit);
        sequence.push(randomButtonNumber);
    }
    return sequence;
};

const highlightButtonsInSequence = () => {
    const sequenceOfButtons = generateRandomPattern(
        sequenceLength,
        numberOfButtons
    );
    currentSequence = sequenceOfButtons;
    console.log(currentSequence);
    sequenceOfButtons.forEach((buttonId, sequenceIndex) => {
        setTimeout(() => {
            const buttonToHighlight = document.getElementById(buttonId);
            buttonToHighlight.blur();
            buttonToHighlight.focus();
        }, 1000 * sequenceIndex);
    });
};

const gameStartButtonClickHandler = (e) => {
    highlightButtonsInSequence();
};

createGameStartButton();
generateGameButtons(numberOfButtons);
