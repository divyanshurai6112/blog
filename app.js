const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { isBuffer } = require("lodash");

mongoose.connect("mongodb://localhost:27017/blogDB");
const postSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  content:String
});

const Post = mongoose.model("Post",postSchema);


const homeStartingContent = "Hello there, Welcome to your blog! Here you can post about your daily life or rant about someone who annoyed you. Do whatever you want with it :P";
const contactContent = "Contact me by clicking the following links :-)";
const aboutContent = "This is a web application aimed at creating a basic blogging website which you can use to log how your day went and what not. This can also be used as a daily journal."
const app = express();
const notFoundText="Post Not Found.";
app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use(express.static("public"));



app.get("/",(req,res)=>{
  Post.find({},function(err,postsFound){
    if (postsFound.length > 0){
      res.render("home",{startingContent:homeStartingContent, posts:postsFound});
    }else{
      res.render("home",{startingContent:homeStartingContent, posts:postsFound});
    }
  });
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
  let latestPost = Post.create({
    title : req.body.postTitle,
    content : req.body.postBody
  });
  
  res.redirect("/");
});


app.get("/posts/:topic",function(req,res){
  let urlpostName = req.params.topic.replaceAll("-"," ").toLowerCase();
  Post.find({},function(err,postsFoundArray){
    for (let i =0;i<postsFoundArray.length;i++){
      if (postsFoundArray[i].title.toLowerCase()===urlpostName){
        console.log("matchfound");
        res.render("post",{titleName:postsFoundArray[i].title,content:postsFoundArray[i].content})
      }
    }
  })
});

app.post("/delete",function(req,res){
  let query = req.body.checkBox;
  Post.findByIdAndRemove(query,function(err){
    if(err){
      console.log(err)
    }
    res.redirect("/");
  })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
