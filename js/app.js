let currentSequence = [];
let sequenceLength = 4;
let numberOfButtons = 4;
let currentLevel = 1;

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
    displayResultMessage("");
};

const gameButtonClickHandler = (e) => {
    const buttonId = parseInt(e.currentTarget.id);
    if (buttonId === currentSequence[0]) {
        currentSequence.shift();
    } else {
        displayResultMessage("Wrong button!");
        gameButtonsAreDisabled(true);
    }

    if (currentSequence.length === 0) {
        displayResultMessage("You did it!");
        gameButtonsAreDisabled(true);
        currentLevel++;
        displayCurrentLevel(currentLevel);
    }
    e.currentTarget.blur();
    console.log(currentSequence);
};

const displayResultMessage = (resultMessage) => {
    const resultsDisplay = document.getElementById("results-container");
    resultsDisplay.innerHTML = `<h3>${resultMessage}</h3>`;
};

const gameButtonsAreDisabled = (buttonState) => {
    const allGameButtons = document.querySelectorAll(".game-button");
    allGameButtons.forEach((button) => {
        button.disabled = buttonState;
    });
};

const displayCurrentLevel = (level) => {
    const levelDisplay = document.getElementById("level-display-container");
    let levelText = document.querySelector("#level-display-container h3");
    if (!levelText) {
        levelText = document.createElement("h3");
        levelDisplay.insertBefore(levelText, levelDisplay.firstChild);
    }
    levelText.innerText = `Level: ${level}`;
};

const createResetButton = () => {
    const levelDisplay = document.getElementById("level-display-container");
    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset to Level 1";
    resetButton.addEventListener("click", resetButtonClickHandler);
    levelDisplay.appendChild(resetButton);
};

const resetButtonClickHandler = () => {
    currentLevel = 1;
    displayCurrentLevel(currentLevel);
};

createGameStartButton();
generateGameButtons(numberOfButtons);
displayCurrentLevel(currentLevel);
createResetButton();
