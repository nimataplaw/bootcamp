//creates a new array 
//iterates through an array 
//Runs a callbank function for each value in the array
//adds the result of that callback function to the new array 
//returns the new array

//ALWAYS RETURNS A NEW ARRAY OF THE SAME LENGTH AS THE ORIGINAL ARRAY

//EXAMPLE 

var arr = [1,2,3];

arr.map(function(value, index, array){
    return value * 2;
});

function tripleValues(arr){
    return arr.map(function(value){
        return value * 3;
    });
}

tripleValues([1,2,3]);

function onlyFirstName(arr){
    return arr.map(function(val) {
       return val.first; 
    });
}

onlyFirstName([{first: 'Tim', last: 'Garcia'}, {first: 'Matt', last: 'Lane'}]);
/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([1,-2,-3]) // [2,-4,-6]
*/

function doubleValues(arr) {
    return arr.map(function(val){
       return val * 2; 
    });
}


/*
Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.

Examples:
    valTimesIndex([1,2,3]) // [0,2,6]
    valTimesIndex([1,-2,-3]) // [0,-2,-6]
*/

function valTimesIndex(arr) {
    return arr.map(function(val, idx){
        return val * idx;
    });
}

/*
Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.

Examples:
    extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractKey(arr, key) {
    return arr.map(function(val) {
        return val[key];
    })
}

/*
Write a function called extractFullName which accepts an array of objects and returns a new array with the value of the key with a name of "first" and the value of a key with the name of  "last" in each object, concatenated together with a space. 

Examples:
    extractFullName([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia"}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele"}]) // ['Elie Schoppik', 'Tim Garcia', 'Matt Lane', 'Colt Steele']
*/

function extractFullName(arr) {
    return arr.map(function(val) {
       return val.first + "" + val.last; 
    });
}