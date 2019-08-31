import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow;
const headers = [];

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

function createWindow() {
    win = new BrowserWindow({
        show: false,
        webPreferences: { nodeIntegration: true }
    });

    win.maximize();
    win.show();

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
            protocol: 'file:',
            slashes: true
        })
    );

    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

ipcMain.on('processFiles', (event, arg) => {
    const rows: any[] = [];
    const config = arg.config;
    for (let index = 0; index < config.length; index++) {
        const formDetails = config[index];
        headers.push(formDetails.ColumnName);
    }
    for (let rowindex = 0; rowindex < arg.files.length; rowindex++) {
        rows.push([]);
        const file = arg.files[rowindex];
        fs.readFile(file.path, (err, data: any) => {
            if (err) { throw err; }
            const content = JSON.parse(data);
            for (let index = 0; index < config.length; index++) {
                const formDetails = config[index];
                rows[rowindex][index] = content[formDetails.FormNumber] ? 1 : 0;
            }
            if (rowindex === arg.files.length - 1) {
                const clustering = require('density-clustering');
                const dbscan = new clustering.DBSCAN();
                // parameters: 5 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
                const clusters = dbscan.run(rows, .5, 4);
                win.webContents.send('getFilesResponse', { rows, headers, clusters });
            }

        });
    }
});
ipcMain.on('runDbScan', (event, rows) => {
    const clustering = require('density-clustering');
    const dbscan = new clustering.DBSCAN();
    // parameters: 5 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
    const clusters = dbscan.run(rows, .5, 4);
    win.webContents.send('getFilesResponse', { rows, headers, clusters });

});
