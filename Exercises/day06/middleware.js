const fs = require('node:fs');
const path = require('path');
// const URL = require('node:url');

function middleware(req, res, next) {
    // const url = URL.parse(req.url,true);
    const filePath = path.resolve(__dirname, 'log.txt')
    console.log('path:--',filePath);
    
    const reqMethod = req.method;
    const timestamp = new Date();
    const reqUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    const content = `\n \t ${reqMethod} \t ${reqUrl} \t ${timestamp} `;
    console.log('content:--', content);

    fs.appendFile(filePath, content, (err,data) => {
        if (err) {
            console.log('server error in middleware!!', err);
        }
    })
    next();
}

module.exports = middleware;