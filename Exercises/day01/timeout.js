const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(`please enter countdown in seconds`, msg => {
    rl.question(`please enter msg`, time => {
        const times = time;
        setTimeout((msg) => {
            console.log(msg);

        }, times, msg);
        rl.close()
    });
    // rl.close();
});

//done