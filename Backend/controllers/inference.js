import axios from 'axios'
const AWS = require('aws-sdk');
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const getInference = async (req, res) => {
  try {
    const { year, month, day } = req.body;

    if (!year) return res.status(400).send("No date");

    const prefix = `output-images/${year}/${month}/${day}/`;
    const s3Params = {
      Bucket: 'plastic-detection-batch-transform-2023',
      Prefix: prefix
    };

    s3.listObjectsV2(s3Params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        return res.status(500).send(err);
      } else {
        const imageKeys = data.Contents.map(obj => obj.Key);
        const promises = imageKeys.map(key => {
          const s3Params = {
            Bucket: 'plastic-detection-batch-transform-2023',
            Key: key
          };
          return new Promise((resolve, reject) => {
            s3.getObject(s3Params, (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve({
                  key: key,
                  data: data.Body
                });
              }
            });
          });
        });
        Promise.all(promises)
          .then(images => {
            // Process the retrieved images
            const result = images.map(image => ({
              key: image.key,
              data: image.data.toString('base64')
            }));
            console.log(result)
            return res.status(200).send(result);
          })
          .catch(err => {
            console.log(err, err.stack);
            return res.status(500).send(err);
          });
      }
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
}
