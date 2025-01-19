let num = 1;
let lock = null;
let timer = null;
const boxes = [];
const total = 100;
let started = false;

const clearTimer = e => {
    if (timer !== null) {
        clearTimeout(timer);
        timer = null;
    }
};

const speak = o => {
    const {num, box} = o;
    const utter = new SpeechSynthesisUtterance(num);
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
    box.classList.add('shake');
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    utter.onend = () => box.classList.remove('shake');
};

const play = e => {
    speak({num, box: boxes[num - 1]});
    num = num < total ? ++num : 1;
    timer = setTimeout(play, 2500);
};

const control = e => {
    started = !started;
    if (started === true) {
        start();
        document.querySelector('#control').textContent = 'Stop';
    } else {
        stop();
        document.querySelector('#control').textContent = 'Start';
    }
};

const start = e => {
    play();
    requestLock();
};

const stop = e => {
    clearTimer();
    releaseLock();
};

const update = n => {
    stop();
    num = n;
    start();
};

const requestLock = async e => lock = await navigator.wakeLock.request('screen');

const releaseLock = e => {
    if (lock !== null) {
        lock.release();
        lock = null;
    }
};

document.addEventListener('visibilitychange', e => {
    if (document.visibilityState === 'hidden') {
        stop();
    } else {
        start();
    }
});

document.querySelector('#control').addEventListener('click', control);
document.addEventListener('DOMContentLoaded', e => {
    const container = document.querySelector('.container');
    for (let i = 1; i <= total; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.textContent = i;
        box.onclick = e => update(i);
        boxes.push(box);
        container.appendChild(box);
    }
});