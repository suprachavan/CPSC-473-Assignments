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

/*
CPSC 473 Assignment 5 
Submitted by: Supra Chavan(CWID: 893448084)
Email:supra.chavan@csu.fullerton.edu
File: Server side javascript
*/
var loggedInUsersList = [];
var updateLoggedInUsers, updateNewUsers, updateQuestion, updateAnswer, updateScore;
var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);


var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var redis = require('redis');

var connectionArr = [];


// Register events on socket connection
io.sockets.on('connection', function(socket){ 
  connectionArr.push(socket);
  console.log(connectionArr.length+'sockets connected');

   updateLoggedInUsers = function(){
      io.sockets.emit('getUsers', loggedInUsersList);
    };
    updateNewUsers = function(){
        socket.on('new user',function(data,callback){
        callback(true);
        socket.userName= data;
    	loggedInUsersList.push(socket.userName);
    	updateLoggedInUsers();
        console.log(loggedInUsersList);
      });
    };
    socket.on('disconnect user', function(data){
      socket.username = data;
      loggedInUsersList.pop(socket.username);
      updateLoggedInUsers();
    });
    socket.on('newRoundStarted', function(data){
    	console.log(data);
    });
    updateQuestion = function(question){
      io.sockets.emit('getQuestion', question);
      console.log('in updateQuestion '+question);
    };
    updateAnswer = function(answer){
      io.sockets.emit('getAnswer', answer);
      console.log('in updateAnswer '+answer);
    };
    updateScore = function(score){
    	io.sockets.emit('getScore', score);
    	console.log('in updateAnswer '+score);
    };
});

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

var userSchema = new mongoose.Schema({  
	userName : String
});

var questionAnswerDB = mongoose.model('qa', qaSchema); 
var userDB = mongoose.model('user', userSchema);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use("/", express.static("public"));

console.log('server side, listening at port 3000');

app.post('/signup', function(req, res){

    console.log('inside add user /signup method');
    userDB.findOne({userName: req.body.userName}).exec(function(err, user){
    if(!user){
          var u1 = new userDB({userName: req.body.userName});
                u1.save(function(err, result) {
                  if(err){
                      console.log('error while adding new user'+err);
                      res.json({message : 'error while adding new user'});
                  }
                  else{
                      console.log('added new user');
                      res.json({message:'added new user'});
                  }
                });
        }
        else{
          console.log('user already exists');
          res.json({message : 'user already exists'});
        }
      }); 
    
 });

app.post('/login', function(req, res){

    console.log('inside login user /login method');
    userDB.findOne({userName: req.body.userName}).exec(function(err, user){
	    if(!user){
			console.log('wrong username'+err);
			res.status(403).send('wrong username');
		}
	    else{
	      console.log('login auccessful');
        
	      res.status(200).json({loggedUser: user, message : 'user logged in successfully'});
	      updateNewUsers();
	    } 
	});
});


app.get('/question', function(req, res){

  console.log('in get all questions and answer IDs');

	questionAnswerDB.find({},{question:1, _id:1}, function(err, qaPairs) {
	    if (err) {
	      console.log('error while getting question'+err);
	      res.json({message: 'error while getting question'+err});
	    } 
	    else {
	      var qaPairIndex = qaPairs[Math.floor(Math.random()*qaPairs.length)]; //Function to get one random question from the database at a time
	      console.log(qaPairIndex);
	      
	      res.json({newQuestion: qaPairIndex});
	      updateQuestion(qaPairIndex.question);
	    }
	}); //end find

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
          updateAnswer('correct: true');
          res.json({correct: 'true'});
        }
        else{
          //increase wrong count score
          redisClient.incr('wrong');
          counts.wrong = counts.wrong++;
          console.log('score wrong increased,answer incorrect');
          updateAnswer('correct: false');
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
    updateScore(counts);
    res.json({right: counts.right, wrong: counts.wrong});
    });
    
});

server.listen(3000);
module.exports = counts;