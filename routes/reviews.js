const express = require("express");
const router = express.Router();
const Review = require("../models/Review");


router.get("/", async (req, res) => {
  try {
    const { bookId } = req.query;
    console.log("📥 GET /reviews with bookId:", bookId);

    const filter = bookId ? { bookId } : {};
    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error(" Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});


router.post("/", async (req, res) => {
  const { bookId, user, rating, comment } = req.body;

  try {
    const newReview = new Review({
      bookId,
      user,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error(" Error saving review:", err);
    res.status(400).json({ error: "Failed to submit review" });
  }
});

module.exports = router;
