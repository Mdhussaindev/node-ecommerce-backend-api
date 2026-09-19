const express = require("express");

const router = express.Router();

const users = require("../data/users");

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Users fetched successfully",
    data: users
  });
});

module.exports = router;