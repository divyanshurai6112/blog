const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Hello there, Welcome to your blog! Here you can post about your daily life or rant about someone who annoyed you. Do whatever you want with it :P";
const contactContent = "Contact me by clicking the following links :-)";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.static("public"));

const posts = [];

app.get("/",(req,res)=>{
  res.render("home",{startingContent:homeStartingContent, posts:posts});
});


app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  let post = {
    title : req.body.postTitle,
    body : req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
