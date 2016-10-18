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
  var result = ArrayOps.funcAvg(req.body.num);
  var response = {"result": result};
  res.json(response);
});

app.post('/largestNumber', function(req, res){
  var result = ArrayOps.funcLargest(req.body.num);
  var response = {"result": result};
  res.json(response);
});

app.post('/atleastOneEvenNumber', function(req, res){
  var param = JSON.stringify(req.body);
  var obj = JSON.parse(param);
  var result = ArrayOps.funcEvenOne(obj.num);
  var response = {"result": result};
  res.json(response);
});

app.post('/allEvenNumbers', function(req, res){
  var param = JSON.stringify(req.body);
  var obj = JSON.parse(param);
  var result = ArrayOps.funcEvenAll(obj.num);
  var response = {"result": result};
  res.json(response);
});

app.post('/stringContainsOnce', function(req, res){
  var param = JSON.stringify(req.body);
  var obj = JSON.parse(param);
  var result = ArrayOps.funcArrContains(obj.strArr, obj.subStr);
  var response = {"result": result};
  res.json(response);
});

app.post('/stringContainsTwice', function(req, res){
  var param = JSON.stringify(req.body);
  var obj = JSON.parse(param);
  var result = ArrayOps.funcArrContainsTwo(obj.strArr, obj.subStr);
  var response = {"result": result};
  res.json(response);
});

app.post('/stringContainsNTimes', function(req, res){
  var param = JSON.stringify(req.body);
  var obj = JSON.parse(param);
  var result = ArrayOps.funcArrContainsNTimes(obj.strArr, obj.subStr, obj.number);
  var response = {"result": result};
  res.json(response);
});

app.listen(3000);