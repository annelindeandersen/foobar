$(document).ready(function(clicks) {

    $(".beer").click(function() {
    $("#beerModal").show();
    $("#grid").hide();
    });  

    $("#close").click(function() {
        $("#beerModal").hide();
        $("#grid").show();
    });  
 
});
