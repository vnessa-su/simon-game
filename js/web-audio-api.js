// Web Audio API implementation inspired by MDN documentation:
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
        console.log(noteToPlayHz);
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        let osc = audioCtx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = noteToPlayHz;

        let amp = audioCtx.createGain();
        amp.gain.value = -1;

        let lfo = audioCtx.createOscillator();
        lfo.type = "cosine";
        lfo.frequency.value = 2 * noteToPlayHz;

        lfo.connect(amp.gain);
        osc.connect(amp).connect(audioCtx.destination);
        lfo.start();
        osc.start(delaySeconds);
        osc.stop(delaySeconds + durationSeconds);
    };
}
