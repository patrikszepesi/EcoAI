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

    if (!year) return res.status(400).send("No date");



const params = {
      Bucket: 'plastic-detection-batch-transform-2023',
      Prefix: `output-images/${year}/${month}/${day}/`,
      };


let boolValue;
s3.listObjects(params, function(err, data) {
  if (err) {
    return 'There was an error viewing your album: ' + err.message
  } else {
    console.log(data,"<<<all content");
    console.log(data.Contents.length)
    console.log(data.Contents)
    if(data.Contents.length == 0){
      boolValue=false
    }else{
      boolValue=true
    }
  return res.json({imageData:data.Contents,hasImages:boolValue})
  }
})




   } catch (err) {
  console.log(err)}

}
