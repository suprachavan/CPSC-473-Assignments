/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

// Client side javascript

/*
CPSC 473 Assignment 4 
Submitted by: Supra Chavan(CWID: 893448084)
Email:supra.chavan@csu.fullerton.edu
File: Client side javascript
*/

/**
* Function to get all the questions and display the list
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
                        
                        for(var i=0;i<data.qaPairList.length;i++){

                            $('.allquestions_seg').append(
                                '<div class="ui list">'+
                                '<div class="item">'+
                            data.qaPairList[i].question+'</div></div');
                        }
                        $('.span').html(data.qaPairList[0]._id);
                            console.log($('.span').text());
                        $('.span1').html(
                            data.qaPairList[0].question);            
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
                    url: 
                    'http://localhost:3000/answer',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(data);
                                    $('.result2').append(data.correct);
                                    $('.answers').trigger('reset');
                                }
                    });
};

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
                        console.log(data.wrong);
                        $('.right_score_label').html(
                        	'Right score :'+data.right);
                        $('.wrong_score_label').html(
                        	'Wrong score :'+data.wrong);
                                }
                    });
};
var main = function(){
    'use strict';

    console.log('app.js at client side');

    getScore();

    $('.questions').hide();
    $('.answers').hide();
    $('.scores').hide();

    $('.span').hide();
    $('.span1').hide();
    getQuestions(); //get all the questions and display on the page

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
        $('.question_label').html($('.span1').text());
        $('.answers').show();

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
    });

    $('.show_score').on('click', function(){
    	getScore();
    	$('.scores').show();
    	
    });
};

$(document).ready(main);
    