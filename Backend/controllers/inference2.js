import axios from 'axios'
const AWS = require('aws-sdk');
const fs = require("fs");





const s3 = new AWS.S3({
accessKeyId: process.env.AWS_ACCESS_KEY,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const getInference = async (req, res) => {
  try {


    const { year } = req.body;
    const { month } = req.body;
    const { day } = req.body;



//do more checks
    if (!year) return res.status(400).send("No date");



  const params = {
        Bucket: 'object-detection-plastic-batch-transform',
        Key: `cleansed-jsons/${year}/${month}/${day}/${year}_${month}_${day}.json`, // file will be saved as testBucket/contacts.csv
        };

let jsonBytes;

  s3.getObject(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else{
    jsonBytes = JSON.parse(data.Body.toString('utf-8'));
     console.log(jsonBytes);
     return res.json({status:200, jsonData:jsonBytes})
  }
      });

   } catch (err) {
  console.log(err)}

}
