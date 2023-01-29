const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set('strictQuery', false);
//////////////////////////////////////////////////////////////
//         REMEMBER TO SER THE CONNECT STRING BELOW         //
//////////////////////////////////////////////////////////////
mongoose.connect("");


const Article = mongoose.model("Article", {title: String, content: String});

//////////////////////////////////////////////////
//                 All Articles                 //
//////////////////////////////////////////////////

app.route("/articles")
    .get((req, res) => {
        Article.find({}, (err, results) => {
            if (!err) {
                res.send(results);
            } else {
                res.send(err);
            }
        });
    })
    .post((req, res) => {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });
        article.save((err) => {
            if (err) {
                res.send("Error: " + err);
            } else {
                res.send("Success adding the new article.");
            }
        });
    })
    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (err) {
                res.send("Error: " + err)
            } else {
                res.send("OMG! What've you done? You've deleted EVERYTHING.");
            }
        });
    });

//////////////////////////////////////////////////
//              Specifics Articles              //
//////////////////////////////////////////////////
app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({title: req.params.articleTitle}, (err, result) => {
            if (err) {
                res.send("Error: " + err);
            } else {
                if (result) {
                    res.send(result)
                } else {
                    res.send("No results found.")
                }
            }
        });
    })
    .put((req, res) => {
        Article.findOneAndUpdate({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content}, {overwrite: true}, (err) => {
            if (err) {
                res.send("Error: " + err);
            } else {
                res.send("Updated article " + req.params.articleTitle);
            }
        })
    })
    .patch((req, res) => {
        Article.findOneAndUpdate({title: req.params.articleTitle}, {$set : req.body}, (err) => {
            if (err) {
                res.send("Error: " + err);
            } else {
                res.send("Updated article " + req.params.articleTitle);
            }
        })
    })
    .delete((req, res) => {
        Article.deleteOne({title: req.params.articleTitle}, (err) => {
            if (err) {
                res.send("Error: " + err);
            } else {
                res.send("Article succesfully deleted.");
            }
        })
    });


app.listen(3000 , () => {console.log("Server running on port 3000.")});