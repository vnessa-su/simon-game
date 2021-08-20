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
        gameButton.addEventListener("click", gameButtonClickHandler);
        gameContainer.appendChild(gameButton);
    }
    gameButtonsAreDisabled(true);
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

const gameStartButtonClickHandler = () => {
    highlightButtonsInSequence();
    gameButtonsAreDisabled(false);
};

const gameButtonClickHandler = (e) => {
    const buttonId = parseInt(e.currentTarget.id);
    if (buttonId === currentSequence[0]) {
        currentSequence.shift();
    } else {
        displayResult("lose");
        gameButtonsAreDisabled(true);
    }

    if (currentSequence.length === 0) {
        displayResult("win");
        gameButtonsAreDisabled(true);
    }
    console.log(currentSequence);
};

const displayResult = (result) => {
    const resultsDisplay = document.getElementById("results-container");
    if (result === "win") {
        resultsDisplay.innerHTML = "<h3>You did it!</h3>";
    } else if (result === "lose") {
        resultsDisplay.innerHTML = "<h3>Wrong button!</h3>";
    }
};

const gameButtonsAreDisabled = (buttonState) => {
    const allGameButtons = document.querySelectorAll(".game-button");
    allGameButtons.forEach((button) => {
        button.disabled = buttonState;
    });
};

createGameStartButton();
generateGameButtons(numberOfButtons);
