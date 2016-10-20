import { ipcRenderer } from 'electron';
import { Site } from './modules/jekyll';
import * as $ from 'jquery';

ipcRenderer.on('got-dirs', (event, args: Site) => {
    let pages: string;
    let posts: string;
    let $header = $("<h1>", { text: "Posts" });
    let $list = $("<ul></ul>");
    args.posts.forEach(value => {
        $list.append($("<li></li>").text(value.title));
    });
    $("#dirs").append($header).append($list);

    pages = "<h1>Pages:</h1><ul>"
    args.pages.forEach(value => {
        pages += "<li>" + value.title + "</li>"
    });
    pages += "</ul>";
    document.getElementById("dirs").innerHTML += pages;
});

ipcRenderer.on('refresh', () => {
    window.location.reload();
})