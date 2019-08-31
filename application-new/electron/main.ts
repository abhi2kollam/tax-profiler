import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

let win: BrowserWindow;

app.on("ready", createWindow);

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true }
    });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    // win.webContents.openDevTools();

    win.on("closed", () => {
        win = null;
    });
}

ipcMain.on("processFiles", (event, arg) => {
    const tableColumns = []
    const headers = [];
    const rows: any[] = [];
    const config = arg.config;
    for (let index = 0; index < config.length; index++) {
        const formDetails = config[index];
        headers.push(formDetails.ColumnName);
    }
    console.log("headers", headers)
    for (let rowindex = 0; rowindex < arg.files.length; rowindex++) {
        rows.push({});
        const file = arg.files[rowindex];
        fs.readFile(file.path, (err, data: any) => {
            if (err) throw err;
            let content = JSON.parse(data);
            const config = arg.config;
            for (let index = 0; index < config.length; index++) {
                const formDetails = config[index];
                rows[rowindex][formDetails.ColumnName] = content[formDetails.FormNumber] ? 1 : 0;
            }
            console.log(rows, "rows")
            if (rowindex == arg.files.length - 1) {
                win.webContents.send("getFilesResponse", { rows, headers });
            }

        });
    }
});
