const {
    ipcRenderer,
    remote
} = require('electron');

var puzzleword;

const mainProcess = remote.require('./main.js');
const currentWindow = remote.getCurrentWindow();

const exitBtn = document.querySelector('#exitBtn');
const newGameBtn = document.querySelector('#newgameBtn');
const gotoMenuBtn = document.getElementById('goto-mainmenu');
const quitBtn = document.getElementById('quitgame');
const checkBtn = document.getElementById('checkbtn');
const letter_field = document.getElementsByClassName('letter');

if (exitBtn) exitBtn.addEventListener('click', event => mainProcess.exitGame())
if (newGameBtn) newGameBtn.addEventListener('click', event => { mainProcess.newGame(currentWindow); });
if (gotoMenuBtn) gotoMenuBtn.addEventListener('click', event => mainProcess.goto_mainMenu(currentWindow));
if (quitBtn) quitBtn.addEventListener('click', event => mainProcess.exitGame());
if (checkBtn) checkBtn.addEventListener('click', event => console.log(puzzleword));

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
        if (letterInput.value.length < 1) String.fromCharCode(event.keycode);
        else event.preventDefault();
    });
}

/* Awaiting Puzzle Word */
ipcRenderer.on('puzzleword', (event, message) => {
    puzzleword = message;
    console.log(puzzleword);
});