import axios from 'axios'
const AWS = require('aws-sdk');



var dateStr = new Date().toISOString().slice(0, 10);
var year = dateStr.slice(0, 4);
var month = dateStr.slice(5, 7);
var day = dateStr.slice(8, 10);



console.log(year,month,day)


const s3 = new AWS.S3({
accessKeyId: process.env.AWS_ACCESS_KEY,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const predictImage = async (req, res) => {
  try {


    const { image } = req.body;
    const { name } = req.body;

    console.log(image)

    if (!image) return res.status(400).send("No image");
    let cleansedImage=image.replace(/^data:image\/\w+;base64,/, "")

    let b64string = cleansedImage
    //Buffer objects are used to represent a fixed-length sequence of bytes
    let buffer = Buffer.from(b64string, 'base64');

    const params =
      {
      Bucket: 'plastic-detection-batch-transform-2023', // pass your bucket name
      Key: `images/${year}/${month}/${day}/${name}`, //
      Body: buffer
      };

      s3.upload(params, function(s3Err, data) {
      if (s3Err){
        console.log(s3Err)
        return res.json({message: `Failed: ${s3Err}`,status:`Upload failed: ${s3Err}`})
      }
      else{
        console.log(`File uploaded successfully at ${data.Location}`)
        return res.json({message:`File uploaded successfully at ${data.Location}`, status:'Success'})
      }
      });

   } catch (err) {
  console.log(err)}

}
