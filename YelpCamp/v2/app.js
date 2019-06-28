//include express
var express     = require("express"),
    app         = express(),
//include body-parser
    bodyParser  = require("body-parser"),
//include mongoose
    mongoose    = require("mongoose");
// var request = require("request");

//connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

//tell express to use body-parser 
app.use(bodyParser.urlencoded({extended: true}));
//make it so you don't have to type ".ejs" on render
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//Create Model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//         {
//                 name: "Granite Hill", 
//                 image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
//                 description: "This is a hige granite hill!"
//         }, 
//         function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground)
//         }
//     });



//create a route for the landing page at the root node
app.get("/", function(req, res){
    res.render("landing");
});

//create a route for  the campgrounds page
//INDEX ROUTE - show all campgrounds 
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//let user add a campground
//CREATE ROUTE - add new campground to DB
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB 
    Campground.create(newCampground, function (err, newlyCreatedCampground) {
        if(err){
            console.log(err);
        } else {
            //redirect back to the campgrounds page
            res.redirect("/campgrounds");
       
        }
    });
});

//create route for the form that allows user to add a new campground
//NEW - show form to create a new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

//SHOW - show details for a particular campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided ID 
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
})