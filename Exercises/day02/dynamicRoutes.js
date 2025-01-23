const path = require('node:path');
const url = require('node:url');
const http = require('node:http');
const fs = require('node:fs');

const { createServer } = require('node:http');

const hostname = 'localhost';
const port = 3000;

const server = createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    console.log(query);

    if (method === 'GET' && path === '/') {
        res.writeHead(200);
        res.write('hello! welcome to dynamic Routes Practice...\n \n');
        res.write('/list : list all files or directories in /files directory \n')
        res.write('/file?name=filename : for querying particular file content \n')
        res.end();
    }
    else if (method === 'GET' && path === '/list') {
        fs.readdir('./files', 'utf8', (err, list) => {
            if (err) {
                res.writeHead(500);
                res.write('server error!!!');
                console.error(err);
                return;
            }
            console.log(list);
            // const files = JSON.stringify(list);
            // console.log(files);
            
            res.writeHead(200,{ 'Content-Type': 'text/plain' });
            list.forEach(element => {
                res.write(element);
                res.write('\n \n');
            });
            res.end();
        });
    }
    else if (method === 'GET' && path === '/file') {
        fs.readFile(`./files/${query.name}`, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.write('server error!!!');
                console.error(err);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(data));
            console.log(data);
        });
        console.log(query.name);

    }
    else if (method === 'GET' && path === '/create') {
        const content = query.content;
        fs.writeFile(`./files/${query.name}`, content, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('server error!!!');
                console.error(err);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("file sucsessfully created");
        });
        console.log(query.name);

    }
    else if (method === 'GET' && path === '/append') {
        const content = query.content;
        fs.appendFile(`./files/${query.name}`, content, err => {
            if (err) {
                res.writeHead(500);
                res.end('server error!!!');
                console.error(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("content sucsessfully append");
            }
        });

        console.log(query.name);

    }
    else if (method === 'GET' && path === '/delete') {
        console.log(query.name);

        fs.unlink(`./files/${query.name}`, (err) => {
            if (err) {
                res.writeHead(500);
                res.end('server error!!!');
                console.error(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("content sucsessfully deletd!");
                console.log('File deleted successfully!');
            }
        });
    }
    else{
        res.writeHead(200);
        res.write('no such route exist!!');
        res.end()
        console.log("not existing route!!");
        
    }
});
console.log("started");

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
