require('dotenv').config();
aws = require('aws-sdk');
fs = require('fs');
const nfetch = require('node-fetch');


module.exports = async (filePath, video_url, accessToken) => {

    aws.config = new aws.Config();
    aws.config.accessKeyId = process.env.ACCESS_KEY_ID;
    aws.config.secretAccessKey = process.env.SECRET_ACCESS_KEY;
    aws.config.region = process.env.REGION;

    s3 = new aws.S3();
    const videoFile = await nfetch(video_url + accessToken);
    const buffer = await videoFile.buffer();

    if (videoFile.ok) {

        const params = {
            Body: buffer,
            Bucket: process.env.BUCKET_NAME,
            Key: filePath,
            ACL: 'public-read',
        }

        await s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)
        })
    }
}

