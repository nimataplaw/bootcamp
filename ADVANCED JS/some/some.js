//iterates through an array 
// Runs a callback on each value in the array 
// if the callback returns true for at least one single value, return true 
// otherwise, return false 

var arr = [1,2,3];

arr.some(function(value, index, array){
    return value < 2;
});
//true

function hasEvenNumber(arr){
    return arr.some(function(value){
        return value % 2 === 0;
    });
}

hasEvenNumber([1,2,3,4]); // true 
hasEvenNumber([1,3,5]); //false

function hasComma(str) {
    return str.split('').some(function(value){
        return value === ',';
    });
}

hasComma('this is wonderful');//false
hasComma('this, is wonderful');//true

