// INSERT SCRAPED ARTICLE INTO INDEX PAGE

// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<div class='card'>" +
      "<h3 class='card-header'>" +
      "<div data-id='" + data[i]._id + "'>" + 
      "<a target='_blank' href=" + data[i].link + "><span class='data-title'>" + data[i].title + "</a></span><button type='button' class='btn btn-primary btn-sm float-right save-article'>Save Article</button></h3>" +
      "<div class='card-block'>" +
      "<p class='card-text data-summary'>" + data[i].summary + "</p>" +
      "</div>" +
      "</div>" +
      "</div>");
  }
});

// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append(
//       "<p data-id='" + data[i]._id + "'>" + 
//       "<span class='data-title'>" + data[i].title + "</span></p><button type='button' class='btn btn-primary save-article'>Save Article</button> <br />" + 
//       "<span class='data-link'>" + data[i].link + "</span>" + "<br>" + 
//       "<span class='data-summary'>" + data[i].summary + "</span>");
//   }
// });


// INSERT SAVED ARTICLE INTO SAVED PAGE

// Grab the articles as a json
$.getJSON("/saved-article", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#saved-article").append(
      "<div class='card'>" +
      "<h3 class='card-header'>" +
      "<div data-id='" + data[i]._id + "'>" + 
      "<a target='_blank' href=" + data[i].link + "><span class='data-title'>" + data[i].title + "</a></span><button type='button' class='btn btn-primary btn-sm float-right add-note'>Add Note</button><button type='button' class='btn btn-primary btn-sm float-right delete-article'>Delete Article</button></h3>" +
      "<div class='card-block'>" +
      "<p class='card-text data-summary'>" + data[i].summary + "</p>" +
      "</div>" +
      "</div>" +
      "</div>");
  }
});

// ========================================
// ARTICLE SAVE BUTTON
// ========================================


$(document).on("click", ".save-article", function() {

  var title = $(this).parent().text();
  var link = $(this).parent().children().attr("href");
  var summary = $(this).parent().parent().siblings()[0].innerText;

  // Run a POST request to save an article
  $.ajax({
    method: "POST",
    url: "/saved-article",
    data: {
      // Value from the HTML rendered on the page.
      title: title,
      link: link,
      summary: summary
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log("Article Saved");
      console.log(data);

    });

});

// ========================================
// SAVED ARTICLE DELETE BUTTON
// ========================================

$(document).on("click", ".delete-article", function() {

  var thisId = $(this).parent().attr("data-id")

  // Now make an ajax call for the Article to delete.
  $.ajax({
    method: "DELETE",
    url: "/saved-article/" + thisId
  })
    // Console.log the article is deleted and reload the page.
    .done(function(data) {
      console.log("Article Deleted");
      location.reload();


    });
});

// ========================================
// NOTE MODAL TRIGGER
// ========================================


// Whenever someone clicks a p tag
$(document).on("click", ".add-note", function() {



  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).parent().attr("data-id")

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/saved-article/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      debugger
      // MODAL POPUP
      $("#myModal").modal("show");

      $("#saved-notes").append("This is a saved note");

      // The title of the article
      $("#notes").append("<h3>" + data.title + "</h3>");
      // An input to enter a new title
      $("#notes").append("<div class='form-group'><label for='noteTitle'>Note Title</label><input type='text' class='form-control' id='titleinput' name='title' ></div>");
      // A textarea to add a new note body
      $("#notes").append("<div class='form-group'><label for='noteBody'>Note</label><textarea class='form-control' id='bodyinput' name='body'></textarea> </div>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<div> <button type='button' class='btn btn-primary data-id='" + data._id + "' id='savenote'>Save Note</button></div>");

      // If there's a note in the article
      if (data.note) { 
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
      
    });
});

// // Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .done(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });


// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/saved-article/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
