/// <reference path="typings/index.d.ts" />

import electron = require("electron");
const {app, BrowserWindow} = electron;
let window: Electron.BrowserWindow;

app.on('ready', _ => {
    window = new BrowserWindow({
        width: 1280,
        height: 720,
    });

    window.loadURL(`file://${__dirname}/index.html`);

    window.on('close', _ => {
        window = null;
    })
});