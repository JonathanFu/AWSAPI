var express = require('express');
var app = express();
const AWS = require( 'aws-sdk' );
const s3  = new AWS.S3();

app.get('/', function(req, res) {
  res.send({
    "Output": "Hello World By Get"
  });
});

app.post('/', function(req, res) {
  res.send({
    "Output": "Hello World By Post"
  });
});

app.get('/chartData/:chart', function(req, res) {
  
    const params = {Bucket: process.env.BUCKET, Key: req.params.chart + '.json'};

    // Retrieve the object
    s3.getObject(params, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            console.log("Raw text:\n" + data.Body.toString('ascii'));
            res.send(JSON.parse(data.Body));                
        }
    });
  
});

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app
