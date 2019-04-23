//      __  __        __    __
// 	   / / / (_)___ _/ /_  / /_  ______  ___
//    / /_/ / / __ `/ __ \/ / / / / __ \/ _ \
//   / __  / / /_/ / / / / / /_/ / / / /  __/
//  /_/ /_/_/\__, /_/ /_/_/\__, /_/ /_/\___/
//          __,/ /        __,/ /
// 		     /____/        /____/
// ===============================================

$(document).ready(function() {
 
  var control = {
    topics:[
      "cheerleading",
      "funny",
      "I love Lucy",
      "Tea cup Pigs",
      "puppy"
    ],
    clearButtons: function() {
      // Clear any buttons previously added
      $("#favButtons").empty();
    },
    showButtons: function() {
      this.clearButtons();
      for (var i = 0; i < this.topics.length; i++) {
        // loop through the topics array
        var a = $("<button>"); // create a button tag
        a.addClass("pink lighten-1 waves-effect waves-light btn");
        a.attr("data-type", this.topics[i]); // attach a topic to each button
        a.text(this.topics[i]); // text on each button
        $("#favButtons").append(a);
      }
    },
    makeAPICall: function(search) {
      let queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        search +
        "&api_key=dc6zaTOxFJmzC&limit=12";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(response => {
        var results = response.data; // The data returned wrapped in another object named data.
        this.appendImages(results);
      });
    },
    appendImages: function(results) {
      $("#giphy_dump").empty();
      var gifDiv = $("<div class='grid-container'>");
      $("#giphy_dump").prepend(gifDiv);

      for (var i = 0; i < results.length; i++) {
        // Only use giphs that are not R or PG-13 rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          console.log(results);
          var rating = results[i].rating.toUpperCase();
          var p = $("<p>").text("Rating: " + rating);
          var topicImg = $("<img>");
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
          var id = results[i].id;
          topicImg.attr("src", still);
          topicImg.attr("data-still", still);
          topicImg.attr("data-animate", animated);
          topicImg.attr("data-State", "still");
          topicImg.attr("id", id);
          topicImg.addClass("topic-image");

          // make the card div
          let row = $("<div>").addClass("row");
          let column = $("<div>").addClass("col s6 m6 l3");
          let card = $("<div>").addClass("card");

          // make the div for the image
          let cardImage = $("<div>").addClass(
            "card-image waves-effect waves-block waves-light"
          );
          cardImage.append(topicImg);

          // make the card content
          let cardContent = $("<div>").addClass("card-content");
          let title = $("<p>")
            .addClass("card-title activator grey-text text-darken-4")
            .text(rating);
          cardContent.append(title);

          // put the content on the DOM
          card.append(cardImage);
          card.append(cardContent);
          column.append(card);
          row.append(column);

          $("#giphy_dump").prepend(row);
        }
      }
    },
    changeState: function(imageObject) {
      const { state, imageID, animate, still } = imageObject;
      var g = $(`#${imageID}`);
      console.log(g);
      if (state === "still") {
        g.attr("src", animate);
        g.attr("data-state", "animate");
      } else {
        g.attr("src", still);
        g.attr("data-state", "still");
      }
    },
    addNewButton: function() {
      var newTopic = $("#add-fav").val();
      if (newTopic.length > 2) {
        topics.push(newTopic);
      }
      $("#add-fav").val("");
      this.showButtons();
    }
  };
// ================ Operating Functions ======================
  
  // Add new topic to the button list
  $("#add").on("click", event => {
      event.preventDefault();
      control.addNewButton();
    });

  // Get new giphs
  $(document).on("click", ".btn", function() {
    $(".btn").removeClass("active");
    $(this).addClass("active");
    var search = $(this).attr("data-type");
    control.makeAPICall(search);
  });

  // Handle the still / animate of each giph
  $(document).on("click", ".topic-image", function() {
    var imageObject = {
      state: $(this).attr("data-state"),
      imageID: $(this).attr("id"),
      animate: $(this).attr("data-animate"),
      still: $(this).attr("data-still")};
      
    control.changeState(imageObject);
  });

  control.showButtons();
});
