var gifSelection =["cats", "dogs", "memes", "random"];

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
    event.preventDefault();
    var inputVal = $("#buttonCreate").val().trim();
    gifSelection.push(inputVal);
    console.log(inputVal);
    createButton();
});
createButton();

$(document).on("click", ".gifButton", function() {
    event.preventDefault();
    console.log($(this).attr("value"));
});

