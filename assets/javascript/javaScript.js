$(document).ready(function() {
  console.log("test to see if this page shows up");
// ========Declare all variabes ====================
  var topics =["cheerleading", "too cute", "I love Lucy", "Tea cup Pigs"];
// =================== Functions =====================
  // First lets make buttos appear on the screen
  function showButtons() {
  // clear any buttons from the previous user
    $("#favButtons").empty();
  // creat a loop to go through all of the items inside of the topics array
    for (let index = 0; index < topics.length; index++) {
        var a = $("<button>");
        a.addClass("waves-effect waves-light btn");
        a.attr("data-type", topics[index]);
        a.text(topics[index]);
        $("#favButtons").append(a);
    }
  }

  // Making the Ajax call to giphy.com
    $(document).on("click", ".btn",function() {
  // Clear any giphs already on the screen
      $("#giphy_dump").empty();
      $(".btn").removeClass("active");
        $(this).addClass("active");
  // Set the search value of the ajax call to the text of the button
      var search = $(this).attr("data-type");
  // Constructing a URL to search Giphy for the value of the button that was clicked on
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";
  // AJAX request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
  // What I want to happen after the data comes back from the API
      .then(function(response) {
  // set the response object to a variable to make it easier to work with
        var results = response.data;

        // $("#giphy_dump").prepend(results[1].images.fixed_height.url);

        for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var topicImg = $("<img>");
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            
            topicImg.attr("src", still);
            topicImg.attr("data-still", still);
            topicImg.attr("data-animate", animated);
            topicImg.attr("data-State", "still");
            topicImg.addClass("topic-image");

            gifDiv.append(p);
            gifDiv.append(topicImg);

            $("#giphy_dump").prepend(gifDiv);
          }
        }
      });
  });

  $(document).on("click", ".topic-image", function() {

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

  $("#add-btn").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("input").eq(0).val();

    if (newTopic.length > 2) {
      topics.push(newTopic);
    }

    showButtons();
  });

  showButtons();
});

