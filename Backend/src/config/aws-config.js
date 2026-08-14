import AWS from "aws-sdk";
import dotenv from "dotenv"

dotenv.config()

AWS.config.update({ region: process.env.AWS_REGION }); //location of target audience

const s3 = new AWS.S3(); //instance created
const S3_BUCKET = process.env.CLOUD_BUCKET;

export { s3, S3_BUCKET };