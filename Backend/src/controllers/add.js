import fs from "fs/promises"; //promise based file sys
import path from "path"; // to work with directories

// we take file from user and make a copy of it and move it to a folder named staged
async function add(filePath) {
    const repoPath=path.resolve(process.cwd(),'.devhub')
    const stagedPath=path.join(repoPath,'staged')

    try{
        await fs.mkdir(stagedPath,{recursive: true});
        const fileName=path.basename(filePath);
        await fs.copyFile(filePath,path.join(stagedPath,fileName));
        console.log(`File ${fileName} added to staging area`);
    }
    catch(err){
        console.log("Files couldn't be staged : ",err);
    }
}

export default add;