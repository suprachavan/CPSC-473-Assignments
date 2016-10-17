/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

// Client side javascript

/*
CPSC 473 Assignment 3 
Submitted by: Supra Chavan(CWID: 893448084)
Email:supra.chavan@csu.fullerton.edu
File: Client side javascript
*/

    var jsonStr, jsonStr2, jsonStr3, $result; 
    var classStr = 'r';
    var main = function(){
        'use strict';

        console.log('app.js at client side');
        var obj = [2,22,32,4];
        var str = ['hello', 'world','goodbye','world'];
        var sub = 'hello';
        var count =3;
        var strObj = {
                    strArr: str, 
                    subStr: sub};
        var strObj2 = {
                    strArr:str, 
                    subStr: sub,
                    number: count};

        $('.num_arr').text('Input Numbers Array : '+obj);
        $('.str_arr').text('Input String Array: '+strObj.strArr);
        $('.sub_str').text('Input sub-string to look for: '+strObj.subStr);
        $('.count').text('Occurence count: '+strObj2.number);


        
        
        jsonStr = JSON.stringify(obj);
        jsonStr2 = JSON.stringify(strObj);
        jsonStr3 = JSON.stringify(strObj2);
        console.log(jsonStr);
        console.log(jsonStr2);
        console.log(jsonStr3);

        $('.avg_btn').on('click', function (e) 
        {
            e.preventDefault();
            console.log('average button clicked');

            $.ajax({
                    type: 'POST',
                    data: jsonStr,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 
                    'http://localhost:3000/avg',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(data);
                                    $result = $('<p class='+classStr+'>').
                                    text('Result : '+data);
                                    $('.result1').append($result);
                                }
                    });
        });
        $('.lrge_btn').on('click', function (e) {
            e.preventDefault();
            console.log('largest number button clicked');

            $.ajax({
                    type: 'POST',
                    data: jsonStr,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 
                    'http://localhost:3000/largestNumber',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(data);
                                    $result = $('<p class='+classStr+'>').
                                    text('Result : '+data);
                                    $('.result2').append($result);
                                }
                    });
        });
        $('.evn1_btn').on('click', function (e) {
            e.preventDefault();
            console.log('Even one button clicked');

            $.ajax({
                    type: 'POST',
                    data: jsonStr,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 
                    'http://localhost:3000/atleastOneEvenNumber',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(data);
                                     $result = $('<p class='+classStr+'>').
                                     text('Result : '+data);
                                    $('.result3').append($result);
                                }
                    });
        });

        $('.evnall_btn').on('click', function (e) {
            e.preventDefault();
            console.log('Even All button clicked');

            $.ajax({
                    type: 'POST',
                    data: jsonStr,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 
                    'http://localhost:3000/allEvenNumbers',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(JSON.stringify(data));
                                    if (data) {
                                        $result = $('<p class='+classStr+'>').
                                        text('returned true, all numbers even');
                                        $('.result4').append($result);
                                    } else {
                                        $result = $('<p class='+classStr+'>').
                                        text('Function returned false');
                                        $('.result4').append($result);
                                    }
                                }
                        });
    });

    $('.str1_btn').on('click', function (e) {
        e.preventDefault();
        console.log('String once button clicked');

        $.ajax({
                    type: 'POST',
                    data: jsonStr2,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 
                    'http://localhost:3000/stringContainsOnce',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(JSON.stringify(data));
                                    if (data) {
                                        $result = $('<p class='+classStr+'>').
                                        text('returned true, str atleast once');
                                        $('.result5').append($result);
                                    } else {
                                        $result = $('<p class='+classStr+'>').
                                        text('Function returned false');
                                        $('.result5').append($result);
                                    }
                                }
                });
    });

    $('.str2_btn').on('click', function (e) {
        e.preventDefault();
        console.log('String twice button clicked');

        $.ajax({
                type: 'POST',
                data: jsonStr2,
                dataType: 'json',
                contentType: 'application/json',
                url: 
                'http://localhost:3000/stringContainsTwice',            
                success: function(data) {
                                    console.log('success');
                                    console.log(JSON.stringify(data));
                                    if (data) {
                                        $result = $('<p class='+classStr+'>').
                                        text('returned true, str occurs twice');
                                        $('.result6').append($result);
                                    } else {
                                        $result = $('<p class='+classStr+'>').
                                        text('Function returned false');
                                        $('.result6').append($result);
                                    }
                                }
                });
    });
    
    $('.strN_btn').on('click', function (e) {
        e.preventDefault();
        console.log('String n times button clicked');

        $.ajax({
                type: 'POST',
                data: jsonStr3,
                dataType: 'json',
                contentType: 'application/json',
                url: 
                'http://localhost:3000/stringContainsNTimes',            
                success: function(data) {
                                    console.log('success');
                                    console.log(JSON.stringify(data));
                                    if (data) {
                                        $result = $('<p class='+classStr+'>').
                                        text('returned true, str n times');
                                        $('.result7').append($result);
                                    } else {
                                        $result = $('<p class='+classStr+'>').
                                        text('Function returned false');
                                        $('.result7').append($result);
                                    }
                                }
                });
    });
};

$(document).ready(main);
    