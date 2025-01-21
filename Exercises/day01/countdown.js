const { createServer } = require('node:http');
const console = require('node:console');
const readline = require('node:readline');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log("hey! Welcome to day01");
  
  res.end('done!!!');
});

// const x = '10';
// const y = '20';

// console.log(x, y);

// const oranges = ['orange', 'orange'];
// const apples = ['just one apple', 'oranges', 'apple'];

// oranges.forEach(fruit => {
//   console.count(fruit);
// });
// apples.forEach(fruit => {
//   console.count(fruit);
// });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(`please enter countdown in seconds`, count => {
    const countdown = setInterval(() => {
        if(count!=0 || count > 0){
            count--;
    console.log(`remaining time ${count}!`);
        }else{
            clearInterval(countdown);
            console.log("time is up!!");   
        }
    },1000);

    rl.close();
  });


server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
});
