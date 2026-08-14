import fs from 'fs';
import path from 'path'
// util pre installed in node 
// promisify checks for things if they exist
// here itll check if required commit id mentioned
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revert(commitID) {
    const repoPath = path.resolve(process.cwd(), ".devHub");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDir = path.join(commitsPath, commitID); // find file in the commit dir
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for (const file of files) {
            await copyFile(path.join(commitDir, file), path.join(parentDir, file));
        }

        console.log(`Commit ${commitID} reverted successfully!`);
    } catch (err) {
        console.error("Unable to revert : ", err);
    }
}
export default revert;
