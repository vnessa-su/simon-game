class ColorPalette {
    constructor(colorArray) {
        this.colorArray = colorArray || [
            "#80ffdb",
            "#72efdd",
            "#64dfdf",
            "#56cfe1",
            "#48bfe3",
            "#4ea8de",
            "#5390d9",
            "#5e60ce",
            "#6930c3",
            "#7400b8",
        ];
    }

    generateSquareGridColors(numberOfElements) {
        let squareLength = Math.floor(Math.sqrt(numberOfElements));
        let squareHeight = squareLength;
        if (squareLength < 3) {
            squareLength = numberOfElements;
            squareHeight = 1;
        }

        let increment = 1;
        if (squareLength <= Math.floor(this.colorArray.length / 2)) {
            increment = 2;
        }

        const colorArray = [];
        for (let i = 0; i < squareHeight; i++) {
            let currentColorIndex = 0;
            for (let j = 0; j < squareLength; j++) {
                const nextColor = this.colorArray[currentColorIndex];
                colorArray.push(nextColor);
                currentColorIndex += increment;
            }
        }

        return colorArray;
    }
}
