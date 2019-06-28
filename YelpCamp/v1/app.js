var express = require("express");
var app = express();
//include body-parser
var bodyParser = require("body-parser");
// var request = require("request");

//tell express to use body-parser 
app.use(bodyParser.urlencoded({extended: true}));
//make it so you don't have to type ".ejs" on render
app.set("view engine", "ejs");

//create an array of campgrounds
    var campgrounds = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"}
        ];

//create a route for the landing page at the root node
app.get("/", function(req, res){
    res.render("landing");
});
//create a route for  the campgrounds page
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

//let user add a campground
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to the campgrounds page
    res.redirect("/campgrounds");
});

//create route for the form that allows user to add a new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
})