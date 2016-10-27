import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { Site } from "./modules/jekyll";

let window: Electron.BrowserWindow;
let site: Site;

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
                    accelerator: "CommandOrControl+O",
                    click: () => {
                        let filenames = dialog.showOpenDialog({
                            properties: ['openDirectory']
                        });
                        if (filenames && filenames[0]) {
                            site = getSite(filenames[0]);
                            window.webContents.send('got-site', site);
                        }
                    }
                },
                {
                    label: "Refresh",
                    click: () => {
                        window.webContents.send('refresh');
                    },
                    accelerator: "CommandOrControl+R"
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

ipcMain.on("get-file-content", (event, path) => {
    let content = site.getFileContent(path);

    event.sender.send("got-file-content", content);
});