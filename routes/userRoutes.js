const express = require("express");

const router = express.Router();

const users = require("../data/users");
const apiKeyMiddleware = require("../middleware/apiKey");


// GET All Users
router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Users fetched successfully",
    data: users
  });
});

// GET Single User
router.get("/:id", (req, res) => {
  const userId = Number(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    status: true,
    message: "User fetched successfully",
    data: user
  });
});

// POST Add User
router.post("/", apiKeyMiddleware, (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || age === undefined) {
    return res.status(400).json({
      status: false,
      message: "Name, email and age are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    age
  };

  users.push(newUser);

  res.status(201).json({
    status: true,
    message: "User created successfully",
    data: newUser
  });
});

// PUT Update User
router.put("/:id", apiKeyMiddleware, (req, res) => {
  const userId = Number(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found"
    });
  }

  const { name, email, age } = req.body;

  if (!name || !email || age === undefined) {
    return res.status(400).json({
      status: false,
      message: "Name, email and age are required"
    });
  }

  user.name = name;
  user.email = email;
  user.age = age;

  res.status(200).json({
    status: true,
    message: "User updated successfully",
    data: user
  });
});

// DELETE User

router.delete("/:id", apiKeyMiddleware, (req, res) => {
  const userId = Number(req.params.id);

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      status: false,
      message: "User not found"
    });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.status(200).json({
    status: true,
    message: "User deleted successfully",
    data: deletedUser[0]
  });
});

module.exports = router;