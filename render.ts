import electron = require('electron');
import paths = require('./modules/paths/paths')
const {ipcRenderer} = electron;
const {Paths} = paths;

ipcRenderer.on('got-dirs', (event, args: paths.Paths) => {
    document.getElementById("dirs").innerHTML = Paths.fromObject(args).show();
});

ipcRenderer.on('refresh', () => {
    window.location.reload();
})