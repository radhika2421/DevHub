import fs from "fs/promises";
import path from "path"
import { s3, S3_BUCKET } from "../config/aws-config.js";

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".devHub"); // getting repo path
    const commitsPath = path.join(repoPath, "commits"); // getting commits folder path

    try {
        const commitDirs = await fs.readdir(commitsPath) // getting all commits in the commit folder
        // traversing through various commits made, present in the commits folder
        for (const commitDir of commitDirs)
        {
            const commitPath = path.join(commitsPath, commitDir); // getting the path of particular commit
            const files = await fs.readdir(commitPath); // getting files committed in the commit
            // pushing the files in the particular commit
            for (const file of files)
            {
                const filePath = path.join(commitPath, file); // getting the path of the particular file in the particular commit
                const fileContent = await fs.readFile(filePath); // getting the content of the file
                const params = {
                    Bucket: S3_BUCKET, // bucket where we have to store
                    Key: `commits/${commitDir}/${file}`, // folder path
                    Body: fileContent, // content of file
                };
                await s3.upload(params).promise(); // async code as upload may take time
            }
        }
        console.log("All commits pushed to cloud.");
    } catch (err) {
        console.error("Error pushing to cloud : ", err);
    }
}

export default pushRepo;