import fs from "fs/promises"; //promise based file sys
import path from "path"; // to work with directories
import { v4 as uuidv4 } from 'uuid'; // for unique ids, v5 is more secure

async function commit(message) {
    // we want to take the file from staged folder
    // then we want to move this file to a new folder in the commit folder with a unique commit id as the name
    // then we will also create a json file which will have the timestamp of when the commit was made
    const repoPath=path.resolve(process.cwd(),'.devHub')
    const stagedPath=path.join(repoPath,'staged')
    const commitPath=path.join(repoPath,"commits");

    try{
        const files=await fs.readdir(stagedPath); //list of all files in staged folder
        if(files.length===0) console.log("Everything up to date, nothing to commit"); // if no files in staged area, everything is committed already
        else{
            const commitID=uuidv4();
            const commitDir=path.join(commitPath,commitID); //new commit folder path accessed
            await fs.mkdir(commitDir,{recursive: true});

            // taking files from staged area
            for(let file of files){
                await fs.copyFile(
                    path.join(stagedPath,file), // files from original dir
                    path.join(commitDir, file) // files to the new dir
                );
                fs.unlink(path.join(stagedPath,file)); // delete file after committing
            }
            // json file for timestamp and tracking
            await fs.writeFile(path.join(commitDir,"commit.json"), JSON.stringify({message, date: new Date().toString()})) //stringify converts js to json
            console.log(`Changes committed with message : "${message}" and ID : ${commitID} `);
        }

    } catch(err){
        console.log("Changes could not be committed : ",err);
    }
}

export default commit;