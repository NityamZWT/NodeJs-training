const fs = require('fs');
const path = require('path');

function loggingMiddleware(req, res, next) {
    const filePath = path.resolve(__dirname, '../log.txt');
    const reqMethod = req.method;
    const timestamp = new Date();
    const reqUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const content = `\n \t ${reqMethod} \t ${reqUrl} \t ${timestamp} `;
    
    fs.appendFile(filePath, content, (err) => {
        if (err) {
            console.log('Error in logging middleware:', err);
        }
    });
    next();
}

module.exports = loggingMiddleware;
