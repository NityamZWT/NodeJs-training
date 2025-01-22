const fs = require('node:fs/promises');
const readline = require('node:readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question(`enter file name you want to create: `, filename => {
    rl.question(`enter content you want to add to the created file: `, content => {

        CreateFile(filename, content);

        // console.log(file);
        rl.close();
    });
});

async function CreateFile(userfilename, usercontent) {
    try {

        try {
            await fs.access(`./demofiles/${userfilename}.txt`);
            console.log("file with same name already exists");

        } catch(e) {
            // console.log(e);
            await fs.writeFile(`./demofiles/${userfilename}.txt`, usercontent);
        }

    } catch (error) {
        console.error(error);
    }
}
