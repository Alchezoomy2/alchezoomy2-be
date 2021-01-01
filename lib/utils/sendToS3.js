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
    const videoFile = await nfetch(video_url + accessToken,
        { method: 'POST', body: 'data' });


    if (videoFile.ok) {
        // let buffer = videoFile.buffer();
        // console.log(typeof buffer)
        const params = {
            Body: videoFile.body,
            Bucket: process.env.BUCKET_NAME,
            Key: filePath,
        }

        let response = await s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)
            console.log('error')
        })
        // console.log(response)
    }

    // const s3 = new aws.S3({
    //     secretAccessKey: process.env.SECRETACCESSKEY,
    //     accessKeyId: process.env.ACCESSKEYID,
    // })

    // const params = {
    //     Bucket: process.env.BUCKET_NAME,
    //     Key: filePath,
    //     Body: videoFile.data,
    // }

    // await s3.upload(params, function (err, data) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(`File uploaded: ${data.Location}`);
    // });
}

