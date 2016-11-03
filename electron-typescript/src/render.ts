import { ipcRenderer } from 'electron';
import { Site } from './modules/jekyll';
import * as $ from 'jquery';

declare var Notification: any;

ipcRenderer.on('got-site', (event, args: Site) => {
    let post = $("#posts");
    args.posts.forEach(value => {
        appendButton($("#posts"), value.title, "list-group-item list-group-item-action", () => {
            getFileContent(value.path);
            let notification = new Notification(value.title, {
                body: value.path
            });
        });
    });

    args.pages.forEach(value => {
        appendButton($("#pages"), value.title, "list-group-item list-group-item-action", () => {
            getFileContent(value.path);
        });
    });
});

ipcRenderer.on('refresh', () => {
    window.location.reload();
});

ipcRenderer.on('got-file-content', (event, content) => {
    $("#text").text(content);
});

function appendButton($element: JQuery, text: string, cssClass: string = null, click = null) {
    let element = $element;
    let $button = $("<button></button>");

    if (cssClass != null)
        $button.addClass(cssClass);

    if (click != null)
        $button.on("click", click);

    element.append($button.text(text));
}

function getFileContent(path: string) {
    ipcRenderer.send("get-file-content", path);
}
