console.log("test to see if this page shows up");

var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

$.ajax({
  url: queryURL,
  method: 'GET'
}).done(function(data) {
  console.log("I got data", data);
});

var topics =["cheerleading", "too cute", "I love Lucy", "Tea cup Pigs"]