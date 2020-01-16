var gifSelection =["cats", "dogs", "memes", "random", "shoebill crane"];

// on click function to add the input value inside the form and run the createButton function


var createButton = function() {
    $("#button").empty();

    for (var i = 0; i < gifSelection.length; i++) {
        var a = $("<button>");
        a.addClass("gifButton");
        a.attr("value", gifSelection[i]);
        a.text(gifSelection[i]);
        $("#button").append(a);
    }
};



$("#submit").on("click", function(){
    event.apventDefault();
    var inputVal = $("#buttonCreate").val().trim();
    gifSelection.push(inputVal);
    console.log(inputVal);
    createButton();
});

createButton();

$(document).on("click", ".gifButton", function() {
    event.preventDefault();
    var buttonSelect = $(this).attr("value")
    console.log(buttonSelect);

    var apiKey = "Ptje1aKgDLlEbocNFZqUE7a8u8zBo7wf";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonSelect + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#imgDump").empty();
      
        for (var i = 0; i < response.data.length; i++) {
            var div = $("<div>");
            div.addClass("imgDump");
            div.attr("id", "imgDiv-" + i);

            var img = $("<img>");
            img.attr("src", response.data[i].images.fixed_height_still.url);
            img.attr("data-still", response.data[i].images.fixed_height_still.url);
            img.attr("data-animate", response.data[i].images.fixed_height.url)
            img.attr("data-state", "still")
            img.addClass("gifs");

            var rate = $("<p>");
            rate.addClass("rated");
            rate.text(response.data[i].rating);

            var favButton = $("<button>");
            favButton.attr("id", "favorite-" + i);
            favButton.text("Favorite");

            div.append(img);
            div.append(rate);
            div.append(favButton);

            $("#imgDump").append(div);

        };

        $(".favorite").on("click", function() {
            var favorite = $(this).parent("id", "imgDiv-5");
            $("#favImgDump").append(favorite);
            console.log(favorite);
        });

    });

});

$(document).on("click", ".gifs", function() {
    event.apventDefault();
    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// $(document).on("click", ".favorite", function() {
//     var favorite = $(this).parent("div");
//     $(".favImgDump").append(div);
// });