import * as YAML from 'yamljs';
import * as fs from 'fs';
import * as path from 'path';

const _posts: string = "_posts";

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
    posts: string[]
    pages: string[]

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
        let files = fs.readdirSync(this.rootDir);
        files.forEach((value, index) => {
            let ph = path.join(this.rootDir, value);
            pages.push(ph);
        });
        return pages;
    }

    private loadPosts(): string[] {
        let posts = new Array<string>();
        let files = fs.readdirSync(path.join(this.rootDir, _posts));
        files.forEach(value => {
            let ph = path.join(this.rootDir, _posts, value);
            posts.push(ph);
        })
        return posts;
    }
}