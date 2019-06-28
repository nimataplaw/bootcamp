//*******RANDOM DOG********/
// var btn = document.querySelector("#btn");
// var img = document.querySelector("#photo");

// //listen for clicks 
// btn.addEventListener("click", function() {
//     //make the request
//     var XHR = new XMLHttpRequest();
//     XHR.onreadystatechange = function() {
//         if(XHR.readyState == 4 && XHR.status == 200) {
//             var url = JSON.parse(XHR.responseText).message;
//             img.src = url;
//         }
//     }
//     XHR.open("GET", "https://dog.ceo/api/breeds/image/random");
//     XHR.send();
// });
//*******RANDOM DOG********/
//*******BITCOIN PRICE********/



//*******BITCOIN PRICE********/
// var btn = document.querySelector("button");
// var priceDisplay = document.querySelector("#price");
// var currency = "USD";

// btn.addEventListener("click", function() {
//     var XHR = new XMLHttpRequest();
// XHR.onreadystatechange = function() {
//     if(XHR.readyState == 4 && XHR.status == 200) {
//         var data = JSON.parse(XHR.responseText);
//         var price = data.bpi[currency].rate;
//         priceDisplay.innerText = "$" + price + " " + currency;
//         console.log();
//     }
// }

//     var url = "https://api.coindesk.com/v1/bpi/currentprice.json";
//     XHR.open("GET", url);
//     XHR.send();
// });
//*******BITCOIN PRICE********/

//*******RANDOM USER GENERATOR********/

// // 
// var url = 'https://randomuser.me/api/';
// var fullnameDisplay = document.querySelector("#fullname");
// var avatar = document.querySelector("#avatar");
// var username = document.querySelector("#username");
// var city = document.querySelector("#city");
// var email = document.querySelector("#email");

// var btn = document.querySelector("#btn");
// btn.addEventListener("click", function(){
//     fetch(url)
//     .then(handleErrors)
//     .then(pareseJSON)
//     .then(updateProfile)
//     .catch(displayErrors);
// });

// function handleErrors(res){
//     if(!res.ok){
//         throw Error(res.status);
//     }
//     return res;
// }

// function pareseJSON (res){
//         return res.json().then(function(parsedData){
//             return parsedData.results[0];
//         });
//     }

// function updateProfile (data){
//         var fullname = data.name.first + " " + data.name.last;
//         fullnameDisplay.innerText = fullname;
//         avatar.src = data.picture.medium;
//         username.innerText = data.login.username;
//         city.innerText = data.location.city;
//         email.innerText = data.email;
//     }

// function displayErrors(err){
//         console.log("INDSIDE displayErrors");
//         console.log(err);
//     }
//*******RANDOM USER GENERATOR********/

//*******Jquery and Axios********/
//**********JQuery**********
// $("#btn").click(function(){
//     $.getJSON("https://random.cat/meow")
//     .done(function(data){
//         $('#catImage').attr("src", data.file);
//         console.log(data.file);
//     })
//     .fail(function(){
//         alert("Request Is Not Possible");
//     })
// });

//*************Axios*************

var url = "https://opentdb.com/api.php?amount=10";

axios.get(url)
    .then(function(res){
        console.log(res.data.results[0].question);
    })
    .catch(function(){
        console.log("ERR");
    })

//*******Jquery and Axios********