aws = require('aws-sdk')

module.exports = async (filePath) => {

    aws.config.update({
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    })

    const s3 = new aws.S3();

    const params = {
        Key: filePath,
        Bucket: process.env.BUCKET_NAME
    }

    s3.deleteObject(params, (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });
}