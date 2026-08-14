import fs from "fs/promises"; //promise based file sys
import path from "path"; // to work with directories

async function initRepo(){
    const repoPath=path.resolve(process.cwd(), ".devHub") //current working directory and get the path to/enter the hidden folder
    const commitsPath=path.join(repoPath, "commits") // getting path to/entering the folder for commits in the hidden folder

    try{
        await fs.mkdir(repoPath,{recursive: true}); //repoPath= where we wanna make the folder, recursive= nested folders allowed
        await fs.mkdir(commitsPath,{recursive: true}); //commits folder
        await fs.writeFile(
            path.join(repoPath,"config.json"),
            JSON.stringify({bucket: process.env.CLOUD_BUCKET})
        );
        console.log("Repository initialized");
    }
    catch(err)
    {
        console.log("Couldn't initialize the repository :", err);
    }
}

export default initRepo;