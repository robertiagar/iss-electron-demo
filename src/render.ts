import { ipcRenderer } from 'electron';
import { Paths } from './modules/paths/paths';

ipcRenderer.on('got-dirs', (event, args: Paths) => {
    document.getElementById("dirs").innerHTML = Paths.fromObject(args).show();
});

ipcRenderer.on('refresh', () => {
    window.location.reload();
})