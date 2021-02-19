aws = require('aws-sdk');
const nfetch = require('node-fetch');

const accessKeyId = process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const region = process.env.REGION;


module.exports = async (filePath, video_url, accessToken) => {

    aws.config = new aws.Config();
    aws.config.accessKeyId = accessKeyId;
    aws.config.secretAccessKey = secretAccessKey;
    aws.config.region = region;

    console.log(filePath)
    console.log(video_url)

    try {
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
            })
        }
        else {
            console.log('videoFile not ok')
        }
        s3.shutdown();
    } catch {
        (e => { throw (e.message) })
    }
}


