var methodOverride  = require("method-override"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    express         = require("express"),
    app             = express(),
    expressSanitizer = require("express-sanitizer");
//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
//make it so you don't have to type ".ejs" on render
app.set("view engine", "ejs");
//use custom style sheet 
app.use(express.static("public"));
//use method-override /so that we can PUT from a form in html/
app.use(methodOverride("_method"));
//use sanitizer so users can't input script tags 
app.use(expressSanitizer());

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1464658824763-547203e5a4a1?auto=format&fit=crop&w=750&q=80",
//     body: "HELLO THIS IS A BLOG POST"
// });

//RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("/blogs");
})
//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});
//NEW BLOG POST ROUTE 
app.get("/blogs/new", function(req, res) {
   res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
    //sanitize
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
            res.render("new");
        } else {
            //redirect to the index
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    //find the blog you want to edit
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           console.log(err);
           res.redirect("/blogs");
       } else {
           //render to the edit page with the found blog info
           res.render("edit", {blog: foundBlog});
       }
   });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    //sanitize
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //findByIdAndUpdate(id, newData, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            //redirect somewhere
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS SERVING");
});