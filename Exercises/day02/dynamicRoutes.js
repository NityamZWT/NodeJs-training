const path = require('node:path');
const url = require('node:url');
const http = require('node:http');
const fs = require('node:fs');

const { createServer } = require('node:http');
const { log } = require('node:console');

const hostname = 'localhost';
const port = 3000;

const server = createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const pathname = parsedUrl.pathname;
    // console.log("path:", pathname);

    const query = parsedUrl.query;
    const filePath = path.join('./files', query.name ?? '')
    // console.log(query);

    if (method === 'GET' && path === '/') {
        res.writeHead(200);
        res.write('hello! welcome to dynamic Routes Practice...\n \n');
        res.write('/list : list all files or directories in /files directory \n')
        res.write('/file?name=filename : for querying particular file content \n')
        res.end();
    }
    else if (method === 'GET' && pathname === '/list') {
        try {
            fs.readdir(filePath, { withFileTypes: true }, (err, list) => {
                if (err) {
                    console.log(err);
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                list.forEach(element => {
                    console.log(element.isDirectory());

                    if (!element.isDirectory()) {
                        res.write(element.name);
                        res.write('\n \n');
                        // res.end();
                    }
                });
                res.end();
            });

        } catch (err) {
            res.writeHead(500);
            res.write('server error!!!');
            res.end()
            console.error(err);
            return;
        }
    }
    else if (method === 'GET' && pathname === '/file') {
        // console.log(pathname);

        try {
            if (query.name === undefined) {
                console.log(query.name);

                res.write("please pass file name you want to read with file extention");
                res.end();
            }
            else if (!fs.existsSync(filePath)) {
                res.write("such file is not exist in directory");
                res.end();
            } else {
                fs.readFile(filePath, 'utf8', (err, data) => {

                    if (err) {
                        res.writeHead(500);
                        console.log(err);
                    }
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify(data));
                    console.log(data);
                });
            }
        } catch (error) {
            res.writeHead(500);
            res.write('server request error!!!');
            console.error(error);
            return;
        }
        // console.log(query.name);
    }
    else if (method === 'GET' && pathname === '/create') {
        try {
            const content = `${query.content} \n`;
            const override = query.override;
            // console.log(content);
            if (query.name === undefined) {
                console.log(query.name);

                res.write("please pass file name you want to read with file extention");
                res.end();
            }
            else if (path.extname(filePath) != '.txt') {
                res.write("onlt .txt file are allowed to create!")
                res.end();
                console.log(path.extname(filePath));
            }
            else if (!fs.existsSync(filePath)) {
                fs.writeFile(filePath, content, (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('server error!!!');
                        console.error(err);
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("file sucsessfully created");
                });
            }
            else if (override == 1) {
                res.writeHead(201, { 'Content-Type': 'text/plain' });
                res.end("file sucsessfully overide!!");
            }
            else {
                res.write("file with same name already exists.\n\n if you want to append use /append?name=filname&content=newcontent\n\n if you want to override file pass override argument in query(/create?name=filename&content=newcontent&override=1)")
                res.end()
                // console.log("ending");
            }

            // console.log(query.name);
        } catch (error) {
            res.writeHead(500);
            res.write('server request error!!!');
            console.error(error);
        }
    }
    else if (method === 'GET' && pathname === '/append') {
        try {
            const content = `${query.content} \n`;
            const override = query.override;
            // console.log(content);
            if (query.name === undefined) {
                console.log(query.name);

                res.write("please pass file name you want to read with file extention");
                res.end();
            }
            else if (path.extname(filePath) != '.txt') {
                res.write("onlt .txt file are allowed to create!")
                res.end();
                console.log(path.extname(filePath));
            }
            else if (!fs.existsSync(filePath)) {
                res.write('file not exist! if you want to create use /create?name=filename&content=newcontent')
                res.end();
            }

            else {
                fs.writeFile(filePath, content, (err, data) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('server error!!!');
                        console.error(err);
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("file sucsessfully created");
                });
            }

            // console.log(query.name);
        } catch (error) {
            res.writeHead(500);
            res.write('server request error!!!');
            console.error(error);
        }

    }
    else if (method === 'GET' && pathname === '/delete') {
        try {
            if (!fs.existsSync(filePath)) {
                res.write("file doesn't exist!")
            }
            else {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('server error!!!');
                        console.error(err);
                    }
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("file sucsessfully deletd!");
                    console.log('File deleted successfully!');
                });
            }
        } catch (error) {
            res.writeHead(500);
            res.write('server request error!!!');
            console.error(error);
        }
    }
    else {
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
