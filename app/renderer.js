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

if (exitBtn) {
    exitBtn.addEventListener('click', () => {
        mainProcess.exitGame();
    });
}
if (newGameBtn) {
    newGameBtn.addEventListener('click', () => {
        mainProcess.startGame(currentWindow);
    });
}

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mainProcess.mainMenu(currentWindow);
    });
}

if(quitBtn) {
    quitBtn.addEventListener('click', () => {
        mainProcess.exitGame();
    });
}

for(var item in letter_field) {
    item.addEventListener('keydown', (event) => {
        if (event.keyCode == 8 || event.keyCode == 46) {
            // letter_field.value = "";
        } else if (letter_field.value.length < 1) {
            console.log(String.fromCharCode(event.keyCode));
        } else {
            event.preventDefault();
        }
    });
}
