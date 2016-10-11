import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { Site } from "./modules/jekyll";

let window: Electron.BrowserWindow;

let getSite = root => {
    return new Site(root);
};

app.on('ready', _ => {
    window = new BrowserWindow({
        width: 1280,
        height: 720
    });

    let template = [
        {
            label: "File",
            submenu: [
                {
                    label: "Open",
                    accelerator: "Ctrl+O",
                    click: () => {
                        console.log("clicked open");
                        let filenames = dialog.showOpenDialog({
                            properties: ['openDirectory']
                        });
                        if (filenames && filenames[0]) {
                            let dirs = getSite(filenames[0]);
                            window.webContents.send('got-dirs', dirs);
                        }
                    }
                },
                {
                    label: "Refresh",
                    click: () => {
                        window.webContents.send('refresh');
                    },
                    accelerator: "Ctrl+R"
                },
                {
                    label: "Exit",
                    click: () => {
                        app.quit();
                    }
                }
            ]
        }
    ];

    let menu: Electron.Menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    window.loadURL(`file://${__dirname}/index.html`);
    window.webContents.openDevTools();
    window.on('close', _ => {
        window = null;
    })
});