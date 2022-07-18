const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Hello there, Welcome to your blog! Here you can post about your daily life or rant about someone who annoyed you. Do whatever you want with it :P";
const contactContent = "Contact me by clicking the following links :-)";
const aboutContent = "This is a web application aimed at creating a basic blogging website which you can use to log how your day went and what not. This can also be used as a daily journal."
const app = express();
const notFoundText="Post Not Found.";
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


app.get("/posts/:topic",function(req,res){
  let urlpostName = req.params.topic.replaceAll("-"," ").toLowerCase();
  posts.forEach(function(post){
    if (post.title.toLowerCase()===urlpostName){
      //console.log("matchfound")
      res.render("post",{titleName:post.title,content:post.body})
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
