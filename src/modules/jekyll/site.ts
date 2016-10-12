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
        let config = new Config();
        let contents = fs.readFileSync(path.join(this.rootDir, "_config.yml"), 'utf8');
        let configYML = YAML.parse(contents);
        config.name = configYML.name;
        config.author = configYML.author;
        config.description = configYML.description;
        config.email = configYML.email;
        config.title = configYML.title;
        return config;
    }

    private loadPages(): Page[] {
        let pages = new Array<Page>();
        let files = fs.readdirSync(this.rootDir);
        files.forEach(value => {
            if (value.toLowerCase() !== "readme.md" && (value.endsWith(".md") || value.endsWith(".markdown"))) {
                let ph = path.join(this.rootDir, value);
                pages.push(new Page(value.replace(".md", "").replace(".markdown", ""), ph));
            }
        });
        
        return pages;
    }

    private loadPosts(): Post[] {
        let files = fs.readdirSync(path.join(this.rootDir, _posts));
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
}