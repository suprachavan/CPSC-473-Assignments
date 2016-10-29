/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

// Client side javascript

/*
CPSC 473 Assignment 4 
Submitted by: Supra Chavan(CWID: 893448084)
Email:supra.chavan@csu.fullerton.edu
File: Client side javascript
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

                        console.log(data.qaPairList);
                        console.log(data.qaPairList.length);


                        for(var i=0;i<data.qaPairList.length;i++){

                            console.log(data.qaPairList[i].question);
                            console.log(data.qaPairList[i].answerId);
                            $('.allquestions_label').html(
                            data.qaPairList[i].question);
                            $('.span').html(data.qaPairList[i].answerId);
                        }
                                    
                      	}
          });
};
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
                                    console.log(data);
                                    //  $result = $('<p class='+classStr+'>').
                                    //  text('returned '+data.result);
                                    // $('.result3').append($result);
                                    $('.result1').append(data);
                                    $('.questions').trigger('reset');
                                    $('.questions').hide();
                                }
                    });
};

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
                                    //  $result = $('<p class='+classStr+'>').
                                    //  text('returned '+data.result);
                                    // $('.result3').append($result);
                                    $('.result2').append(data.correct);
                                    $('.answers').trigger('reset');
                                }
                    });
};

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
                        console.log(data.right);
                        console.log(data.wrong);
                        $('.right_score_label').html(
                        	'Right score :'+data.right);
                        $('.wrong_score_label').html(
                        	'Wrong score :'+data.wrong);
                                }
                    });
};

    // var jsonStr, jsonStr2, jsonStr3, $result; 
    // var classStr = 'r';
    var main = function(){
        'use strict';

        console.log('app.js at client side');

        getScore();

        $('.questions').hide();
        $('.answers').hide();
        $('.scores').hide();

        $('.span').hide();
        getQuestions();

        $('.post_question').on('click', function(){
            $('.questions').show();
        });

        $('.submit').on('click', function(){
            var question = document.getElementsByName('question')[0].value;
            var answer = document.getElementsByName('answer')[0].value;
            var answerid =  document.getElementsByName('answerid')[0].value;

            var jsonStr = JSON.stringify({
            	jQuestion: question, 
            	jAnswer: answer, 
            	jAnswerId: answerid});
            console.log(jsonStr);
            postQuestion(jsonStr);
        });

        $('.show_question').on('click', function(){
            $('.question_label').html($('.allquestions_label').text());
            $('.answers').show();


            $('.post_answer').on('click', function(){
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
    