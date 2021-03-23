aws = require('aws-sdk')
const { accessKeyId, secretAccessKey, region, Bucket } = require('./config.json')

module.exports = async (filePath) => {
    console.log(`delete ${filePath}`)
    aws.config.update({
        region,
        accessKeyId,
        secretAccessKey
    })

    const s3 = new aws.S3();

    const params = {
        Key: filePath,
        Bucket
    }

    s3.deleteObject(params, (err, data) => {
        if (err) console.log(err, err.stack);
    });
}