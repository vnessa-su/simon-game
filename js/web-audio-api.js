// Web Audio API implementation modified from MDN documentation:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques

class WebAudioApi {
    constructor() {
        this.notesHz = [
            55.0, 58.27, 61.74, 65.41, 69.3, 73.42, 77.78, 82.4, 87.31, 92.5,
            98.0, 103.83, 110.0, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56,
            164.81, 174.61, 185.0, 196.0, 207.65, 220.0, 233.08, 246.94, 261.63,
            277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0,
            466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 359.26, 398.46,
            739.99, 783.99, 830.61, 880.0, 932.33, 987.77, 1046.5, 1108.73,
            1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22,
            1760.0,
        ];
    }

    getRandomNoteFrequencyHz = () => {
        const randomIndex = Math.floor(Math.random() * this.notesHz.length);
        return this.notesHz[randomIndex];
    };

    generateRandomNoteArray = (arrayLength) => {
        let arrayLengthLimit = arrayLength;
        let remainingNotes = 0;
        if (arrayLength > this.notesHz.length) {
            arrayLengthLimit = this.notesHz.length;
            remainingNotes = arrayLength - this.notesHz.length;
        }

        const randomNoteArray = [];
        while (randomNoteArray.length < arrayLengthLimit) {
            const randomFrequency = this.getRandomNoteFrequencyHz();
            if (!randomNoteArray.includes(randomFrequency)) {
                randomNoteArray.push(randomFrequency);
            }
        }

        for (let i = 0; i < remainingNotes; i++) {
            randomNoteArray.push(randomNoteArray[i]);
        }

        return randomNoteArray;
    };

    playNote = (noteToPlayHz, durationSeconds, delaySeconds) => {
        console.log(noteToPlayHz);
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        let oscillator = audioCtx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = noteToPlayHz;

        let amplifier = audioCtx.createGain();
        if (noteToPlayHz > 900) {
            amplifier.gain.value = 0.2;
        } else if (noteToPlayHz > 300) {
            amplifier.gain.value = 0.4;
        } else if (noteToPlayHz < 100) {
            amplifier.gain.value = 6;
        } else {
            amplifier.gain.value = 2;
        }

        oscillator.connect(amplifier).connect(audioCtx.destination);
        oscillator.start(delaySeconds);
        oscillator.stop(delaySeconds + durationSeconds);
    };
}
