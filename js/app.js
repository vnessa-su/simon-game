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

createGameStartButton();
generateGameButtons(4);
