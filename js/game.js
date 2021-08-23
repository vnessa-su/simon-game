class Game {
    constructor() {
        this.currentLevel = 1;
        this.currentButtonSequence = [];
        this.numberOfButtons = 4;
        this.gameButtonGroup = new GameButtonFactory();
        this.webAudioApi = new WebAudioApi();
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
    };
}
