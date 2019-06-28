var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
   var thing = req.params.thing;
   res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts = [
            {   
                title: "Post 1", 
                author: "Nima",
            },
            {   
                title: "My Lovely Family", 
                author: "Nima Again",
            },
            {   
                title: "My Wonderful Home", 
                author: "Nima Yet Again",
            }
        ];
        res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Your App Is Served!");
});

