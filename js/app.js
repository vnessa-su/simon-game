const gameContainer = document.getElementById("game-container");

const createGameStartButton = (gameObject) => {
    const startButton = document.createElement("button");
    startButton.innerText = "Start Next";
    startButton.addEventListener(
        "click",
        gameStartButtonClickHandler(gameObject)
    );
    gameContainer.appendChild(startButton);
};

const generateGameButtons = (gameObject) => {
    for (let i = 0; i < gameObject.numberOfButtons; i++) {
        const gameButton = document.createElement("button");
        gameButton.setAttribute("class", "game-button");
        gameButton.innerText = `Button ${i}`;
        gameButton.id = i;
        gameButton.addEventListener(
            "click",
            gameButtonClickHandler(gameObject)
        );
        gameContainer.appendChild(gameButton);
    }
    gameButtonsAreDisabled(true);
};

const highlightButtonsInSequence = (gameObject) => {
    gameObject.generateRandomSequence();
    console.log(gameObject.currentButtonSequence);
    const sequenceOfButtons = gameObject.currentButtonSequence;
    sequenceOfButtons.forEach((buttonId, sequenceIndex) => {
        setTimeout(() => {
            const buttonToHighlight = document.getElementById(buttonId);
            buttonToHighlight.blur();
            buttonToHighlight.focus();
            audio.playNote(audio.getRandomNoteFrequencyHz(), 0.2, 0);
        }, 550 * sequenceIndex);
    });
};

const gameStartButtonClickHandler = (gameObject) => {
    return () => {
        highlightButtonsInSequence(gameObject);
        gameButtonsAreDisabled(false);
        displayResultMessage("");
    };
};

const gameButtonClickHandler = (gameObject) => {
    return (e) => {
        audio.playNote(audio.getRandomNoteFrequencyHz(), 0.2, 0);
        const buttonId = parseInt(e.currentTarget.id);
        const buttonSequence = gameObject.currentButtonSequence;
        if (buttonId === buttonSequence[0]) {
            buttonSequence.shift();
        } else {
            displayResultMessage("Wrong button!");
            gameButtonsAreDisabled(true);
        }

        if (buttonSequence.length === 0) {
            displayResultMessage("You did it!");
            gameButtonsAreDisabled(true);
            gameObject.incrementLevel();
            displayCurrentLevel(gameObject.currentLevel);
        }
        e.currentTarget.blur();
        console.log(buttonSequence);
    };
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

const createResetButton = (gameObject) => {
    const levelDisplay = document.getElementById("level-display-container");
    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset to Level 1";
    resetButton.addEventListener("click", resetButtonClickHandler(gameObject));
    levelDisplay.appendChild(resetButton);
};

const resetButtonClickHandler = (gameObject) => {
    return () => {
        gameObject.currentLevel = 1;
        displayCurrentLevel(gameObject.currentLevel);
    };
};

const game = new Game();
createGameStartButton(game);
generateGameButtons(game);
displayCurrentLevel(game.currentLevel);
createResetButton(game);

const audio = new WebAudioApi();
console.log(audio.generateRandomNoteArray(4, false));
console.log(audio.generateRandomNoteArray(4, true));
