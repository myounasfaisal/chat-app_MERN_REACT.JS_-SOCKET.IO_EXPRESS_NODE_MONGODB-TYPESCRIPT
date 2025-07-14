declare namespace Express {
    export interface Multer {
        file: {
            path: string,
            filename: string
        }
    }
}