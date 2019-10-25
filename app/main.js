const {
    app,
    BrowserWindow,
    remote,
    dialog,
    ipcMain
} = require('electron');
const path = require('path');
const fs = require('fs');

const word_db_path = path.join(__dirname, '/assets/db/word_db.txt');
let word_db;


app.on('ready', () => {
    const main = createWindow();
    goto_mainMenu(main);
    word_db = filterDatabase(readFileToDatabase(readFileSync(word_db_path)));
});

/* 
    Application Actions: Creating a new window,
                         preparing new game and
                         handeling game preference.
 */
const createWindow = () => {
    const window = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        maximizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.on('ready-to-show', () => {
        window.show();
    });

    window.on('close', () => {});

    return window;
};
/* Exports */
const exitGame = exports.exitGame = () => {
    app.exit();
}
const newGame = exports.newGame = (targetWindow) => {
    targetWindow.loadFile(`${__dirname}/gamepage.html`);
    // targetWindow.webContents.send('pong')
    targetWindow.webContents.on('did-finish-load', () => {
        targetWindow.webContents.send('puzzleword', selectWordFromDatabase(word_db));
    })
}
const goto_mainMenu = exports.goto_mainMenu = (targetWindow) => {
    targetWindow.loadFile(`${__dirname}/main.html`);
}
/* IPC Messages */
// END Application Actions.

/* 
    Section: Takes care of reading wordlist database,
             filtering wordlist and
             selecting word for new game.
*/
const randomSelect = (max) => Math.floor(Math.random() * Math.floor(max));
const readFileSync = (filename) => {
    try {
        return fs.readFileSync(filename);
    } catch (exception) {
        throw exception;
    }
}
const readFileToDatabase = file => file.toString().split('\n');
const filterDatabase = (db) => {
    let filtered = [];
    for (const [i, word] of db.entries()) {
        if (!/\d|-|'|\./.test(word) && word.length > 4) {
            filtered.push(word);
        }
    }
    return filtered;
}
const selectWordFromDatabase = db => db[randomSelect(db.length)];
/* End Database Section */