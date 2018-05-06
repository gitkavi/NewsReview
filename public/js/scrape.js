$(function(){

    $("#scrape-btn").on("click", function(event){
        console.log("inside scrape.js");
        $.ajax({
            method:"GET",
            url:"/scrape"
        }).then(function(results){
            alert("scraped Records");
            getArticles();
        });
    });

    function getArticles(){
        $.getJSON("/", function(data){
            console.log("fetching Articles completed");
        });
    }

    getArticles();
});