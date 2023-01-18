const express = require("express");
const bodyParser = require("body-parser");
const db = require(__dirname + "/db.js");
const { resolveInclude } = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolist");

const Task = mongoose.model("Task", {desc: String});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
   const items = [
    { desc: 'Finish that shit' },
    { desc: 'Go ahead!' },
    { desc: 'Yes you can!' } 
  ];
  res.render("list", {listTitle: "Today", listItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
