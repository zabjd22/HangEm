const {
    ipcRenderer,
    remote
} = require('electron');

const mainProcess = remote.require('./main.js');
const currentWindow = remote.getCurrentWindow();

const exitBtn = document.querySelector('#exitBtn');
const newGameBtn = document.querySelector('#newgameBtn');
const menuBtn = document.getElementById('mainmenu');
const quitBtn = document.getElementById('quitgame');
const letter_field = document.getElementsByClassName('letter');

if (exitBtn) exitBtn.addEventListener('click', event =>  mainProcess.exitGame())
if (newGameBtn) newGameBtn.addEventListener('click', event => mainProcess.startGame(currentWindow));
if (menuBtn) menuBtn.addEventListener('click', event =>  mainProcess.mainMenu(currentWindow));
if(quitBtn) quitBtn.addEventListener('click', event =>  mainProcess.exitGame());

for (let letter of letter_field) {
    const letterInput = letter.children[0];

    letterInput.addEventListener('focus', (event) => {
        letter.classList.remove('blur-letter');    
        letter.classList.add('focus-letter');
    });

    letterInput.addEventListener('blur', (event) => {
        letter.classList.remove('focus-letter');
        letter.classList.add('blur-letter');
    });

    letterInput.addEventListener('keydown', (event) => {
        if(letterInput.value.length < 1) String.fromCharCode(event.keycode);
        else event.preventDefault();
    });
}

ipcRenderer.on('ping', (event, message) => {
    console.log(message);
});

