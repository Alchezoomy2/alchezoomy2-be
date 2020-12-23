import aws from 'aws-sdk';
import fs from 'fs';

export default {
    signup(req, res) {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY,
            region: process.env.REGION
        });

        const s3 = new aws.s3();
        var params = {
            ACL: 'public-read',
            Bucket: process.env.BUCKET_NAME,
            Body: fs.createReadStream(req.file.path),
            Key: `test/${fileName}`
        }

        s3.upload(params, (err, data) => {
            if (err) {
                console.log('Error occcured while trying to upload to s3 bucket', err);
            }

            fs.unlinkSync(req.file.path); //Empty temp folder

        })
    }
}