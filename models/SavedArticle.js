var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Saved Article Scheme

var SavedArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var SavedArticle = mongoose.model("SavedArticle", SavedArticleSchema);

// Export the Article model
module.exports = SavedArticle;