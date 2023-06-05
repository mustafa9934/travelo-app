const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const appRoutes = require("./routes/index");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", appRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://muhammad9434:muhammad9434@cluster0.y8ctfxf.mongodb.net/travel-app",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
