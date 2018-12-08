$(document).ready(function() {

  var musicians = [
    "Anamanaguchi", "Britney Spears", "Crystal Castles", "Hawthorne Heights", "Joy Division", "Joyce Manor", "My Chemical Romance", "The Strokes", "Sufjan Stevens", "The Smashing Pumpkins"
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".musician-button", function() {
    $("#musicians").empty();
    $(".musician-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var musicianDiv = $("<div class=\"musician-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var musicianImage = $("<img>");
          musicianImage.attr("src", still);
          musicianImage.attr("data-still", still);
          musicianImage.attr("data-animate", animated);
          musicianImage.attr("data-state", "still");
          musicianImage.addClass("musician-image");

          musicianDiv.append(p);
          musicianDiv.append(musicianImage);

          $("#musicians").append(musicianDiv);
        }
      });
  });

  $(document).on("click", ".musician-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-musician").on("click", function(event) {
    event.preventDefault();
    var newMusician = $("input").eq(0).val();

    if (newMusician.length > 2) {
      musicians.push(newMusician);
    }

    populateButtons(musicians, "musician-button", "#musician-buttons");

  });

  populateButtons(musicians, "musician-button", "#musician-buttons");
});
