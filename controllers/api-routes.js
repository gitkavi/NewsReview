var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


module.exports = function (app) {

    app.get("/scrape", function(req, res){

        axios.get("http://www.nytimes.com/section/books/review").then(function(response){

            var $ = cheerio.load(response.data);
            var count = 0;

            $("h2.headline").each(function (i, element){
                var result = {};

                result.title = $(this).children("a").text();

                result.link = $(this).children("a").attr("href");

                    if(result.title !== '' && result.link !== '')
                    {
                        db.Article.create(result).then(function(dbArticle){
                            console.log(dbArticle);
                            count++;
                        }).catch(function(err){
                            res.json(err);
                        });
                    }
            });
            console.log("Scrape Complete", count);
        });
    });

    // Route for getting all Articles from the db
    app.get("/", function (req, res) {
        console.log("inside /articles");
        // TODO: Finish the route so it grabs all of the articles
        db.Article.find({}).then(function (articles) {
            console.log(articles);
            res.render("index", articles);
        }).catch(function (err) {
        res.json(err);
        });
    });
}