var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else{
                //does user own campground
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "Permission required")
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Please Log In")
        res.redirect("back");
    }
};


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else{
                //does user own comment
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "Permission needed");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Must be logged in");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
        
    }
    req.flash("error", "Please Login or Sign Up");
    res.redirect("/login");
};



module.exports = middlewareObj;