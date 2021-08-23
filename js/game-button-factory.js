class GameButtonFactory {
    constructor() {
        this.buttons = [];
        this.currentId = 0;
    }

    generateButton = (buttonSoundHz) => {
        const newButton = new GameButton(this.currentId, buttonSoundHz);
        this.buttons.push(newButton);
        this.currentId++;
    };

    generateMultipleButtons = (numberOfButtons, soundListHz) => {
        for (let i = 0; i < numberOfButtons; i++) {
            const buttonSound = soundListHz[i];
            this.generateButton(buttonSound);
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
