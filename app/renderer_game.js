const {
    ipcRenderer,
    remote
} = require('electron');

// TODO: clean up the code... so many unnessary clutter
var puzzleword;
let answer_tries = 8;

const mainProcess = remote.require('./main.js');
const currentWindow = remote.getCurrentWindow();

const gotoMenuBtn = document.getElementById('goto-mainmenu');
const quitBtn = document.getElementById('quitgame');
const resetBtn = document.getElementById('resetgame');
const checkBtn = document.getElementById('checkbtn');

gotoMenuBtn.addEventListener('click', event => mainProcess.goto_mainMenu(currentWindow));
quitBtn.addEventListener('click', event => mainProcess.exitGame());
resetBtn.addEventListener('click', (event) => {
    window.location.reload(false);
});

/* Awaiting Puzzle Word */
ipcRenderer.on('puzzleword', (event, message) => {
    puzzleword = message;
    console.log(puzzleword);
    let letters = document.getElementsByClassName('letters');
    letters[0].innerHTML = '';
    for(let i = 0; i < puzzleword.length; i++)
    {
        let letter = document.createElement('div');
        let letterInput = document.createElement('input');
        
        // Setting Attributes and Events
        letter.setAttribute('class', 'letter blur-letter');
        letterInput.setAttribute('type', 'text');
        letterInput.setAttribute('id', `in${i}`);

        letterInput.addEventListener('focus', (event) => {
            letter.classList.remove('blur-letter');
            letter.classList.add('focus-letter');
        });
    
        letterInput.addEventListener('blur', (event) => {
            letter.classList.remove('focus-letter');
            letter.classList.add('blur-letter');
        });
        
        // Adding the nodes to the page
        letter.appendChild(letterInput);
        letters[0].appendChild(letter);
        
        let letterInputId = document.getElementById(`in${i}`);
        letterInputId.addEventListener('keypress', (event) => {
            if (!letterInputId.value.length < 1) {
                event.preventDefault();
            }
        });

        letterInputId.addEventListener('keyup', (event) => {
            if(!answer_tries <= 0) {
                answer = letterInputId.value;
                isCorrectAnswer = answer === puzzleword[i];
                console.log(`Assumed Answer: ${event.key}, Actual Answer: ${puzzleword[i]} => Same: ${isCorrectAnswer}`);
                if(!isCorrectAnswer) {
                    letterInputId.value = '';
                    let wrongLetterBox = document.getElementsByClassName('missed')[0];
                    let wrongLetter = document.createElement('div');
                    wrongLetter.innerText = answer;
                    wrongLetter.classList.add('wrong-letter');
                    wrongLetterBox.appendChild(wrongLetter);
                    letterInputId.blur();
                }
                answer_tries--;
                console.log('Answer Tries: ' + answer_tries);
            } else {
                const playground = (document.getElementsByClassName('playground'))[0];
                while(playground.hasChildNodes)
                {
                    playground.removeChild(playground.firstChild);
                }
                const GameOver = document.createElement('div');
                GameOver.textContent = 'Game Over';
                GameOver.classList.add('game-over');
                playground.appendChild(GameOver);
            }
        });
    }
});