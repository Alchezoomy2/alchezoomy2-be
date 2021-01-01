
aws = require('aws-sdk');
fs = require('fs');
const nfetch = require('node-fetch');


module.exports = async (filePath, video_url, accessToken) => {

    s3 = new aws.S3();
    const videoFile = await nfetch(video_url + accessToken);

    console.log('------------------------------------');
    console.log(videoFile);
    console.log('------------------------------------');
    console.log('------------------------------------');
    console.log(`filePath:  ${filePath}`);
    console.log('------------------------------------');
    console.log('------------------------------------');
    console.log(`process.env.BUCKETNAME:  ${process.env.BUCKETNAME}`);
    console.log('------------------------------------');



    if (videoFile.ok) {
        let buffer = videoFile.buffer();
        console.log(buffer);

        const params = {
            Body: buffer,
            Bucket: process.env.BUCKETNAME,
            Key: filePath,
        }

        // let response = await s3.putObject(params, function (err, data) {
        //     // if (err) console.log(err, err.stack)
        //     // else console.log(data)
        //     console.log('error')
        // })
        // console.log(response)
    }

    // const s3 = new aws.S3({
    //     secretAccessKey: process.env.SECRETACCESSKEY,
    //     accessKeyId: process.env.ACCESSKEYID,
    // })

    // const params = {
    //     Bucket: process.env.BUCKETNAME,
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

