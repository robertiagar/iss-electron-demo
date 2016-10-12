import { ipcRenderer } from 'electron';
import { Site } from './modules/jekyll';

ipcRenderer.on('got-dirs', (event, args: Site) => {
    let pages: string;
    let posts: string;
    posts = "<h1>Posts:</h1><ul>"
    args.posts.forEach(value => {
        posts += "<li>" + value.title + " (" + value.date + ")</li>"
    });
    posts += "</ul>";
    document.getElementById("dirs").innerHTML = posts;

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