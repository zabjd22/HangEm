const {
    app,
    BrowserWindow,
    remote
} = require('electron');

app.on('ready', () => {
    const main = new BrowserWindow({
        width: 800,
        height: 600,
        maximizable: false,
        resizable: false,
        show: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    main.on('ready-to-show', () => {
        main.show();
    });
    mainMenu(main);
});

const exitGame = exports.exitGame = () => {
    app.exit();
}

const startGame = exports.startGame = (targetWindow) => {
    targetWindow.loadFile(`${__dirname}/gamepage.html`);
}

const mainMenu = exports.mainMenu = (targetWindow) => {
    targetWindow.loadFile(`${__dirname}/main.html`);
}