//server side module containing the array operations

/*
CPSC 473 Assignment 3 
Submitted by: Supra Chavan(CWID: 893448084)
Email:supra.chavan@csu.fullerton.edu
File: server side module
*/

var A = {};
var i;

A.funcAvg = function(nums) {
    var arrAvg =0;
    for(i=0;i<nums.length;i++){
        arrAvg = arrAvg + nums[i]/nums.length;
    }
    return arrAvg;
};

A.funcLargest = function(nums) {
    var numLargest =0;
    for(i=0;i<nums.length;i++){
        if(numLargest <nums[i]) {
            numLargest = nums[i];
        }
    }
    return numLargest;
};

A.funcEvenOne = function(nums) {
    var flag = false;
    for(i=0;i<nums.length;i++){
        if(nums[i]%2 === 0) {
            flag = true;
        }
    }
    if(flag === true){
        return true;
    }
    else{
        return false;
    }
};

A.funcEvenAll = function(nums) {

    var arrFlag = [];
    for(i=0;i<nums.length;i++){
        if(nums[i]%2 === 0) {
            arrFlag[i] = true;
        }
        else{
            arrFlag[i] = false;
        }
    }
    for(i=0;i<arrFlag.length;i++)
    {
        if(arrFlag[i] === true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
};

A.funcArrContains = function(strings, str) {

    var occurenceCounter=0, i;
    for(i=0;i<strings.length;i++){
        if(strings[i] === str){
            occurenceCounter++;
        }
    }
    if(occurenceCounter>0)
    {
        return true;
    }
    else{
        return false;
    }
};

A.funcArrContainsTwo = function(strings, str) {

    var occurenceCounter=0, i;
    for(i=0;i<strings.length;i++){
        if(strings[i] === str){
            occurenceCounter++;
        }
    }
    if(occurenceCounter>=2)
    {
        return true;
    }
    else{
        return false;
    }
};

A.funcArrContainsNTimes = function(strings, str, n) {

    var occurenceCounter=0, i;
    for(i=0;i<strings.length;i++){
        if(strings[i] === str){
            occurenceCounter++;
        }
    }
    if(occurenceCounter>=n)
    {
        return true;
    }
    else{
        return false;
    }
};

module.exports = A;