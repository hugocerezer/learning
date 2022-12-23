//Requires to make express server works and additional requirements
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

//Configs for Mail Chimp API connection
const mailChimpApiKey = ""; //get you api key on mailchimp settings
const mailChimpListId = ""; //get you List id on your account


//Let the express server to use static resources from /public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var data = {
        members: [{
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.firstname,
                LNAME: req.body.lastname
        }
    }]
    };
    
    data = JSON.stringify(data);
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/" + mailChimpListId;
    const options = {
        method: "POST",
        auth: "anytext:" + mailChimpApiKey
    };
    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");   
        }
    });

    request.write(data);
    request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(3000, function () { console.log("Server is up.") });