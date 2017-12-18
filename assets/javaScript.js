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
  
        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          // After the data comes back from the API
          .done(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
  
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              // Only taking action if the photo has an appropriate rating
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='item'>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var personImage = $("<img>");
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                personImage.attr("src", results[i].images.fixed_height.url);
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(personImage);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#giphy_dump").prepend(gifDiv);
              }
            }
          });
      });