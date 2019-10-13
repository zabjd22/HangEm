const {
    ipcRenderer,
    remote
} = require('electron');

const mainProcess = remote.require('./main.js');
const exitBtn = document.querySelector('#exitBtn');
const newGameBtn = document.querySelector('#newgameBtn');
const currentWindow = remote.getCurrentWindow();

exitBtn.addEventListener('click', () => {
    mainProcess.exitGame();
});

newGameBtn.addEventListener('click', () => {
    mainProcess.startGame(currentWindow);
});

