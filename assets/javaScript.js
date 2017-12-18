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


// function dumpGiphy() {

//   var favTopics =["cheerleading", "too+cute", "i+love+lucy", "tea+cup+pigs"];
//   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + favTopics[0] "&api_key=dc6zaTOxFJmzC&limit=10";

//   $.ajax({
//   url: queryURL,
//   method: 'GET'
// })
// .done(function(repsonse) {
//   console.log("I got data" + data);
// });
// }



