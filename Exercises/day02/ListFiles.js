const fs = require('node:fs/promises');
const path = require('node:path');
const readline = require('node:readline');



// async function ListFile(){
//     try {
//         const listedFiles = await fs.readdir('./demofiles');
//         console.log(listedFiles);

//         return listedFiles;
//     } catch (error) {
//         console.error("expectional error:",error);       
//     } finally{
//         console.log("task done!!");   
//     }
// }

// async function ListFile() {
//     try {
//         // const listedFiles = await fs.readdir('./demofiles',{ withFileTypes: true });
//         let i;
//         const listedFiles = await fs.readdir('./demofiles', { recursive: true, withFileTypes: true });

//         console.log(listedFiles);
//         console.log('\n');

//         listedFiles.forEach(i=>{
//             console.log('names:', i.name);
//         })
//         console.log('\n');

//         listedFiles.forEach(file => {
//             console.log(file.name, file.isDirectory ? "--type: directory" : "--type: file");
//         });
//     }
//     catch (error) {
//         console.error("expectional error:", error);
//     } finally {
//         console.log("task done!!");
//     }
// }


async function ListFile() {
    let fileType;
    try {
        const listedFiles = await fs.readdir('./demofiles', { recursive: true, withFileTypes: true });
        // const listedFiles = await fs.readdir('./demofiles',{ withFileTypes: true });

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(`please enter file type you want to view(for all files write 'all')`, userFileType => {
            
            fileType = userFileType;
            let i;
            
            console.log(listedFiles);
            console.log('\n');
            
            listedFiles.forEach(file => {
                console.log(file.name, file.isDirectory ? "--type: directory" : "--type: file");
            });
            
            console.log('\n');
            listedFiles.forEach(i => {
                
                const type = path.extname(`./demofiles/${[i]}`);
                // console.log('type:',i.name);
                
                if (path.extname(i.name) === userFileType) {
                    console.log('names:', i.name);
                }
            })
            rl.close();
        });
    }
    catch (error) {
        console.error("expectional error:", error);
    } finally {
        console.log("task done!!");
    }
}

ListFile()