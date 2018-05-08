$("#scrape-btn").on("click", function(event){
    $.ajax({
        method:'GET',
        url:'/scrape'
    }).then(function(results){
        alert("scrape completed!");
        location.reload();
    });
});

$(document).on("click", ".save", function() {
    console.log("inside save-btn click");
    var thisId = $(this).attr("data-id");
    $.ajax({
        method:'POST',
        url:'/save/'+thisId
    }).then(function(results){
        location.reload();
    });
});

$(document).on("click", "#del-btn", function(){
    console.log("Delete button on click");
    var thisId = $(this).attr("data-id");
    console.log(articleId);
    $.ajax({
        method:'POST',
        url:'/delete/'+thisId,
    }).then(function(results){
        location.reload();
    });
});

$(document).on("click", "#save-note", function() {
    console.log("Save note clicked");
    var thisId = $(this).attr("data-id");
        $.ajax({
        method:'POST',
        url:'/savenote/'+thisId,
        data: {
            body: $("#note-content").val()
          }
    }).then(function(results){
        location.reload();
    });
});

$(document).on("click", "#note-del", function(){
    console.log("delete note clicked");
    var thisId = $(this).attr("data-id");
    var articleId = $("#note-mdl").attr("data-id");
    console.log(articleId);
    $.ajax({
        method:'DELETE',
        url:'/delete/'+thisId,
        data:{_id:articleId}
    }).then(function(results){
        location.reload();
    });
})