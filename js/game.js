class Game {
    constructor() {
        this.currentLevel = 1;
        this.maxLevelCompleted = 1;
        this.currentButtonSequence = [];
        this.numberOfButtons = 4;
        this.userCanClickGameButtons = true;
        this.gameButtonGroup = new GameButtonFactory();
        this.webAudioApi = new WebAudioApi();
        this.dataStorage;
        this.colorPalette = new ColorPalette();
        this.fontAwesomeIcons = new FontAwesomeIcons();
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

    generateButtonGroup = () => {
        const audio = this.webAudioApi;
        const buttonSoundList = audio.generateRandomNoteArray(
            this.numberOfButtons
        );

        const color = this.colorPalette;
        const buttonColorList = color.generateSquareGridColors(
            this.numberOfButtons
        );

        const icons = this.fontAwesomeIcons;
        const iconNameList = icons.generateSetOfIcons(this.numberOfButtons);

        this.gameButtonGroup.resetFactory();
        this.gameButtonGroup.generateMultipleButtons(
            this.numberOfButtons,
            buttonSoundList,
            buttonColorList,
            iconNameList
        );
    };
}
