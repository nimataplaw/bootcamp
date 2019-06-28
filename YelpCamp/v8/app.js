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
//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");

//connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp_v8");

//tell express to use body-parser 
app.use(bodyParser.urlencoded({extended: true}));
//make it so you don't have to type ".ejs" on render
app.set("view engine", "ejs");
//serve the public directory
app.use(express.static(__dirname + "/public"));

// seedDB(); //seed the database

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

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});