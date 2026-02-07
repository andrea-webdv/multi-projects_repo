import { createServer } from "node:http";
import { generator as running } from "./back/encrypter.mjs";
import { readFile } from "node:fs/promises";
import * as fs from 'node:fs'
import logger  from "./back/logger.mjs";
import path from "node:path";
import { error } from "node:console";

const mimeTypes = { 
    '.html': 'text/html', 
    '.mjs': 'text/javascript', 
    '.js': 'text/javascript', 
    '.css': 'text/css', 
    '.png': 'image/png', 
    '.jpg': 'image/jpg', 
    '.ttf': 'font/ttf', 
    '.otf': 'font/otf', 
    '.ico': 'image/x-icon'
};
const port = process.env.PORT || 3000;

function pathBuilder (url){
    const localPath = import.meta.dirname; //process.cwd();  sostituito per funzionare son server online invece che in esecuzione su node

    //if (path.extname(url) === '.ico') { let resPath = path.resolve(localPath, 'stage', 'res', url); return resPath}
    let stagePath = path.resolve(localPath, 'stage', url);

    // console.log("PATH REQUIRED: ", stagePath);
    return stagePath
}

const server = createServer(async (req, res) => {
    console.log("server listening");
    console.log(`call opened to ${req.url}`);
    try {

        //-- ENDPOINT BACK LOGIC --
        if (req.url === '/run') { // && req.method === 'POST'
                console.log("confirm call to run");
                
            let inputs = '';

            req.on('data', (chunk) => {
                inputs += chunk.toString();
            });

            req.on('end', async () => {
                let parsed = JSON.parse(inputs);
                // suddivisione di parsed nei dati. struttura oggetto corretta?
                let iniputObj = {
                    buffer: parsed.imageInput,
                    length: parsed.lengthOpt,
                };
                console.log("RECEIVED DATA",iniputObj);
                // callback dal modulo per il resto della logica
                running( iniputObj.buffer, iniputObj.length)
                    .then((output) => {
                            console.log("output: ", output);
                            
                        res.setHeader('Access-Control-Allow-Origin', `http://localhost:${port}`);
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                        res.setHeader("Content-Type", 'application/octet-stream');
                        res.setHeader('X-Content-Type-Options', 'nosniff');
                        res.setHeader('Expires', '600');
                        res.statusCode = 200
    
                        res.end(output)
                    });
            });

            req.on('error', () => {
                throw new Error("Comunication Error, received data: ", JSON.stringify(inputs))
            });
        }else 

        // -- ENDPOINT FOR FRONT PAGE -- 
        if( req.url === '/'){
            const homePath = pathBuilder('main.html');

            if (! fs.existsSync(homePath)) {
                throw new Error("FILE NOT FOUND: ", homePath);
            }
                let data = await readFile(homePath); 

                res.setHeader('Cache-Control', 'no-store, no-cache');
                res.setHeader('Pragma', 'no-cache');

                res.setHeader("Content-Type", mimeTypes['.html']);
                res.statusCode = 200;

                res.end(data)
        }else {
            let requested = req.url.slice(1);
            
            let fileType = path.extname(req.url);
            
            let filePath = pathBuilder(requested);

            if (!Object.hasOwn(mimeTypes, fileType)){throw new Error(`mime type not found: ${requested}`);
            }

            if (!filePath.startsWith(path.join(import.meta.dirname, 'stage'))){
                throw new Error("MISMATCHED PATH IDENTIFIED")
            }
            if (!fs.existsSync(filePath)) {
                throw new Error(`FILE NOT FOUND: ${filePath}`);
            }
            console.log(" file requested: ", requested, " ext: ", fileType, "; of mime type: ", mimeTypes[fileType]) ;

            let data = await readFile(filePath);

            if (fileType === ".js" || fileType === ".mjs"){
                res.setHeader('Access-Control-Allow-Origin', `http://localhost:${port}`);
                res.setHeader('Access-Control-Allow-Credentials', 'true');
            }
            
            res.setHeader("Content-Type", mimeTypes[fileType]);
            res.statusCode = 200;

            res.end(data)
        };
    } catch (error) {
        console.error('ERRORRE, percorso o file non riconosciuto: ', error);
        res.writeHead(404);
        res.end("<h1 style='text-align:center;margin:auto;'>404</h1> <h3 style='text-align:center;margin:auto;'>RESOURCE NOT FOUND</h3>")
    }
});

server.listen(port, ()=> console.log(`server running at http://Localhost:${port}`)
);
