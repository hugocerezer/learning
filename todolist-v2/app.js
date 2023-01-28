const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

//////////////////////////////////////////////////////////////
//         REMEMBER TO SER THE CONNECT STRING BELOW         //
//////////////////////////////////////////////////////////////
mongoose.connect("").then(console.log("Database connected."));
mongoose.set('strictQuery', false);

const itemsSchema = {
  name: String
};
const Item = new mongoose.model("Item", itemsSchema);

const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = new mongoose.model("List", listSchema);

const item1 = new Item({ name: "Welcome to your To Do List"});
const item2 = new Item({ name: "Hit the + button to add an item"});
const item3 = new Item({ name: "<-- Hit the box to delete"});

const defaultItems = [item1, item2, item3];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  Item.find({}, (err, foundItems) => {
    if (err) {
      console.error(err.message);
    }
    
    if (foundItems.length === 0) { //IF the collections is empty, adds the defaultItems const
        Item.insertMany(defaultItems, (err) => {
          console.log("Default items added.");
          res.redirect("/");
        });
    } else { //ELSE if there is data in collection 'items', it will only render the page
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });  
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, (err, foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    })
  }
  
});

app.post("/delete", function(req,res){

  if (req.body.listName === "Today") {
    Item.findByIdAndRemove(req.body.checkbox, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
    res.redirect('/');
  } else {
    List.findOneAndUpdate({name: req.body.listName}, {$pull: {items: {_id: req.body.checkbox}}}, (err, results) => {
      if (err) {
        console.log(err.message);
      } else {
        res.redirect("/"+req.body.listName);
      }

    });
  }
  
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, (err, foundList) => {
    if (!err) {
      if (foundList) { //If the List exists, it will show the list.ejs view
        res.render("list", {listTitle: customListName, newListItems: foundList.items});
      } else { //IF the List doesn't exists, it creates a new one with the default items
        const list = new List({
          name: customListName,
          items: defaultItems
        });
    
        list.save();
        res.redirect('/' + customListName);
      };
    };
  });

});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
