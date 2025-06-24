require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const reviewRoutes = require("./routes/reviews");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log("✅ MongoDB connected to:", conn.connections[0].name);
      console.log("🔗 Using host:", conn.connections[0].host);
    })
    .catch((err) => console.error("❌ MongoDB error:", err));

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);

module.exports = app;
