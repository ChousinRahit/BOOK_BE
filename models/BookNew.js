const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide Book Title"],
  },
  book_id: {
    type: Number,
  },
  original_publication_year: {
    type: String,
  },
  authors: {
    type: String,
  },
  average_rating: {
    type: String,
  },
  image_url: {
    type: String,
  },
  language_code: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BookNew", BookSchema);
