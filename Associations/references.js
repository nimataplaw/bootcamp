var mongoose = require("mongoose");
//connect mongoose
mongoose.connect("mongodb://localhost/blog_demo_2");

//POST - title, content 
// var postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// });
// var Post = mongoose.model("Post", postSchema);
var Post = require("./models/post");

// //USER - email, name 
// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     posts: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post" 
//         }
//     ]
// });
// var User = mongoose.model("User", userSchema);
var User = require("./models/user");


// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

//once the above user has been created at run 
//create a post 
Post.create({
    title: "How to cook the best burger pt. 4",
    content: "AHKJFOI Fldfjvodij vIO JOIJOIJ"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            foundUser.posts.push(post._id);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                 }
            });
        }
    });
});

//Find user
//find all posts for that user 

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });

