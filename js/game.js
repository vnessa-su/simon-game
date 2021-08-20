class Game {
    constructor() {
        this.numberOfButtons = 4;
        this.currentLevel = 1;
        this.currentButtonSequence = [];
    }

    generateRandomSequence = () => {
        console.log("generating sequence");
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
