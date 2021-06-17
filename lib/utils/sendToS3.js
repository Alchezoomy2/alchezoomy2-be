aws = require('aws-sdk');
const nfetch = require('node-fetch');
const fetch = require('superagent');
const { accessKeyId, secretAccessKey, region, Bucket } = require('../../config.json')

module.exports = async (filePath, video_url, accessToken) => {

    aws.config = new aws.Config();
    aws.config.accessKeyId = accessKeyId;
    aws.config.secretAccessKey = secretAccessKey;
    aws.config.region = region;

    try {


        s3 = new aws.S3();
        const videoFile = await nfetch(video_url + accessToken);
        // console.log("🚀 ~ file: sendToS3.js ~ line 18 ~ module.exports= ~ videoFile ", videoFile.length)
        // console.log("🚀 ~ file: sendToS3.js ~ line 18 ~ module.exports= ~ videoFile ", videoFile.buffer)

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
        console.log(`error: ${e.message}`)
        throw (e.message)
    }
}


