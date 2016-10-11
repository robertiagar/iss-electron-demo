import * as path from 'path'
import {Paths} from './paths'

interface Directory {
    loadDirectories(): Paths
}

export class JekyllDirectory implements Directory {
    rootDirectory: string
    constructor(rootDirectory: string) {
        this.rootDirectory = rootDirectory;
    }
    loadDirectories() {
        return new Paths(
            path.join(this.rootDirectory, "_posts"),
            path.join(this.rootDirectory, "_pages")
        );
    }
}