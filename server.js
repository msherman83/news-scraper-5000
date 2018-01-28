var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var port = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));


// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Loads the index.handlebars file as the home file.
app.get("/", function(req, res) {
    res.render("index");
})


app.listen(port, function() {
    console.log("Server started on port 8080...")
});