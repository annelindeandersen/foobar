$(document).ready(function(clicks) {

    $("#beerPic").click(function() {
        console.log("er klikket")
    $("#beerModal").show();
    $("#grid").hide();
    });  

    $("#close").click(function() {
        $("#beerModal").hide();
        $("#grid").show();
    });  
 
});
