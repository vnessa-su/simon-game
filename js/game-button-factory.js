class GameButtonFactory {
    constructor() {
        this.buttons = [];
        this.currentId = 0;
    }

    generateButton = (buttonSoundHz, buttonColorHex, buttonIconName) => {
        const newButton = new GameButton(
            this.currentId,
            buttonSoundHz,
            buttonColorHex,
            buttonIconName
        );
        this.buttons.push(newButton);
        this.currentId++;
    };

    generateMultipleButtons = (
        numberOfButtons,
        soundListHz,
        colorListHex,
        iconNameList
    ) => {
        for (let i = 0; i < numberOfButtons; i++) {
            const buttonSound = soundListHz[i];
            const buttonColor = colorListHex[i];
            const buttonIcon = iconNameList[i];
            this.generateButton(buttonSound, buttonColor, buttonIcon);
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
