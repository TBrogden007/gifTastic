$(document).ready(function () {
    
    var gifs = ["Ultron", 
                "Loki", 
                "Magneto", 
                "Red Skull", 
                "Killer Croc", 
                "Joker",
                "Harley Quinn",
                "Catwoman",     
                "Venom",
                "Gumby..."];

    function createButtons(){ 

        
        $("#villanButtons").empty();

        
        for (var i = 0; i < gifs.length; i++){

            
            var button = $("<button>") 
            button.addClass("gif"); 
            button.attr("data-name", gifs[i]);
            button.addClass("newButton");
            button.text(gifs[i]); 
            $("#villanButtons").append(button); 
        } 
    }
    createButtons();
    

    $("#addVillan").on("click", function(){
      
        var newGif = $("#villan-input").val().trim();

        gifs.push(newGif);
        createButtons();

    })

    $("#villanButtons").on("click", ".newButton", function() {

        var villan = $(this).data("name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + villan + "&api_key=dc6zaTOxFJmzC&limit=<2></2>0";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
               
                console.log(response)

                
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                   
                    var villanDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var villanResult = $("<img>").attr("src", results[i].images.fixed_height_still.url);

                    villanResult.attr("data-still", results[i].images.fixed_height_still.url);
                    villanResult.attr("data-animate", results[i].images.fixed_height.url);
                    villanResult.attr("data-state", "still");
                    villanResult.addClass("villanGif");

                    villanDiv.append(p);
                    villanDiv.append(villanResult);
                    $("#results").prepend(villanDiv);
                    
                }

            });
        $("#results").empty();
    });
      $("#results").on("click", ".villanGif", function(){
           

            var state = $(this).attr("data-state");
            var animate = $(this).attr("data-animate");
            var still = $(this).attr("data-still");
            console.log(animate);
            

            if (state == "still") {
                $(this).attr("src", animate);
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", still);
                $(this).attr("data-state", "still");
            }
            
        });
});

