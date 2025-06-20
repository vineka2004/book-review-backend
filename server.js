require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const reviewRoutes = require("./routes/reviews");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

//mongoose.connect(process.env.MONGO_URI, {

  //useNewUrlParser: true,
  //useUnifiedTopology: true,
//})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));


app.use(cors());
app.use(express.json());


app.use("/register", authRoutes);
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);

// Start server
//const PORT = 5000;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
