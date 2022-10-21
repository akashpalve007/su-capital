const { sendResponse } = require("./responseHandler")
const aws = require("aws-sdk")

module.exports = {
    uploadFile: function (req, res) {

        let { key, content } = req.body

        key = key.split(" ").join("-")

        if (!key || !content) {
            res.status(400).json({
                status: 400,
                data: "please provide valid data"
            })
        } else {
            //? AWS Configs 
            const config = {
                signatureVersion: 'v4',
                accessKeyId: process.env.s3AccessKeyId,
                secretAccessKey: process.env.s3AccessSecret,
                region: process.env.s3Region,
            }
            var s3 = new aws.S3(config);
            const BUCKET = process.env.s3Bucket;
            try {
                const contentType = content;
                const expireSeconds = 60 * 200;

                const bucketParams = {
                    Bucket: BUCKET,
                    Key: key,
                    ContentType: contentType,
                    Expires: expireSeconds,
                };

                bucketParams.ACL = 'public-read';

                const url = s3.getSignedUrl('putObject', bucketParams);

                // console.log("config : ", config)
                // console.log("confbucketParamsig : ", bucketParams)

                if (url) {
                    sendResponse(res, 200, url, null)
                } else {
                    sendResponse(res, 400, null, "Unable to generate signed url")

                }
            } catch (error) {
                sendResponse(res, 500, null, "Internal Server Error")
            }
        }
    }
}