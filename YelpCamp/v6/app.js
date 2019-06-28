//include express
var express     = require("express"),
    app         = express(),
//include body-parser
    bodyParser  = require("body-parser"),
//include mongoose
    mongoose    = require("mongoose"),
//include auth packages
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
//include the campground model 
    Campground  = require("./models/campground"),
//include comments
    Comment     = require("./models/comment"),
//include User package from /models.user
    User        = require("./models/user"),
//include the seeds.js data seeds
    seedDB      = require("./seeds");


//connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp_v6");

//tell express to use body-parser 
app.use(bodyParser.urlencoded({extended: true}));
//make it so you don't have to type ".ejs" on render
app.set("view engine", "ejs");
//serve the public directory
app.use(express.static(__dirname + "/public"));
//seed the database
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Abu is my only friend!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
});

//SHOW - show details for a particular campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided ID 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//============================
//COMMENTS ROUTE
//============================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
   //find campground by id 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //lookup campground usind ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //create new comment 
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    }else{
                        console.log(req.body.comment);
                    //connect new comment to campground
                    campground.comments.push(comment._id);   
                    campground.save();
                    //redirect to campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});
//===========
//AUTH ROUTES
//===========
//show register form 
app.get("/register", function(req, res) {
   res.render("register"); 
});
//handle signup logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
          res.redirect("/campgrounds"); 
       });
    }); 
});

//show Login Form 
app.get("/login", function(req, res) {
    res.render("login");
});
//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logic for log out 
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
        
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});