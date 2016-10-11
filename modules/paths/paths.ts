export class Paths {
    postsPath: string
    pagesPath: string
    constructor(postsPath: string, pagesPath: string) {
        this.pagesPath = pagesPath;
        this.postsPath = postsPath;
    }
    show() {
        return "<div>" + this.pagesPath + "<hr/>" + this.postsPath + "</div>"
    }
    public static fromObject(args: Paths) {
        return new Paths(args.postsPath, args.pagesPath)
    }
}