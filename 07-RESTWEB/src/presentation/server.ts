import express from 'express'
import path from 'path';

interface Options{
    port: number;
    public_path: string;
}

export class Server {
    private readonly port: number;
    private readonly public_path: string;

    constructor(options: Options) {
        const { port, public_path } = options;
        this.port = port;
        this.public_path = public_path;
    }

    private app = express();

    async start(){

        // Middlewares

        // Public Folder
        this.app.use(express.static('public'))
        

        this.app.listen(8080, () => {
            console.log('Server is running on port 8080');
        });

    }

}