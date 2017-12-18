console.log("test to see if this page shows up");

var topics =["cheerleading", "too cute", "I love Lucy", "Tea cup Pigs"]

function showButtons() {
 
    for (let index = 0; index < topics.length; index++) {
        
        var a = $("<Button>");
        a.text(topics[index]);
        $(".favButtons").append(a);   
    }
}
    showButtons();

    // Here is code to get at least one button to show so I can attempt to make it still 
    $("button").on("click", function() {
        var topic = $(this).attr("value");
        // Constructing a URL to search Giphy for the value of the button that was clicked on
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=dc6zaTOxFJmzC&limit=10";
        // AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
          })

          // After the data comes back from the API
          .done(function(response) {
            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var topicImg = $("<img>");
  
                topicImg.attr("src", results[i].images.fixed_height.url);

                gifDiv.append(p);
                gifDiv.append(topicImg);
                $("#giphy_dump").prepend(gifDiv);
              }
            }
          });
      });