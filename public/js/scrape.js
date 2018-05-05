$(function(){

    $("#scrape-btn").on("click", function(event){
        console.log("inside scrape.js");
        $.ajax({
            method:"GET",
            url:"/scrape"
        }).then(function(results){
            console.log("back after creating records");
            getArticles();
        });
    });

    function getArticles(){
        console.log("inside getArticles");
        $.ajax({
            method:"GET",
            url:"/articles"
        }).then(function(results){
            console.log("getArticles completed");
        });
    }
});