var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);

mongoose.connect("mongodb://localhost/mongoHeadlines");


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
  });
