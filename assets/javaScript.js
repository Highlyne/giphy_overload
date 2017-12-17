console.log("test to see if this page shows up");

$(".favButtons").on("click", dumpGiphy);

function dumpGiphy() {

    console.log("Testing buttons");
//   var giphy = $(this).attr("data-name");
//   var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

// $.ajax({
//   url: queryURL,
//   method: 'GET'
// })
// .done(function(data) {
//   console.log("I got data", data);
// });
}

var topics =["cheerleading", "too cute", "I love Lucy", "Tea cup Pigs"]

function showButtons() {

    for (let index = 0; index < topics.length; index++) {
        
        var a = $("<Button>");
        a.text(topics[index]);
        $(".favButtons").append(a);
        
    }
}

   

    showButtons();

