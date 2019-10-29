const {
    ipcRenderer,
    remote
} = require('electron');

var puzzleword;

const mainProcess = remote.require('./main.js');
const currentWindow = remote.getCurrentWindow();

const exitBtn = document.querySelector('#exitBtn');
const newGameBtn = document.querySelector('#newgameBtn');

if (newGameBtn) newGameBtn.addEventListener('click', event => { mainProcess.newGame(currentWindow); });
if (exitBtn) exitBtn.addEventListener('click', event => mainProcess.exitGame());