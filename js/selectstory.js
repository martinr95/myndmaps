import adventuresData from "./adventures.js";

$(document).ready(function () {
  // Iterate over each first-level object in adventuresData
  $.each(adventuresData, function (key, value) {
    // Create a new div element
    var newDiv = $("<div></div>");

    // Add classes to the div
    newDiv.addClass("card storyselect");

    // Set the ID of the div
    newDiv.attr("id", value.storyIdLong);

    // Set the background image
    newDiv.css("background-image", "url(" + value.coverimgPortrait + ")");

    var newDivOverlay = $("<div></div>");
    newDivOverlay.addClass("storyselectOverlay");
    newDiv.append(newDivOverlay);

    // Create and add the title
    var title = $("<h1></h1>").text(value.storyName);
    title.addClass("storyselectTitle");
    newDiv.append(title);

    // Create and add the paragraph
    var paragraph = $("<p></p>").text(value.storyText);
    paragraph.addClass("storyselectParagraph");
    newDiv.append(paragraph);

    // Create and add the button
    var button = $("<button></button>").text("Select Story");
    button.addClass("selectstoryBtn");
    button.attr("id", value.storyId + "Btn");
    newDiv.append(button);

    // Add click event to the button
    button.click(function () {
      localStorage.clear();
      localStorage.setItem("userStoryId", value.storyId);
      localStorage.setItem("userStoryTitle", value.storyTitle);
      localStorage.setItem("userStoryName", value.storyName);
      // Update the innerHTML of h5 with class 'displayLevelName'

      // Redirect to index.html
      window.location.href = "index.html";
    });

    // Append the new div to the body or a specific container
    $("body").append(newDiv); // You can change 'body' to a specific container if needed
  });
});
