class GameButtonFactory {
    constructor() {
        this.buttons = [];
        this.currentId = 0;
    }

    generateButton = (buttonSoundHz, buttonColorHex) => {
        const newButton = new GameButton(
            this.currentId,
            buttonSoundHz,
            buttonColorHex
        );
        this.buttons.push(newButton);
        this.currentId++;
    };

    generateMultipleButtons = (numberOfButtons, soundListHz, colorListHex) => {
        for (let i = 0; i < numberOfButtons; i++) {
            const buttonSound = soundListHz[i];
            const buttonColor = colorListHex[i];
            this.generateButton(buttonSound, buttonColor);
        }
    };

    resetFactory = () => {
        this.buttons = [];
        this.currentId = 0;
    };

    getButtonById = (id) => {
        return this.buttons.find((element) => element.id === id);
    };
}
