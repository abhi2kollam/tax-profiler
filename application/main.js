const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat)


let mainWindow;


app.on('ready', () => {
    console.log('app is ready');
    const htmlPath = path.join('src', 'index.html');
    mainWindow = new BrowserWindow();
    mainWindow.loadFile(htmlPath);
})


ipcMain.on('files', async (event, filesArr) => {
    try {
        const data = await Promise.all(
            filesArr.map(async ({ name, pathName }) => ({
                ...await stat(pathName),
                name,
                pathName
            }))
        )
        mainWindow.webContents.send('metadata', data)
    } catch (error) {
        mainWindow.webContents.send('metadata:error', error)
    }
})


