// Web Audio API implementation modified from MDN documentation:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques

class WebAudioApi {
    constructor() {
        this.notesHz = [329.63, 277.18, 220.0, 164.81]; //55.00-1760.00Hz range
    }

    getRandomNoteFrequencyHz = () => {
        const randomIndex = Math.floor(Math.random() * this.notesHz.length);
        return this.notesHz[randomIndex];
    };

    generateRandomNoteArray = (arrayLength, containsDuplicates) => {
        let arrayLengthLimit = arrayLength;
        if (!containsDuplicates) {
            arrayLengthLimit = this.notesHz.length;
        }
        const randomNoteArray = [];
        while (randomNoteArray.length < arrayLengthLimit) {
            const randomFrequency = this.getRandomNoteFrequencyHz();
            if (
                containsDuplicates ||
                !randomNoteArray.includes(randomFrequency)
            ) {
                randomNoteArray.push(randomFrequency);
            }
        }
        return randomNoteArray;
    };

    playNote = (noteToPlayHz, durationSeconds, delaySeconds) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        let oscillator = audioCtx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = noteToPlayHz;

        let amplifier = audioCtx.createGain();
        amplifier.gain.value = 2;

        oscillator.connect(amplifier).connect(audioCtx.destination);
        oscillator.start(delaySeconds);
        oscillator.stop(delaySeconds + durationSeconds);
    };
}
