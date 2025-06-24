const express = require("express");
const router = express.Router();
const User = require("../models/User");



router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.put("/:id", async (req, res) => {
  const { name, bio } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(400).json({ error: "Failed to update profile" });
  }
});
// Add this to routes/users.js
router.post("/", async (req, res) => {
  const { username, password, name, bio } = req.body;
  try {
    const newUser = await User.create({ username, password, name, bio });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(400).json({ error: "Failed to create user" });
  }
});







module.exports = router;
