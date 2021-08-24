class DataStorage {
    setGameObject = (gameObject) => {
        localStorage.setItem("game-object", JSON.stringify(gameObject));
    };

    getGameObject = () => {
        const gameData = JSON.parse(localStorage.getItem("game-object"));
        const gameObject = new Game();
        if (gameData) {
            gameObject.currentLevel = gameData.currentLevel;
            gameObject.maxLevelCompleted = gameData.maxLevelCompleted;
            gameObject.currentButtonSequence = gameData.currentButtonSequence;
            gameObject.numberOfButtons = gameData.numberOfButtons;
            gameObject.gameButtonGroup.buttons =
                gameData.gameButtonGroup.buttons;
            gameObject.gameButtonGroup.currentId =
                gameData.gameButtonGroup.currentId;
        }
        return gameObject;
    };
}
