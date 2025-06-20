const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Error fetching book" });
  }
});


router.post("/", async (req, res) => {
  const { title, author, genre, description, coverImage } = req.body;
  try {
    const newBook = new Book({ title, author, genre, description, coverImage });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to add book" });
  }
});

module.exports = router;
