/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

/* global io: true */

/*
CPSC 473 Assignment 5 
Submitted by: Supra Chavan(CWID: 893448084)
Email:supra.chavan@csu.fullerton.edu
File: Client side javascript
*/

var socket = io.connect();

/**
* Function to get the current score
*/
var getScore = function(){
    'use strict';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        url: 
        'http://localhost:3000/score',            
        success: function(data) {
                console.log('success');
                console.log(data);
        }
    });
};

socket.on('getQuestion', function(data){
    'use strict';
    console.log(data);
    $('.show_question').remove();
    $('.nextButton').remove();
    $('.qa_form').trigger('reset');
    $('.question_label').html(data.question);
    $('.span').html(data._id);
    console.log($('.span').text()); 
    $('.answers').show();
});

socket.on('getAnswer', function(data){
    'use strict';
    console.log(data);
    $('.result2').html(data);
    getScore();
    $('.scores').show();
    if(!$('.nextButton').length){
        $('.answers').append(
'<br><div class="ui buttom aligned nextButton button">'+
'next question</div>');
    }
});

socket.on('getScore', function(data){
    'use strict';
    console.log(data);
    $('.right_score_label').html('Right score :'+data.right);
    $('.wrong_score_label').html('Wrong score :'+data.wrong);
});

/**
* Function for sign up functionality
*/
var signUpFunction = function(jsonStr){
    'use strict';
    $.ajax({
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json',
        url: 'http://localhost:3000/signup',            
        success: function(data) {
            console.log('success');
            $('.signup_result').append(data.message);
        }
    });
};

/**
* Function for login functionality
*/
var logInFunction = function(jsonStr){
    'use strict';
    $.ajax({
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json',
        url: 'http://localhost:3000/login',            
        success: function(data) {
                console.log('success');
                $('.span1').html(data.loggedUser.userName);
                $('.nameLabel').html(data.loggedUser.userName);
                console.log($('.span1').text());
                $('.right_menu1').hide();
                $('.right_menu2').show();
                $('.show_question').show();
                socket.emit('new user', $('.span1').text(), function(data){
                    console.log(data);
                });
                $('.login_result').empty();
                $('.login_result').append(data.message);
                if(!$('.CurrUsers').length){
                    $('.user_seg').append(
                    '<p class="CurrUsers">Current Online Players : </p>');
                }
                socket.on('getUsers', function(data){
                    $('.user_label').remove();
                    for(var i=0;i<data.length;i++){
                        $('.user_seg').append(
                        '<p class="user_label">'+
                        data[i]+'</p>');
                    }   
                });
        },
        error: function(data){
            console.log(data.responseText);
            $('.login_result').append(
                data.responseText);
        }
    });
};


/**
* Function to get one random question and display
*/
var getQuestions = function(){
    'use strict';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        url: 
        'http://localhost:3000/question',            
        success: function(data) {
            console.log('success');
            console.log(data);
        }
    });
};

/**
* Function to post a new question-answer pair
*/
var postQuestion = function(jsonStr){
    'use strict';
    $.ajax({
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json',
        url: 
        'http://localhost:3000/question',            
        success: function(data) {
                        console.log('success');
                        $('.result1').append(data.message);
                        $('.questions').trigger('reset');
                        $('.questions').hide();
                        $('.qa_form').trigger('reset');
        }
    });
};

/**
* Function to post user's answer for 1 question
*/
var postAnswer = function(jsonStr){
    'use strict';
    $.ajax({
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json',
        url: 'http://localhost:3000/answer',            
        success: function(data) {
            console.log('success');
            console.log(data);
            $('.qa_form').trigger('reset');
        }
    });

};


var main = function(){
    'use strict';

    console.log('app.js at client side');

    $('.questions').hide();
    $('.answers').hide();
    $('.scores').hide();
    $('.right_menu2').hide();
    $('.show_question').hide();

    $('.span').hide();
    $('.span1').hide();

    $('.signup').on('click', function(){
        $('.signup_form').trigger('reset');
        $('.signup_result').empty();
        $('.signup_modal').modal('show');
    });

    $('.signup_btn').on('click', function(){
        var uName =document.getElementsByName('uname')[0].value;
        var jsonStr = JSON.stringify({userName : uName});
        signUpFunction(jsonStr);
    });

    $('.login').on('click', function(){
        $('.start_game').remove();
        $('.login_form').trigger('reset');
        $('.login_result').empty();
        $('.login_modal').modal('show');
    });

    $('.login_btn').on('click', function(){
        var uName =document.getElementsByName('username')[0].value;
        var jsonStr = JSON.stringify({userName : uName});
        logInFunction(jsonStr);
    });

    $('.logout').on('click', function(){ 
        $('.right_menu1').show();
        $('.right_menu2').hide();
        $('.show_question').hide();
        $('.answers').hide();
        socket.emit('disconnect user', $('.nameLabel').val(), function(data){
            console.log(data);                      
        });
        
    });

    $('.answers').on('click', '.nextButton', function(){
        getQuestions();
        $('.nextButton').remove();
    });

    $('.post_question').on('click', function(){
        $('.question').val('');
        $('.answer').val('');
        $('.result1').empty();
        $('.questions').show();
    });

    //submit button cliked to post a new question-answer pair
    $('.submit').on('click', function(){
        var question = document.getElementsByName('question')[0].value;
        var answer = document.getElementsByName('answer')[0].value;

        var jsonStr = JSON.stringify({
            jQuestion: question, 
            jAnswer: answer 
            });
        console.log(jsonStr);
        postQuestion(jsonStr);
    });

    $('.show_question').on('click', function(){
        getQuestions();
        socket.emit('newRoundStarted', 'new round has started');
        $('.show_question').remove();
     });

    //post answer for question
    $('.post_answer').on('click', function(){
        $('.result2').empty();
        $('.uanswer').empty();
        var uAnswer = document.getElementsByName('uanswer')[0].value;
        var uAnswerID = $('.span').text();
        var jsonStr = JSON.stringify({userAnswer: uAnswer, 
            userAnswerID: uAnswerID});
        console.log(jsonStr);
        postAnswer(jsonStr);
    });
};

$(document).ready(main);
    