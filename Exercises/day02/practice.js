var http = require('http');
var url = require('url');
var path = require('path')
var fs = require('fs');

//create a server object:
http.createServer(function (req, res) {
    console.log("enter into server");
  res.write('Hello World!'); //write a response to the client
  
  res.write(req.url);
  
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('Hello World!');
//   res.end();
// }).listen(8080);


//----------------------URL MODULE-------------------------------------------
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, false);
console.log(q);

console.log(q.host); 
console.log(q.pathname); 
console.log(q.search); 

var qdata = q.query; 
console.log(qdata.month); 


//--------------------------PATH MODULE------------------------------   

const filePath = path.join(__dirname, 'john', 'documents', 'file.txt');
console.log(filePath); // '/users/john/documents/file.txt' (Windows uses '\')

const filePath6 = path.join(__filename, 'john', 'documents', 'file.txt');
console.log(filePath6); // '/users/john/documents/file.txt' (Windows uses '\')

const absolutePath = path.resolve('users', 'documents','john', 'file.txt');
console.log(absolutePath); // '/current/working/directory/users/john/documents/file.txt'

const filePath2 = '/users/john/documents/file.txt';
console.log(path.basename(filePath2));       // 'file.txt'
console.log(path.basename(filePath2, '.json')); // 'file'

const filePath3 = '/users/john/documents/file.txt';
console.log(path.extname(filePath3)); // '.txt'

const filePath4 = '/users/john/documents/file.txt';
console.log(path.dirname(filePath4)); // '/users/john/documents


//--------------------------------FS MODULE----------------------------------------------



// fs.stat('./demofiles/file2.txt', (err, stats) => {
//   if (err) {
//     console.error(err);
//   }
//     console.log(stats);
    
// });


try {
  const stats = fs.statSync('/Exercises/day02/demofiles/file2.txt');
} catch (err) {
  console.error(err);
}
console.log("stats:", stats);
