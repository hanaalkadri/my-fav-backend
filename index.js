const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// ✅ Database connection with error handling
mongoose.connect("mongodb+srv://hanaalkadry:Nawras.1991@cluster0.vmfhsu8.mongodb.net/forever")
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });

// ✅ API route test
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// ✅ Start server
app.listen(port, (error) => {
  if (!error) {
    console.log("🚀 Server Running on Port " + port);
  } else {
    console.log("❌ Error: " + error);
  }
});
