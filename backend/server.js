const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Todo routes
const todoRoutes = require(__dirname + "/routes/todoRoutes.js");
app.use("/api/todos", todoRoutes);

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
