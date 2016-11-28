/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

/* global io: true */
/* global ko: true */

/*
CPSC 473 Assignment 6 
Submitted by: Supra Chavan(CWID: 893448084)
Email:supra.chavan@csu.fullerton.edu
File: Client side javascript
Some part of code (e.g. signup, login) resembles code from our CPSC 473 Project 1- Filmder
https://github.com/suprachavan/Project1-Filmder
*/

var socket = io.connect();
var vm;

/**
* Function to get the current score
*/
var getScore = function () {
    'use strict';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        url:
        'http://localhost:3000/score',
        success: function (data) {
            console.log('success');
            console.log(data);
        }
    });
};

socket.on('getQuestion', function (data) {
    'use strict';
    console.log(data);
    vm.showQuestion(false);
    vm.showNextButton(false);
    vm.uanswer('');
    vm.questionLabel(data.question);
    vm.spanId(data._id);
    vm.showAnswersSegment(true);
});

socket.on('getAnswer', function (data) {
    'use strict';
    vm.result2(data);
    getScore();
    vm.showScoresSegment(true);
    vm.showNextButton(true);
});

socket.on('getScore', function (data) {
    'use strict';
    console.log(data);
    vm.rightCount('Right score : ' + data.right);
    vm.wrongCount('Wrong score : ' + data.wrong);
});

/**
* Function for sign up functionality
*/
var signUpFunction = function (jsonStr) {
    'use strict';
    $.ajax({
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json',
        url: 'http://localhost:3000/signup',
        success: function (data) {
            console.log('success');
            vm.showSignupResult(true);
            vm.signupMsg(data.message);
        }
    });
};

function OnlineUser(onlineUserName) {
    'use strict';
    this.onlineUserName = onlineUserName;
}

/**
* Function for login functionality
*/
var logInFunction = function (jsonStr) {
    'use strict';
    $.ajax({
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json',
        url: 'http://localhost:3000/login',
        success: function (data) {
            console.log('success');
            vm.span1Name(data.loggedUser.userName);
            vm.nameLabel(data.loggedUser.userName);
            vm.showLogoutMenu(true);
            vm.showUserMenu(false);
            vm.showQuestion(true);
            socket.emit('new user', vm.span1Name(), function (data) {
                console.log(data);
            });
            vm.showLoginResult(true);
            vm.loginMsg(data.message);
            vm.showPtag(true);
            socket.on('getUsers', function (data) {
                var onlineUsers = [];
                vm.showUserList(true);
                if (data.length === 0) {
                    onlineUsers.push(new OnlineUser('Current Online Players: 0'));
                }
                else {
                    for (var i = 0; i < data.length; i++) {
                        onlineUsers.push(new OnlineUser(data[i]));
                    }
                }
                vm.userList(onlineUsers);
            });
            // console.log(vm.userList);
        },
        error: function (data) {
            console.log(data.responseText);
            vm.loginMsg(data.responseText);
        }
    });
};


/**
* Function to get one random question and display
*/
var getQuestions = function () {
    'use strict';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        url:
        'http://localhost:3000/question',
        success: function (data) {
            console.log('success');
            console.log(data);
        }
    });
};

/**
* Function to post a new question-answer pair
*/
var postQuestion = function (jsonStr) {
    'use strict';
    $.ajax({
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json',
        url:
        'http://localhost:3000/question',
        success: function (data) {
            console.log('success');
            vm.showResult1(true);
            vm.result1(data.message);
            vm.showQuestionsSegment(false);
            vm.postedQuestion('');
            vm.postedAnswer('');
        }
    });
};

/**
* Function to post user's answer for 1 question
*/
var postAnswer = function (jsonStr) {
    'use strict';
    $.ajax({
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json',
        url: 'http://localhost:3000/answer',
        success: function (data) {
            console.log('success');
            console.log(data);
        }
    });

};

function ViewModel() {
    'use strict';
    this.span1Name = ko.observable();
    this.spanId = ko.observable();
    this.nameLabel = ko.observable();

    this.signupMsg = ko.observable();
    this.loginMsg = ko.observable();

    this.result1 = ko.observable();
    this.result2 = ko.observable();
    this.questionLabel = ko.observable();

    this.showSpan = ko.observable(false);
    this.showSpan1 = ko.observable(false);
    this.showQuestion = ko.observable(false);
    this.showPtag = ko.observable(false);


    this.showLogoutMenu = ko.observable(false);
    this.showUserMenu = ko.observable(true);

    this.showResult1 = ko.observable(false);
    this.showSignupResult = ko.observable(false);
    this.showLoginResult = ko.observable(false);
    this.showAnswersSegment = ko.observable(false);
    this.showQuestionsSegment = ko.observable(false);
    this.showScoresSegment = ko.observable(false);
    this.showNextButton = ko.observable(false);

    this.uanswer = ko.observable();
    this.postedQuestion = ko.observable();
    this.postedAnswer = ko.observable();
    this.signedupUser = ko.observable();
    this.loggedinUser = ko.observable();
    this.rightCount = ko.observable();
    this.wrongCount = ko.observable();


    this.onSignUpClick = function () {
        this.signedupUser('');
        $('.signup_result').empty();
        $('.signup_modal').modal('show');
    };

    this.signUpUser = function () {
        var uName = document.getElementsByName('uname')[0].value;
        var jsonStr = JSON.stringify({ userName: uName });
        signUpFunction(jsonStr);
    };

    this.onLogInClick = function () {
        this.loggedinUser('');
        $('.login_result').empty();
        $('.login_modal').modal('show');

    };

    this.logInUser = function () {
        var uName = document.getElementsByName('username')[0].value;
        var jsonStr = JSON.stringify({ userName: uName });
        logInFunction(jsonStr);

    };

    this.onLogOutClick = function () {
        this.showUserMenu(true);
        this.showLogoutMenu(false);
        this.showUserList(false);
        this.showQuestion(false);
        this.showAnswersSegment(false);
        this.showPtag(false);
        this.showScoresSegment(false);
        console.log(vm.nameLabel());
        socket.emit('disconnect user', vm.nameLabel(), function (data) {
            console.log(data);

        });
    };

    this.onPostQuestionClick = function () {
        this.result1('');
        this.showQuestionsSegment(true);
    };

    this.onSubmitClick = function () {

        var question = document.getElementsByName('question')[0].value;
        var answer = document.getElementsByName('answer')[0].value;

        var jsonStr = JSON.stringify({
            jQuestion: question,
            jAnswer: answer
        });
        console.log(jsonStr);
        postQuestion(jsonStr);

    };

    this.onShowQuestionClick = function () {
        this.showAnswersSegment(true);
        getQuestions();
    };

    this.onPostAnswerClick = function () {
        console.log('in post question click');
        $('.result2').empty();
        $('.uanswer').empty();
        var uAnswer = document.getElementsByName('uanswer')[0].value;
        console.log(vm.spanId());
        var uAnswerID = vm.spanId();
        var jsonStr = JSON.stringify({
            userAnswer: uAnswer,
            userAnswerID: uAnswerID
        });
        console.log(jsonStr);
        postAnswer(jsonStr);
    };

    this.userList = ko.observableArray([]);
    this.showUserList = ko.observable(false);

    this.onNextQuestionClick = function () {
        getQuestions();
    };
}



vm = new ViewModel();
ko.applyBindings(vm);
