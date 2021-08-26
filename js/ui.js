///////////////////////
// Event Handlers
///////////////////////

const windowResizeHandler = (gameObject) => {
    return () => {
        createNumberOfButtonsSelect(gameObject);
        if (window.innerWidth < 630 && gameObject.numberOfButtons > 49) {
            gameObject.numberOfButtons = 49;
        }
        generateGameButtons(gameObject);
    };
};

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

const createClickButton = (buttonText, clickHandler) => {
    const newButton = document.createElement("button");
    newButton.innerText = buttonText;
    newButton.addEventListener("click", clickHandler);
    return newButton;
};

const createSelectWithDefault = (selectId, defaultText) => {
    const newSelect = document.createElement("select");
    newSelect.id = selectId;

    const defaultOption = document.createElement("option");
    defaultOption.innerText = defaultText;
    defaultOption.value = "";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    newSelect.appendChild(defaultOption);

    return newSelect;
};

const createGameStartButton = (gameObject) => {
    const gameContainer = document.getElementById("game-container");

    const startButton = createClickButton(
        "Start Next Sequence",
        gameStartButtonClickHandler(gameObject)
    );
    startButton.setAttribute("class", "btn btn-success btn-sm");
    gameContainer.appendChild(startButton);
};

const createNumberOfButtonsSelect = (gameObject) => {
    const gameContainer = document.getElementById("game-container");

    let buttonNumberOptions = [4, 9, 16, 25, 36, 49, 64, 81, 100];
    if (window.innerWidth < 630) {
        buttonNumberOptions = [4, 9, 16, 25, 36, 49];
    }

    let buttonNumberSelectContainer = document.getElementById(
        "button-number-select-container"
    );
    if (buttonNumberSelectContainer) {
        buttonNumberSelectContainer.innerHTML = "";
    } else {
        buttonNumberSelectContainer = document.createElement("div");
        buttonNumberSelectContainer.id = "button-number-select-container";
        gameContainer.appendChild(buttonNumberSelectContainer);
    }

    const buttonNumberSelect = createSelectWithDefault(
        "button-number-select",
        "Number of Game Buttons:"
    );
    buttonNumberSelect.setAttribute("class", "form-select btn-sm");
    buttonNumberSelectContainer.appendChild(buttonNumberSelect);

    for (let i = 0; i < buttonNumberOptions.length; i++) {
        const newOption = document.createElement("option");
        const numberOption = buttonNumberOptions[i];
        newOption.innerText = numberOption;
        newOption.value = numberOption;
        buttonNumberSelect.appendChild(newOption);
    }

    let generateGameButton = document.querySelector(
        "#button-number-select-container button"
    );
    if (!generateGameButton) {
        generateGameButton = createClickButton(
            "Generate",
            generateGameButtonClickHandler(gameObject)
        );
        generateGameButton.setAttribute("class", "btn btn-primary btn-sm");
        buttonNumberSelectContainer.appendChild(generateGameButton);
    }
};

const generateGameButtons = (gameObject) => {
    const gameContainer = document.getElementById("game-container");

    let gameButtonContainer = document.getElementById("game-button-container");
    if (!gameButtonContainer) {
        gameButtonContainer = document.createElement("div");
        gameButtonContainer.id = "game-button-container";
        gameContainer.appendChild(gameButtonContainer);
    }

    const numberOfButtons = gameObject.numberOfButtons;
    let buttonSize =
        Math.floor(
            gameButtonContainer.clientWidth /
                Math.floor(Math.sqrt(numberOfButtons))
        ) - 5;
    if (numberOfButtons < 9) {
        buttonSize = Math.floor(
            gameButtonContainer.clientWidth / numberOfButtons
        );
    }

    const buttonGroup = gameObject.gameButtonGroup;
    if (buttonGroup.buttons.length !== numberOfButtons) {
        gameObject.generateButtonGroup();
        gameObject.dataStorage.setGameObject(gameObject);
    }

    const allGameButtons = document.querySelectorAll(".game-button");
    allGameButtons.forEach((button) => {
        button.remove();
    });

    buttonGroup.buttons.forEach((button) => {
        const gameButton = document.createElement("button");
        gameButton.setAttribute("class", "game-button");
        gameButton.innerHTML = `<i class="fa ${button.iconName}">`;
        gameButton.id = button.id;
        gameButton.style.backgroundColor = button.colorHex;
        gameButton.style.width = `${buttonSize}px`;
        gameButton.style.height = `${buttonSize}px`;
        gameButton.addEventListener(
            "click",
            gameButtonClickHandler(gameObject)
        );
        gameButtonContainer.appendChild(gameButton);
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
    const resetButton = createClickButton(
        "New Game",
        resetButtonClickHandler(gameObject)
    );
    resetButton.setAttribute("class", "btn btn-primary btn-sm");
    levelDisplay.appendChild(resetButton);
};

const createLevelSelect = (gameObject) => {
    const levelDisplay = document.getElementById("level-display-container");

    const levelSelectContainer = document.createElement("div");
    levelSelectContainer.id = "level-select-container";
    levelDisplay.appendChild(levelSelectContainer);

    updateLevelSelect(gameObject.maxLevelCompleted);

    const goToLevelButton = createClickButton(
        "Go To Level",
        goToLevelButtonClickHandler(gameObject)
    );
    goToLevelButton.setAttribute("class", "btn btn-primary btn-sm");
    levelSelectContainer.appendChild(goToLevelButton);
};

const updateLevelSelect = (maxLevelCompleted) => {
    const levelSelectContainer = document.getElementById(
        "level-select-container"
    );
    let levelSelect = document.getElementById("level-select");
    if (levelSelect) {
        levelSelect.remove();
    }

    levelSelect = createSelectWithDefault("level-select", "Select a Level:");
    levelSelect.setAttribute("class", "form-select btn-sm");
    levelSelectContainer.insertBefore(
        levelSelect,
        levelSelectContainer.firstChild
    );

    for (let i = 1; i <= maxLevelCompleted; i++) {
        const newOption = document.createElement("option");
        newOption.innerText = `Level ${i}`;
        newOption.value = i;
        levelSelect.appendChild(newOption);
    }
};
