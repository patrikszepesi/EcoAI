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

// 1,3 540 960
// output 3,135 240 or 540 960

//prelabeling scratch
//production is trasnfer learnig
//do not store, not in need,  


//do more checks
    if (!year) return res.status(400).send("No date");





/*
        for (const [key, value] of Object.entries(images)) {
          console.log("HHII")
         let params2 = { Bucket: 'object-detection-plastic-batch-transform', Key: value.Key};
         s3.getObject(params2, function(err, data2) {
           if(err){
             throw err;
           }else{
            console.log('data2')
           //  imageData.push(1)
             //console.log(data)



           //  res.writeHead(200, {'Content-Type': 'image/jpeg'});
             //res.write(data.Body, 'binary');
             //res.end(null, 'binary');
           }

         });
        }

*/



/*
 for(let i = 0; i < data.Contents.length; i++){
   console.log(i,"waldoooooo")
   let params2 = { Bucket: 'object-detection-plastic-batch-transform', Key: i.Key};
         s3.getObject(params2, function(err, data) {
           if(err){
             throw err;
           }else{
             images.push(data.Body)
           //  res.writeHead(200, {'Content-Type': 'image/jpeg'});
             //res.write(data.Body, 'binary');
             //res.end(null, 'binary');
           }

         });




 }
 */




const params = {
      Bucket: 'plastic-detection-batch-transform-2023',
      Prefix: `output-images/${year}/${month}/${day}/`, // file will be saved as testBucket/contacts.csv
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
  //  data.Contents.forEach(function(obj,index) {
    //  console.log(obj.Key,"<<<file path")
    //})
  }
})







/*
  s3.getObject(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else{

    console.log(data)
     return res.json({status:200, data:data})
  }
      });
      */

   } catch (err) {
  console.log(err)}

}
