aws = require('aws-sdk');
const nfetch = require('node-fetch');
const { accessKeyId, secretAccessKey, region, Bucket } = require('../../config.json')

module.exports = async (filePath, video_url, accessToken) => {

    aws.config = new aws.Config();
    aws.config.accessKeyId = accessKeyId;
    aws.config.secretAccessKey = secretAccessKey;
    aws.config.region = region;

    try {
        s3 = new aws.S3();
        const videoFile = await nfetch(video_url + accessToken);
        const buffer = await videoFile.buffer();

        if (videoFile.ok) {
            const params = {
                Body: buffer,
                Bucket,
                Key: filePath,
                ACL: 'public-read',
            }

            await s3.putObject(params, function (err) {
                if (err) console.log(err, err.stack)
            })

        }

    } catch (e) {
        console.log(e.message)
        throw (e.message)
    }
}


