var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

//some data 
var data = [
        {
            name: "Salmon Creek", 
            image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
            description: "Blah BLah BLAH LAH ABBJHAKB"
        },
        {
            name: "Granite Hill", 
            image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
            description: "YADDA YADDA YADDA"
        },
        {
            name: "Mountain Goat's Rest", 
            image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
            description: "oogy boogyyy oohgy boogy"
        },
    
]
//clear all campgrounds
function seedDB(){
    //clear all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function (err, campground) {
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This Place is greate yadda yadda yadda but Yadda",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment._id);
                                campground.save();
                                console.log("Created a new comment");
                            }
                        });
                }
            });
        });
    });
   
    //add a few comments 
}

module.exports = seedDB;

