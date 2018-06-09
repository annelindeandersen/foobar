$(document).ready(function(clicks) {

    $(".beer").click(function() {
    $("#beerModal").show();
    });  

    $("#close").click(function() {
        $("#beerModal").hide();
    });  
 
});
