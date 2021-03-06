var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app){
    app.get("/scrape", function(req,res){
        axios.get("http://www.nytimes.com/section/books/review").then(function(response){
            var $ = cheerio.load(response.data);
            var counter =0;
            $("div.story-body").each(function(i, element){
                var result = {};
                result.img = $(this).parent().find("figure").find("a").children("img").attr("src");
                result.title = $(this).find("h2.headline").children("a").text();
                result.link = $(this).find("h2.headline").children("a").attr("href");
                result.summary = $(this).find("p.summary").text();
                if(result.title !== '' && result.link !== '' && result.img !== ''){
                    db.Article.create(result).then(function(dbArticle){
                        counter++;
                        console.log(counter +":" +dbArticle);
                    }).catch(function(err){
                        res.json(err);
                    });
                }
            });
            res.redirect("/");
        });
    });

    app.get("/", function(req, res){
        db.Article.find({saved:false}).then(function(articles){
            res.render("index", {articles:articles});
        }).catch(function(err){
            res.json(err);
        });
    });

    app.post("/save/:id", function(req, res){
        console.log("inside /save");
        db.Article.findOneAndUpdate({ _id: req.params.id},{saved:true}).then(function(articles){
            res.render("index", {articles:articles});
        }).catch(function(err){
            res.json(err);
        });
    });

    app.post("/delete/:id", function(req, res){
        console.log("inside /save");
        db.Article.findOneAndUpdate({ _id: req.params.id},{saved:false}).then(function(articles){
            res.render("index", {articles:articles});
        }).catch(function(err){
            res.json(err);
        });
    });

    app.get("/articles", function(req, res){
        db.Article.find({}).populate("notes").then(function(articles){
            res.json(articles);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.get("/articles/:id", function(req, res){
        db.Article.findOne({_id: req.params.id}).populate("notes").then(function(article){
            res.json(article);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.get("/saved", function(req,res){
        db.Article.find({saved:true}).populate("notes").then(function(articles){
            res.render("saved",{articles:articles});
        }).catch(function(err){
            res.json(err);
        });
    });

    app.post("/savenote/:id", function(req,res){
        console.log("inside savenote/id post");
        db.Note.create(req.body).then(function (dbNote) {
            return db.Article.findOneAndUpdate({ '_id': req.params.id },{'$push':{'notes':dbNote._id}},{new:true});
          }).then(function (results) {
            console.log(results);
            res.json(results);
          }).catch(function (err) {
            res.json(err);
          });
    });

    app.delete("/delete/:id", function(req, res){
        console.log("inside delete note click");
        db.Note.findOneAndRemove({_id:req.params.id}).then(function(results){
            console.log(req.body._id);
            return db.Article.findOneAndUpdate({'_id':req.body},{'$pull':{'notes':req.params.id}},{multi:true});
         }).then(function(results){
            console.log(results);
            res.json(results);
        }).catch(function(err){
            res.json(err);
        });
    });
}