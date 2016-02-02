/* =====================
# Lab 2, Part 2 — Underscore Each Function

## Introduction

Up to this point, we have used Javascript's for loop to loop through data. Underscore's _.each function provides us with an easy to read, simple way to accomplish the same goal.

## Task

Find two previous labs that use for loops. Rewrite these labs to use _.each.

## Syntax
You can see an example of how to use ._each in the underscore documentation: http://underscorejs.org/#each and in the code below.

var myArray = [1, 10, 100, 1000];

_.each(myArray, function(value, key, list) {
  console.log(value, key, list);
});
===================== */
/*for loop #1*
for(var i=1; i<=100;i++) {
  if (i%3 ===0){
    console.log('Fizz');
  }
  else if(i%5 === 0){
    console.log('Buzz');
  }
  else if((i%3===0)&&(i%5===0)){
    console.log('FizzBuzz');
  }
  else{
    console.log(i);
  }
} */

/*rewrite*/
var arr=_.range(1,101);
var f= function(num) {
  if (num%3 ===0){
    console.log("Fizz");
  }
  else if(num %5 ===0){
    console.log("Buzz");
  }
  else if((num%3 ===0)&&(num%5===0)){
    console.log("FizzBuzz");
  }
  else{
    console.log(num);
  }
};
_.each(arr, f);


/*for loop 2
var countItem = function(array, r) {
  for(var a=0; a<array.length; a++){
    if(array[a]===r){
      return (a++);
    }
  }
};
countItem([1, 2, 3, 4, 5, 4, 4], 4)*/
/*rewrite*/
var f1=function(li, val){
  var counter=0;
  var f2=function(r){
    if(r===val){
      counter=counter+1;
    }
  };
  _.each(li, f2);
  console.log(counter);
};
f1([1, 2, 3, 4, 5, 4, 4], 4);
