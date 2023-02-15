require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOURI).then(console.log("Database connected."));

const userSchema = new mongoose.Schema({email: String, password: String});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

const secretSchema = new mongoose.Schema({userId: String, secret: String});
const Secret = mongoose.model("Secret", secretSchema);;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const user = new User({username: req.body.username, password: req.body.password});

    req.login(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("secrets");
            });
        };
    });
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res)  => {
    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            })
        }
    });
});

app.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        Secret.find({}, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                if (results.length === 0) {
                    res.render("secrets", {secrets: "There is no secrets yet."});
                } else {
                    res.render("secrets", {
                        results: results
                      });
                };
            };
        });
    } else {
        res.render("login");
    }
})

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/login");
    });
});

app.get("/submit", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

app.post("/submit", (req, res) => {
    const secret = new Secret({
        userId: req.user.id,
        secret: req.body.secret
    });
    secret.save();
    res.redirect("/secrets");
});

app.listen(3000, () => console.log("Server runing on port 3000."))