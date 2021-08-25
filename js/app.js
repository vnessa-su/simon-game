const gameStorage = new DataStorage();
const game = gameStorage.getGameObject();
game.dataStorage = gameStorage;

createNumberOfButtonsSelect(game);
createGameStartButton(game);
generateGameButtons(game);

displayCurrentLevel(game.currentLevel);
createResetButton(game);
createLevelSelect(game);
