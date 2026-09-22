const express = require("express");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const apiKeyMiddleware = require("./middleware/apiKey");

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "E-Commerce Backend API is running"
  });
});

// User APIs
app.use("/api/users", userRoutes);

// Product APIs
app.use("/api/products", productRoutes);

// Protected API example
app.use("/api/protected", apiKeyMiddleware, (req, res) => {
  res.status(200).json({
    status: true,
    message: "API key is valid"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});