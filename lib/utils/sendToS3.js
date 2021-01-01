
aws = require('aws-sdk');
fs = require('fs');
const nfetch = require('node-fetch');

modules.export = async (filePath, video_url, accessToken) => {

    const videoFile = await nfetch(video_url + accessToken);

    console.log('------------------------------------');
    console.log(`videoFile:  ${videoFile}`);
    console.log('------------------------------------');


    const s3 = new aws.s3({
        secretAccessKey: process.env.SECRETACCESSKEY,
        accessKeyId: process.env.ACCESSKEYID,
    })

    const params = {
        Bucket: process.env.BUCKETNAME,
        Key: filePath,
        Body: videoFile.data,
    }

    await s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded: ${data.Location}`);
    });
}

