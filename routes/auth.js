const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name, bio, username, password } = req.body;
  console.log("📥 Incoming registration:", req.body); // ✅ Add this


  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const newUser = new User({ name, bio, username, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error(" Registration failed:", err.message);
    res.status(500).json({ error: err.message || "Server error during registration" });
  }
});



router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({
      message: " Login successful",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(" Login failed:", err.message);
    res.status(500).json({ error: err.message || "Server error during login" });
  }
});

module.exports = router;
