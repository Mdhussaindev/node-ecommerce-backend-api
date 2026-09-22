const apiKeyMiddleware = require("../middleware/apiKey");

const express = require("express");

const router = express.Router();

const products = require("../data/products");

// GET All Products
router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Products fetched successfully",
    data: products
  });
});

// GET Single Product
router.get("/:id", (req, res) => {
  const productId = Number(req.params.id);

  const product = products.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product not found"
    });
  }

  res.status(200).json({
    status: true,
    message: "Product fetched successfully",
    data: product
  });
});

// POST Add Product
router.post("/", apiKeyMiddleware, (req, res) => {
  const { name, price, category, stock } = req.body;

  if (!name || price === undefined || !category || stock === undefined) {
    return res.status(400).json({
      status: false,
      message: "Name, price, category and stock are required"
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    stock
  };

  products.push(newProduct);

  res.status(201).json({
    status: true,
    message: "Product created successfully",
    data: newProduct
  });
});

// PUT Update Product
router.put("/:id", apiKeyMiddleware, (req, res) => {
  const productId = Number(req.params.id);

  const product = products.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product not found"
    });
  }

  const { name, price, category, stock } = req.body;

  if (!name || price === undefined || !category || stock === undefined) {
    return res.status(400).json({
      status: false,
      message: "Name, price, category and stock are required"
    });
  }

  product.name = name;
  product.price = price;
  product.category = category;
  product.stock = stock;

  res.status(200).json({
    status: true,
    message: "Product updated successfully",
    data: product
  });
});

// DELETE Product
router.delete("/:id", apiKeyMiddleware, (req, res) => {
  const productId = Number(req.params.id);

  const productIndex = products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({
      status: false,
      message: "Product not found"
    });
  }

  const deletedProduct = products.splice(productIndex, 1);

  res.status(200).json({
    status: true,
    message: "Product deleted successfully",
    data: deletedProduct[0]
  });
});

module.exports = router;