/*{
    "node": true,
    "camelcase": true,
    "indent": 4,
    "undef": true,
    "quotmark": "single",
    "maxlen": 80,
    "trailing": true,
    "curly": true,
    "eqeqeq": true,
    "forin": true,
    "immed": true,
    "latedef": true,
    "newcap": true,
    "nonew": true,
    "unused": true,
    "strict": true
}*/

 /*global require*/

/*
CPSC 473 Assignment 3 
Submitted by: Supra Chavan(CWID: 893448084)
Email:supra.chavan@csu.fullerton.edu
File: Server side javascript
*/

// server side

var express = require('express');
var ArrayOps = require('./array_op.js');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/', express.static('public'));

console.log('server side, listening at port 3000');
app.post('/avg', function(req, res){
  var result = ArrayOps.funcAvg(req.body);
  res.json(result);
});

app.post('/largestNumber', function(req, res){
  var result = ArrayOps.funcLargest(req.body);
  res.json(result);
});

app.post('/atleastOneEvenNumber', function(req, res){
  var result = ArrayOps.funcEvenOne(req.body);
  res.json(result);
});

app.post('/allEvenNumbers', function(req, res){
  var result = ArrayOps.funcEvenAll(req.body);
  res.json(result);
});

app.post('/stringContainsOnce', function(req, res){
  var result = ArrayOps.funcArrContains(req.body.strArr, req.body.subStr);
  res.json(result);
});

app.post('/stringContainsTwice', function(req, res){
  var result = ArrayOps.funcArrContainsTwo(req.body.strArr, req.body.subStr);
  res.json(result);
});

app.post('/stringContainsNTimes', function(req, res){
  var result = ArrayOps.funcArrContainsNTimes(req.body.strArr, req.body.subStr, req.body.number);
  res.json(result);
});

app.listen(3000);