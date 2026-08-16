import fs from 'fs/promises'
import path from 'path'
import {s3, S3_BUCKET} from '../config/aws-config.js'

async function pull() {
    const repoPath = path.resolve(process.cwd(), ".devHub");
    const commitsPath = path.join(repoPath, "commits");
    try {
        // extracting data in the bucket (repo)
        const data = await s3
        .listObjectsV2({
            Bucket: S3_BUCKET, // bucket where we need to search
            Prefix: "commits/", // folder we need to read
        })
        .promise();

        const objects = data.Contents; // content of the bucket, a list

        // traversing through content of the repo or bucket
        for (const object of objects) {
            const key = object.Key; // file or folder path in the bucket
            // this basically joins the path of commit with the actual path of the file in bucket inside the commits folder
            // say there is a file in commits in the bucket as commits/abc/file.txt
            // key is the exact path and dirname removes the last part that is the file name
            // And splitting creates array of folder/file names
            // pop returns the last element, that is abc
            // so we get /.devHub/commits/abc
            const commitDir = path.join(commitsPath, path.dirname(key).split("/").pop());
            // this creates the directory that we wanted
            await fs.mkdir(commitDir, { recursive: true });

            const params = {
                Bucket: S3_BUCKET,
                Key: key,
            };

            const fileContent = await s3.getObject(params).promise();
            await fs.writeFile(path.join(repoPath, key), fileContent.Body);
        }
        console.log("All commits pulled from cloud.");
    } catch (err) {
    console.error("Unable to pull : ", err);
    }

}

export default pull;