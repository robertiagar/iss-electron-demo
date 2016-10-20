import * as YAML from 'yamljs';
import * as fs from 'fs';
import * as path from 'path';

const _posts: string = "_posts";

export class Post {
    title: string
    date: Date
    path: string
    constructor(path: string, date: Date, title: string) {
        this.title = title;
        this.date = date;
        this.path = path;
    }
}

export class Page {
    title: string
    path: string
    constructor(title: string, path: string) {
        this.title = title;
        this.path = path;
    }
}

export class Config {
    title: string
    description: string
    email: string
    name: string
    author: string
    constructor(title: string, description: string, email: string, name: string, author: string) {
        this.title = title;
        this.description = description;
        this.email = email;
        this.name = name;
        this.author = author;
    }
}

export class Site {
    rootDir: string
    config: Config
    posts: Post[]
    pages: Page[]

    constructor(rootDir: string) {
        this.rootDir = rootDir;
        this.loadSite();
    }

    private loadSite() {
        this.config = this.loadConfig();
        this.pages = this.loadPages();
        this.posts = this.loadPosts();
    }

    private loadConfig(): Config {
        let contents = fs.readFileSync(path.join(this.rootDir, "_config.yml"), 'utf8');
        let configYML = YAML.parse(contents);
        let config = new Config(
            configYML.title,
            configYML.description,
            configYML.email,
            configYML.name,
            configYML.author);
        return config;
    }

    private loadPages(): string[] {
        let pages = new Array<string>();
        let files = this.getMarkdownFiles(this.rootDir);
        files.forEach((value, index) => {
            let ph = path.join(this.rootDir, value);
            pages.push(ph);
        });

        return pages;
    }

    private loadPosts(): Post[] {
        let files = this.getMarkdownFiles(path.join(this.rootDir, _posts));
        return files.reverse().map(value => {
            let ph = path.join(this.rootDir, _posts, value);
            let fileContent = fs.readFileSync(ph, 'utf8');
            let startPos = fileContent.indexOf("---") + 3;
            let endPos = fileContent.indexOf("---", startPos);
            let yaml = fileContent.substring(startPos, endPos);
            let yml = YAML.parse(yaml);
            let date = yml.date != undefined ? new Date(yml.date) : new Date(value.substr(0, 10));
            return new Post(ph, date, yml.title);
        });
    }

    private getMarkdownFiles(path: string): string[] {
        let files = fs.readdirSync(path);
        return files.filter(value => {
            return (value.endsWith(".md") || value.endsWith(".markdown"));
        })
    }
}