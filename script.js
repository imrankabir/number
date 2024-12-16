const container = document.querySelector('#container');

const speak = n => {
    const utter = new SpeechSynthesisUtterance(n);
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
};

for (let i = 1; i <= 100; i++) {
    const box = document.createElement('div');
    box.className = 'box';
    box.textContent = i;
    box.onclick = e => speak(i);
    container.appendChild(box);
}