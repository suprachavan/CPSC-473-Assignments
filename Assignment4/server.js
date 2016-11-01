// {
//     "node": true,
//     "camelcase": true,
//     "indent": 4,
//     "undef": true,
//     "quotmark": "single",
//     "maxlen": 80,
//     "trailing": true,
//     "curly": true,
//     "eqeqeq": true,
//     "forin": true,
//     "immed": true,
//     "latedef": true,
//     "newcap": true,
//     "nonew": true,
//     "unused": true,
//     "strict": true
// }

 /*global require*/
 /*global module*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var redis = require('redis');

// create a client to connect to Redis
var redisClient = redis.createClient();
var counts = {};

mongoose.connect('mongodb://localhost/Assignment4');
mongoose.set('debug', true);

var qaSchema = new mongoose.Schema({  
  question: String,
  answer: String
  // answerId: String
});

var questionAnswerDB = mongoose.model('qa', qaSchema); 

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use("/", express.static("public"));

console.log('server side, listening at port 3000');

app.get('/question', function(req, res){

  console.log('in get all questions and answer IDs');
    questionAnswerDB.find({}, function(err, qaPairs){
        if(err){
          console.log('error!!!');
          res.json('error :'+err);
        }
        else{
          console.log(qaPairs);
          console.log('in else');
          res.json({qaPairList: qaPairs});
        }
    });

});

app.post('/question', function(req, res){

    console.log('inside add qa pair /question method');
    questionAnswerDB.findOne({question: req.body.jQuestion}).exec(function(err, qaPair){
    if(!qaPair){
          var q1 = new questionAnswerDB({question: req.body.jQuestion,
                answer: req.body.jAnswer,
                answerId: req.body.jAnswerId});
                q1.save(function(err, result) {
                  if(err){
                      console.log('error while adding new qa pair'+err);
                      res.json({message : 'error while adding new qa pair'});
                  }
                  else{
                      console.log('added new qa pair');
                      res.json({message:'added new qa pair successfully'});
                  }
                });
        }
        else{
          console.log('qa pair already exists');
          res.json({message : 'qa pair already exists'});
        }
      }); 
    
  });

app.post('/answer', function(req, res){
  
    console.log(req.body.userAnswer);
    console.log(req.body.userAnswerID);
    questionAnswerDB.findById(req.body.userAnswerID).exec(function(err, qaPair) {
      if(!qaPair){
        console.log('something wrong, try again'+err);
        res.json({message :'something wrong, try again'+err});
      }
      else{
        if(req.body.userAnswer === qaPair.answer){
          //increase score
          redisClient.incr('right');
          counts.right = counts.right++;
          console.log('score increased,answer correct');
          res.json({correct: 'true'});
        }
        else{
          //increase wrong count score
          redisClient.incr('wrong');
          counts.wrong = counts.wrong++;
          console.log('score wrong increased,answer incorrect');
          res.json({correct: 'false'});
        }
      }
    });
});

app.get('/score', function(req, res){
    console.log('in scrore');

    redisClient.mget(["right", "wrong"], function (err, results) {
    if (err !== null) {
        console.log("ERROR: " + err);
        return;
    }

    counts.right = parseInt(results[0], 10) || 0;
    counts.wrong = parseInt(results[1], 10) || 0;
    console.log(counts.right);
    console.log(counts.wrong);
    res.json({right: counts.right, wrong: counts.wrong});
    });
    
});

app.listen(3000);
module.exports = counts;