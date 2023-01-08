const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let items = [];

app.get("/", (req, res) => {
    let dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let today = new Date();
    res.render("list", {DAY: today.toLocaleDateString("pt-BR", dateOptions), newListItem: items});
});

app.post("/", (req, res) => {    
    items.push(req.body.newItem);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on port 3000...");
});