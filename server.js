var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

require("./controllers/routes.js")(app);

mongoose.connect("mongodb://localhost/mongoHeadlines");

app.listen(PORT, function(){
    console.log("App running on port" + PORT + "!");
})