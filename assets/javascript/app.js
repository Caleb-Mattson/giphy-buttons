var gifSelection =["community", "miracle workers", "third rock from the sun", "ap bio", "avatar the last airbender", "the witcher", "vikings"];

// on click function to add the input value inside the form and run the createButton function

// created function to populate page with buttons from array
var createButton = function() {
    $("#button").empty();

    // for looped through array to create buttons
    for (var i = 0; i < gifSelection.length; i++) {
        var a = $("<button>");
        a.addClass("gifButton");
        a.attr("value", gifSelection[i]);
        a.text(gifSelection[i]);
        $("#button").append(a);
    }
};


// create new button on click to push new value into array, running createButton function to populate new items in the array
$("#submit").on("click", function(){
    event.preventDefault();
    var inputVal = $("#buttonCreate").val().trim();
    gifSelection.push(inputVal);
    console.log(inputVal);
    createButton();
});

// empty out the imgDump div of gifs
$("#clear").on("click", function(){
    $("#imgDump").empty();
})

createButton();

$(document).on("click", ".gifButton", function() {
    event.preventDefault();
    var buttonSelect = $(this).attr("value")
    console.log(buttonSelect);

    var apiKey = "Ptje1aKgDLlEbocNFZqUE7a8u8zBo7wf";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonSelect + "&api_key=" + apiKey + "&limit=10";

    // classic ajax call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#imgDump").empty();
      
        for (var i = 0; i < response.data.length; i++) {
            // created individual divs for the gifs to sit in
            var div = $("<div>");
            div.addClass("imgDump");
            div.attr("id", "imgDiv-" + i);

            // populated gifs images from API
            var img = $("<img>");
            img.attr("src", response.data[i].images.fixed_height_still.url);
            img.attr("data-still", response.data[i].images.fixed_height_still.url);
            img.attr("data-animate", response.data[i].images.fixed_height.url)
            img.attr("data-state", "still")
            img.addClass("gifs");

            // created rating tags for each image
            var rate = $("<p>");
            rate.addClass("rated");
            rate.text("Rated: " + response.data[i].rating);

            // Couldn't figure out favorite button
            // var favButton = $("<button>");
            // favButton.attr("id", "favorite-" + i);
            // favButton.text("Favorite");

            // appended images and rating to each div
            div.append(img);
            div.append(rate);
            // div.append(favButton);

            // appended it all into the imgDump div anchor inside DOM
            $("#imgDump").append(div);

        };

        // on hover function to show animated state
        $(function() {
            $(".gifs").hover(
                function() {
                    $(this).attr("src", $(this).attr("data-animate"));
                },
                function() {
                    $(this).attr("src", $(this).attr("data-still"));
                }                         
            );                  
        });

    });

});

// HERE IS WHERE I HAD MY ON CLICK TO CHANGE DATA STATES FROM STILL > ANIMATE
// $(document).on("click", ".gifs", function() {
//     event.preventDefault();
//     var state = $(this).attr("data-state");

//     if (state == "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });

