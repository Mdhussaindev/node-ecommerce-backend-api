const express = require("express");

const router = express.Router();

const products = require("../data/products");

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Products fetched successfully",
    data: products
  });
});

module.exports = router;