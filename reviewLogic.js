const Review = require("./models/Review");

async function fetchReviews(bookId) {
  const filter = bookId ? { bookId } : {};
  return await Review.find(filter).sort({ createdAt: -1 });
}

async function createReview(data) {
  const newReview = new Review(data);
  return await newReview.save();
}

module.exports = { fetchReviews, createReview };
