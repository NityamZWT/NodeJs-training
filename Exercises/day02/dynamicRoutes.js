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

    // res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (method === 'GET' && path === '/') {
        res.writeHead(200);
        res.end('hello');
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
            res.writeHead(200);
            res.end(JSON.stringify(list));
        });
    }
    else if (method === 'GET' && path === '/file') {
        fs.readFile(`./files/${query.query}`, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.write('server error!!!');
                console.error(err);
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(data));
            console.log(data);
        });
        console.log(query.query);

    }
    else if (method === 'GET' && path === '/create') {
        const content = query.content;
        fs.writeFile(`./files/${query.name}`, content, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.write('server error!!!');
                console.error(err);
                return;
            }
            res.writeHead(200);
            res.end("file sucsessfully created");
        });
        console.log(query.name);

    }
    else if (method === 'GET' && path === '/append') {
        const content = query.content;
        fs.appendFile(`./files/${query.name}`, content, err => {
            if (err) {
                res.writeHead(500);
                res.write('server error!!!');
                console.error(err);
            } else{
            res.writeHead(200);
            res.end("content sucsessfully append");
            }
          });

        console.log(query.name);

    }
    else if (method === 'DELETE' && path === '/delete') {
        console.log(query.name);
        
        fs.unlink(`./files/${query.name}`, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });
    }
});
console.log("started");

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
