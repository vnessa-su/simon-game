class Game {
    constructor() {
        this.currentLevel = 1;
        this.maxLevelCompleted = 1;
        this.currentButtonSequence = [];
        this.numberOfButtons = 4;
        this.gameButtonGroup = new GameButtonFactory();
        this.webAudioApi = new WebAudioApi();
        this.dataStorage;
    }

    generateRandomSequence = () => {
        const sequence = [];
        for (let i = 0; i < this.currentLevel; i++) {
            const randomButtonNumber = Math.floor(
                Math.random() * this.numberOfButtons
            );
            sequence.push(randomButtonNumber);
        }
        this.currentButtonSequence = sequence;
    };

    incrementLevel = () => {
        this.currentLevel++;
        if (this.currentLevel > this.maxLevelCompleted) {
            this.maxLevelCompleted = this.currentLevel;
        }
    };

    resetLevels = () => {
        this.currentLevel = 1;
        this.maxLevelCompleted = 1;
    };
}
