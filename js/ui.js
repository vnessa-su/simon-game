///////////////////////
// Event Handlers
///////////////////////

const gameStartButtonClickHandler = (gameObject) => {
    return () => {
        highlightButtonsInSequence(gameObject);
        gameButtonsAreDisabled(false);
        displayResultMessage("");
    };
};

const generateGameButtonClickHandler = (gameObject) => {
    return () => {
        const numberOfButtonsSelected = parseInt(
            document.getElementById("button-number-select").value
        );

        if (numberOfButtonsSelected) {
            gameObject.numberOfButtons = numberOfButtonsSelected;
            generateGameButtons(gameObject);
            gameObject.dataStorage.setGameObject(gameObject);
        }
    };
};

const gameButtonClickHandler = (gameObject) => {
    return (e) => {
        if (gameObject.userCanClickGameButtons) {
            const buttonSequence = gameObject.currentButtonSequence;
            const buttonId = parseInt(e.currentTarget.id);

            const button = gameObject.gameButtonGroup.getButtonById(buttonId);
            gameObject.webAudioApi.playNote(button.soundHz, 0.2, 0);

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
                updateLevelSelect(gameObject.maxLevelCompleted);
            }

            gameObject.dataStorage.setGameObject(gameObject);
        }
        e.currentTarget.blur();
    };
};

const resetButtonClickHandler = (gameObject) => {
    return () => {
        gameObject.resetLevels();
        displayCurrentLevel(gameObject.currentLevel);
        updateLevelSelect(gameObject.maxLevelCompleted);

        gameObject.dataStorage.setGameObject(gameObject);
    };
};

const goToLevelButtonClickHandler = (gameObject) => {
    return () => {
        const selectedLevel = document.getElementById("level-select").value;
        if (selectedLevel) {
            gameObject.currentLevel = selectedLevel;
            displayCurrentLevel(gameObject.currentLevel);

            gameObject.dataStorage.setGameObject(gameObject);
        }
    };
};

///////////////////////
// UI Functions
///////////////////////

const gameButtonsAreDisabled = (buttonState) => {
    const allGameButtons = document.querySelectorAll(".game-button");
    allGameButtons.forEach((button) => {
        button.disabled = buttonState;
    });
};

const createGameStartButton = (gameObject) => {
    const gameContainer = document.getElementById("game-container");

    const startButton = document.createElement("button");
    startButton.innerText = "Start Next";
    startButton.addEventListener(
        "click",
        gameStartButtonClickHandler(gameObject)
    );
    gameContainer.appendChild(startButton);
};

const createNumberOfButtonsSelect = (gameObject) => {
    const buttonNumberOptions = [4, 9, 16, 25, 36, 49, 64, 81, 100];
    const gameContainer = document.getElementById("game-container");

    const buttonNumberSelect = document.createElement("select");
    buttonNumberSelect.id = "button-number-select";
    gameContainer.appendChild(buttonNumberSelect);

    const defaultOption = document.createElement("option");
    defaultOption.innerText = "Number of Game Buttons:";
    defaultOption.value = "";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    buttonNumberSelect.appendChild(defaultOption);

    for (let i = 0; i < buttonNumberOptions.length; i++) {
        const newOption = document.createElement("option");
        const numberOption = buttonNumberOptions[i];
        newOption.innerText = numberOption;
        newOption.value = numberOption;
        buttonNumberSelect.appendChild(newOption);
    }

    const generateGameButton = document.createElement("button");
    generateGameButton.innerText = "Generate";
    generateGameButton.addEventListener(
        "click",
        generateGameButtonClickHandler(gameObject)
    );
    gameContainer.appendChild(generateGameButton);
};

const generateGameButtons = (gameObject) => {
    const gameContainer = document.getElementById("game-container");

    const buttonGroup = gameObject.gameButtonGroup;
    if (buttonGroup.buttons.length !== gameObject.numberOfButtons) {
        const audio = gameObject.webAudioApi;
        const buttonSoundList = audio.generateRandomNoteArray(
            gameObject.numberOfButtons
        );

        const color = gameObject.colorPalette;
        const buttonColorList = color.generateSquareGridColors(
            gameObject.numberOfButtons
        );

        buttonGroup.resetFactory();
        buttonGroup.generateMultipleButtons(
            gameObject.numberOfButtons,
            buttonSoundList,
            buttonColorList
        );

        gameObject.dataStorage.setGameObject(gameObject);
    }

    const allGameButtons = document.querySelectorAll(".game-button");
    allGameButtons.forEach((button) => {
        button.remove();
    });

    buttonGroup.buttons.forEach((button) => {
        const gameButton = document.createElement("button");
        gameButton.setAttribute("class", "game-button");
        gameButton.innerText = `Button ${button.id}`;
        gameButton.id = button.id;
        gameButton.style.backgroundColor = button.colorHex;
        gameButton.addEventListener(
            "click",
            gameButtonClickHandler(gameObject)
        );
        gameContainer.appendChild(gameButton);
    });

    gameButtonsAreDisabled(true);
};

const highlightButtonsInSequence = (gameObject) => {
    const buttonGroup = gameObject.gameButtonGroup;
    const audio = gameObject.webAudioApi;

    gameObject.userCanClickGameButtons = false;

    gameObject.generateRandomSequence();
    const sequenceOfButtons = gameObject.currentButtonSequence;
    sequenceOfButtons.forEach((buttonId, sequenceIndex) => {
        setTimeout(() => {
            const buttonToHighlight = document.getElementById(buttonId);
            buttonToHighlight.blur();
            buttonToHighlight.focus();

            const button = buttonGroup.getButtonById(buttonId);
            audio.playNote(button.soundHz, 0.2, 0);
            if (sequenceIndex === sequenceOfButtons.length - 1) {
                gameObject.userCanClickGameButtons = true;
            }
        }, 550 * sequenceIndex);
    });

    gameObject.dataStorage.setGameObject(gameObject);
};

const displayResultMessage = (resultMessage) => {
    const resultsDisplay = document.getElementById("results-container");
    resultsDisplay.innerHTML = `<h3>${resultMessage}</h3>`;
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

const createLevelSelect = (gameObject) => {
    const levelDisplay = document.getElementById("level-display-container");
    const levelSelect = document.createElement("select");
    levelSelect.id = "level-select";
    levelDisplay.appendChild(levelSelect);

    updateLevelSelect(gameObject.maxLevelCompleted);

    const goToLevelButton = document.createElement("button");
    goToLevelButton.innerText = "Go To Level";
    goToLevelButton.addEventListener(
        "click",
        goToLevelButtonClickHandler(gameObject)
    );
    levelDisplay.appendChild(goToLevelButton);
};

const updateLevelSelect = (maxLevelCompleted) => {
    const levelSelect = document.getElementById("level-select");
    levelSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.innerText = "Select a Level:";
    defaultOption.value = "";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    levelSelect.appendChild(defaultOption);

    for (let i = 1; i <= maxLevelCompleted; i++) {
        const newOption = document.createElement("option");
        newOption.innerText = `Level ${i}`;
        newOption.value = i;
        levelSelect.appendChild(newOption);
    }
};