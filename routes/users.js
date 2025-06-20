const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.post("/", async (req, res) => {
  const { name, bio } = req.body;
  try {
    const newUser = new User({ name, bio });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(400).json({ error: "Failed to create user" });
  }
});

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

router.post("/register", async (req, res) => {
  const { name, email, password, bio } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "User already exists" });

  const newUser = new User({ name, email, password, bio });
  await newUser.save();
  res.status(201).json(newUser);
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  res.json(user); 
});


module.exports = router;
