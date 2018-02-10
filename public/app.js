// INSERT SCRAPED ARTICLE INTO INDEX PAGE

// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the information on the page
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

// INSERT SAVED ARTICLE INTO SAVED PAGE
// Grab the articles as a json
$.getJSON("/saved-article", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the information on the page
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


$(document).on("click", ".save-article", function () {

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
    .done(function (data) {
      // Log the response
      console.log("Article Saved");
      console.log(data);

    });

});

// ========================================
// SAVED ARTICLE DELETE BUTTON
// ========================================

$(document).on("click", ".delete-article", function () {

  var thisId = $(this).parent().attr("data-id")

  // Now make an ajax call for the Article to delete.
  $.ajax({
    method: "DELETE",
    url: "/saved-article/" + thisId
  })
    // Console.log the article is deleted and reload the page.
    .done(function (data) {
      console.log("Article Deleted");
      location.reload();


    });
});

// ========================================
// NOTE MODAL TRIGGER
// ========================================


$(document).on("click", ".add-note", function () {
  // Save the id from the data-id tag
  var thisId = $(this).parent().attr("data-id")

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/saved-article/" + thisId
  })
    // With that done, add the note information to the page
    .done(function (data) {
      console.log(data);

      // MODAL POPUP
      $("#myModal").modal("show");

      // The title of the article
      $("#notes").append("<h3>" + data.title + "</h3>");
      // An input to enter a new title
      $("#notes").append("<div class='form-group'><label for='noteTitle'>Note Title</label><input type='text' class='form-control' id='titleinput' name='title' ></div>");
      // A textarea to add a new note body
      $("#notes").append("<div class='form-group'><label for='noteBody'>Note</label><textarea class='form-control' id='bodyinput' name='body'></textarea> </div>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<div> <button type='button' class='btn btn-primary' data-id='" + data._id + "' id='savenote'>Save Note</button></div>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }

    });
});

// ========================================
// SAVE NOTE BUTTON
// ========================================


// When you click the savenote button
$(document).on("click", "#savenote", function () {
  

  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  var title = $("input#titleinput").val()
  var body = $("textarea#bodyinput").val()
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/saved-article/" + thisId,
    data: {
      // Value taken from title input
      title: title,
      // Value taken from note textarea
      body: body
    }
  })
    // With that done
    .done(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});
