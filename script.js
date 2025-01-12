let num = 1;
let timer = null;
const boxes = [];
const total = 100;

const speak = (n, e) => {
    const utter = new SpeechSynthesisUtterance(n);
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
    e.classList.add('shake');
    utter.onend = () => e.classList.remove('shake');
};

const start = n => {
    clearTimeout(timer);
    num = n;
    play();
};

const play = e => {
    speak(num, boxes[num - 1]);
    num = num < total ? ++num : 1;
    timer = setTimeout(play, 2500);
};

document.addEventListener('DOMContentLoaded', e => {
    const container = document.querySelector('.container');
    for (let i = 1; i <= total; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.textContent = i;
        box.onclick = e => start(i);
        boxes.push(box);
        container.appendChild(box);
    }
});